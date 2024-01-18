import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Pressable, Modal, ScrollView } from 'react-native';

import Header        from './Header';
import NewBudget     from './NewBudget';
import ControlBudget from './ControlBudget';
import FormSpent     from './FormSpent';
import ListBills     from './ListBills';
import Filter        from './Filter';  

import Colors from '../styles/colors';
import { BudgetI, BillI } from '../interfaces/interfaces';
import { generateId } from '../helpers';

import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../styles/colors';
import { useAppContext } from '../context/AppContext';

const App: React.FC = () => {   
    const [ addBudget, setAddBudget ]         = useState<boolean>(true)
    const [ budget, setBudget ]               = useState<BudgetI[]>([])
    const [ bills, setBills ]                 = useState<BillI[]>([])
    const [ modal, setModal ]                 = useState<boolean>(false)
    const [ bill, setBill ]                   = useState<BillI>()
    const [ filter, setFilter ]               = useState<string>('')
    const [ filteredBills, setFilteredBills ] = useState<BillI[]>([])
    
    const [available, setAvailable]   = useState<number>(0)
    const [spent, setSpent]           = useState<number>(0)
    const [percentaje, setPercentaje] = useState<number>(0)
    const [amountItem, setAmountItem] = useState<number>(0)


    useEffect(() =>{
        const getBudgetStorage = async() => {
            try {
                const budgetStorage = await AsyncStorage.getItem('budget');
                console.log(budgetStorage)
                setBudget( budgetStorage? JSON.parse(budgetStorage): ([] as BudgetI[]) )
            } catch (error) {
                console.log(error)
            }
        }
        getBudgetStorage()
    },[])

    useEffect(() =>{
        const getBillsStorage = async() => {
            try {
                const billsStorage = await AsyncStorage.getItem('bills');
                setBills( billsStorage? JSON.parse(billsStorage): ([] as BillI[]) )
                
            } catch (error) {
                console.log(error)
            }
        }
        getBillsStorage()
    },[])

    useEffect(() =>{
        if(budget.length >= 1){

            const saveBudgetStorage = async() =>{
                try {
                    await AsyncStorage.setItem('budget', JSON.stringify(budget))
                } catch (error) {
                    console.log(error)
                }
            }
            saveBudgetStorage()
        }
    }, [budget])

    useEffect(()=>{
        const saveBillsStorage = async() =>{
            try {
                await AsyncStorage.setItem('bills', JSON.stringify(bills))
            } catch (error) {
                console.log(error)
            }
        }
        saveBillsStorage()
    },[bills])

    useEffect(() => {
        
        const totalSpent  = bills.reduce( (total, spend )   => Number(spend.amount)  + total, 0)
        const totalBudget = budget.reduce( (total, budget ) => Number(budget.amount) + total, 0)
        const newPercentaje = ( (totalSpent / totalBudget!) * 100 )

        if(budget.length>0){
            setAddBudget(false)
        }

        setPercentaje(newPercentaje)
        setSpent(totalSpent)
        setAvailable(totalBudget! - totalSpent)
        
    }, [bills, budget])

    const handleNewBudget = ( {amount, id, date}: BudgetI ) => {
        
        if (Number(amount) <= 0 ){
            Alert.alert('Error', 'The budget cannot be 0 or less', [
                { text: 'OK', onPress: () => console.log('OK button pressed') }
            ])
            return
        }

        const myNewBudget = { id, date, amount}
        myNewBudget.id = generateId()
        myNewBudget.date = new Date()
        setBudget([...budget, myNewBudget])

        setAddBudget(false)
    } 

    const handleSpent = ( 
        { name, amount, category, id, date }: BillI
    ) => {

        if ((name.trim() === '' || category.trim() === '') || (amount === null || amount! <= 0)) {
            Alert.alert('Error', 'All fields are required', [
                { text: 'OK' }
            ])
            return
        }

        if (amount! - (id?amountItem: 0)  > available ){  
            Alert.alert("You don't have enough money", `You only have ${available +  (id? amountItem: 0) } dollars available`, [
                { text: 'OK' }
            ])
            return
        }

        const spentToUpdate = { name, amount, category, id, date }
       
        if(id){
            const updatedBills = bills.map( spentState  => spentState.id === id? spentToUpdate : spentState )
            setBills(updatedBills)
        }else{
            spentToUpdate.id = generateId()
            spentToUpdate.date = new Date()
            setBills([...bills, spentToUpdate])
        }
        setAmountItem(0)
        setModal(!modal) 
        
    }

    const deleteSpent = (id:string) => {
        Alert.alert('You want to eliminate this expense', 'Once deleted it cannot be recovered', [
            { text: 'No', style:'cancel' },
            { text: 'Yes Delete', onPress: () => {
                const updatedBills = bills.filter(spentState => 
                    spentState.id !== id)
                setBills(updatedBills)
                setModal(false)
                setBill(undefined)
            }}

        ])
    }

    const resetApp = () =>{
        Alert.alert("Do you want to reset the pp", `This will eliminate budget and bills`, [
            { text: 'NO', style: 'cancel' },
            { text: 'Yes reset', onPress: async() => {
                try {
                    await AsyncStorage.clear()
                    setAddBudget(true)
                    setBudget([])
                    setBills([])
                } catch (error) {
                    console.log(error)
                }
            }}
        ])
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <View  style={styles.header}>
                    <Header />
                    { addBudget? 

                        <NewBudget 
                            handleNewBudget={handleNewBudget} 
                            budget={budget}
                            setAddBudget={setAddBudget}
                            resetApp={resetApp}
                        />  
                        : 
                        <ControlBudget 
                            budget={budget.reduce((total, budget ) => Number(budget.amount) + total, 0)} 
                            available={available}
                            spent={spent}
                            percentaje={percentaje}
                            setAddBudget={setAddBudget}
                        /> 
                    }
                </View>

                {!addBudget && 
                    <>  
                        {bills.length > 0 &&
                            <Filter
                                filter={filter}
                                setFilter={setFilter}
                                bills={bills}
                                setFilteredBills={setFilteredBills}
                            />
                        }
                        
                        <ListBills 
                            setModal={setModal} 
                            bills={bills}
                            setBill={setBill}
                            filter={filter}
                            filteredBills={filteredBills}
                        /> 
                    </>
                    
                }
            </ScrollView>
            {modal&&
                <Modal 
                    animationType='slide'
                    visible={modal}
                >
                    <FormSpent
                        setModal={setModal}
                        handleSpent={handleSpent}
                        bill={bill}
                        setBill={setBill}
                        deleteSpent={deleteSpent}
                        setAmountItem={setAmountItem}
                    />
                </Modal>
            }
            {!addBudget && (
                <Pressable 
                    onPress={() => setModal(!modal)} 
                    style={styles.btnPlus}
                >   

                    <View style={styles.contentBtn1} ></View>
                    <View style={styles.contentBtn2} ></View>

                    {/* <Image
                        style={styles.image}
                        source={require('../img/new-spent.png')}
                    /> */}
                </Pressable>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.secondaryColor,
        flex: 1
    },
    header:{
        backgroundColor: Colors.primaryColor,
        minHeight: 400
    },
    
    btnPlus:{
        width: 60,
        height: 60, 
        position: 'absolute',
        bottom: 40,
        right: 30,
        backgroundColor: colors.primaryColor,
        borderRadius: 100,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    contentBtn1:{
        position: 'absolute',
        backgroundColor: colors.secondaryColor,
        width: 6, 
        height: 30,
        top: 15,
        left: 27
    },
    contentBtn2:{
        position: 'absolute',
        backgroundColor: colors.secondaryColor,
        width: 30, 
        height: 6,
        top: 27,
        left: 15
    },
    image:{
        width: 60,
        height: 60
    }
});

export default App;
