import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Pressable, Image, Modal, Text, ScrollView } from 'react-native';

import Header  from './src/components/Header';
import NewBudget  from './src/components/NewBudget';
import ControlBudget  from './src/components/ControlBudget';
import FormSpent from './src/components/FormSpent';

import { primaryColor, secondaryColor } from './src/styles/colors';
import { BudgetI, FormDataI } from './src/interfaces/interfaces';
import { generateId } from './src/helpers';
import ListBills from './src/components/ListBills';
import Filter from './src/components/Filter'; 


const App: React.FC = () => {   
    const [ firstBudget, setfirstBudget ]    = useState<boolean>(true)
    const [ addBudget, setAddBudget ]         = useState<boolean>(true)
    const [ budget, setBudget ]               = useState<number>(0)
    //const [ budget, setBudget ]               = useState<BudgetI[]>([])

    const [ bills, setBills ]                 = useState<FormDataI[]>([])
    const [ modal, setModal ]                 = useState<boolean>(false)
    const [ bill, setBill ]                   = useState<FormDataI>()
    const [ filter, setFilter ]               = useState<string>('')
    const [ filteredBills, setFilteredBills ] = useState<FormDataI[]>([])
    
    const [available, setAvailable]   = useState<number>(0)
    const [spent, setSpent]           = useState<number>(0)
    const [percentaje, setPercentaje] = useState<number>(0)
    const [amountItem, setAmountItem] = useState<number>(0)

    

    useEffect(() => {
        const totalSpent = bills.reduce( (total, spend ) => Number(spend.amount) + total, 0)
        const newPercentaje = (
            (totalSpent / budget!) * 100
        )

        setPercentaje(newPercentaje)
        setSpent(totalSpent)
        setAvailable(budget! - totalSpent)
        
    }, [bills, budget])

    const handleNewBudget = ( myBudget: number ) => {
        console.log(firstBudget)
        if(!firstBudget){
            setBudget( myBudget + budget)
        }
        if (Number(myBudget) <= 0 ){
            Alert.alert('Error', 'The budget cannot be 0 or less', [
                { text: 'OK', onPress: () => console.log('OK button pressed') }
            ])
            return
        }
        setfirstBudget(false)
        setAddBudget(false)
    } 

    const handleSpent = ( 
        { name, amount, category, id, date }: FormDataI
    ) => {

        if ((name.trim() === '' || category.trim() === '') || (amount === null || amount <= 0)) {
            Alert.alert('Error', 'All fields are required', [
                { text: 'OK' }
            ])
            return
        }
        // console.log(amountItem, 'amountItem')
        // console.log(budget, 'budget')
        // console.log(amount, 'amount')
        // console.log(available, 'available')
        //return

        if (amount! - (id?amountItem: 0)  > available ){  
            Alert.alert("You don't have enough money", `You only have ${available +  (id? amountItem: 0) } dollars available`, [
                { text: 'OK' }
            ])
            return
        }

        const spentToUpdate = { name, amount, category, id, date }
       
        if(id){
            const updatedExpenses = bills.map( spentState  => spentState.id === id? spentToUpdate : spentState )
            setBills(updatedExpenses)
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
                const updatedExpenses = bills.filter(spentState => 
                    spentState.id !== id)
                setBills(updatedExpenses)
                setModal(false)
                setBill(undefined)
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
                            setBudget={setBudget}
                            firstBudget={firstBudget}
                            setAddBudget={setAddBudget}
                        />  
                        : 
                        <ControlBudget 
                            budget={budget} 
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
                    <Image
                        style={styles.image}
                        source={require('./src/img/new-spent.png')}
                    />
                </Pressable>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: secondaryColor,
        flex: 1
    },
    header:{
        backgroundColor: primaryColor,
        minHeight: 400
    },
    
    btnPlus:{
        width: 60,
        height: 60, 
        position: 'absolute',
        bottom: 40,
        right: 30
    },
    image:{
        width: 60,
        height: 60
    }
});

export default App;
