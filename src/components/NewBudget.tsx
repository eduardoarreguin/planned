import { Pressable, StyleProp, StyleSheet, Text, TextInput, TextStyle, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { danger, primaryColor, secondaryColor } from '../styles/colors'
import { BudgetI, NewBudgetI } from '../interfaces/interfaces'
import globalStyles from '../styles/globalStyles'
import Budget from './Budget'
import { formatQuantity } from '../helpers'
import Line from './Line'

const newBudget: React.FC<NewBudgetI> = ({
    handleNewBudget, 
    budget, 
    setAddBudget,
    resetApp
}) => {

    const [amount, setAmount] = useState<number>(0)
    const [id, setId] = useState<string>('');
    const [date, setDate] = useState<Date>();

    const handleBudget = (budget:BudgetI) =>{
        return (
            <Budget 
                id={budget.id}
                amount={budget.amount}
                date={budget.date}
                key={budget.id}
            />
        )
    }

    return (
        <View style={{paddingBottom: 150}} >
            <View style={styles.container}>
                <Text style={globalStyles.title as StyleProp<TextStyle>}>{budget.length >= 1? 'New': 'Initial'} Budget</Text>
                <TextInput
                    keyboardType='numeric'
                    placeholder='Add your Budget: Ej. 300'
                    style={styles.input}
                    value={
                        amount.toString()
                    }
                    returnKeyType="done"
                    onChangeText={(text: string) => {
                        const number = parseInt(text, 10);
                        const isNumber = !isNaN(number);
                        setAmount(isNumber ? number : 0);

                    }}
                />
                <View style={styles.containerButtons} >
                {budget.length >= 1&&
                    <Pressable
                        style={[styles.btn, styles.btnCancel]}
                        onPress={() => { 
                            setAddBudget(false)
                        }}
                    >
                        <Text style={styles.btnText}>Cancel</Text>
                    </Pressable>
                }
                
                <Pressable 
                    style={[styles.btn, styles.btnAdd]} 
                    onPress={()=> 
                        handleNewBudget({amount, id, date})
                    }
                >
                    <Text style={styles.btnText} >Add budget</Text>
                </Pressable>
                </View>

            
            </View>
            {budget.length >= 1&&
                <View style={styles.listBudgets} >
                    <Text style={[globalStyles.title as StyleProp<TextStyle>, {marginBottom: 20}]}>List Budgets</Text>
                    {budget.map( handleBudget)}

                    <Line />
                    <View style={styles.contentTotal} >
                        <Text style={[styles.textTotal, {color: primaryColor}]}>Total</Text>
                        <Text style={styles.textTotal } >{formatQuantity(budget.reduce((total, budget ) => Number(budget.amount) + total, 0))}</Text>

                    </View>
                    <Pressable
                        style={[styles.btn, styles.btnDelete]}
                        onPress={() => { resetApp() }}
                    >
                        <Text style={styles.btnText}>Reset App</Text>
                    </Pressable>
                </View>
            }
            
        </View>
    )
}

export default newBudget

const styles = StyleSheet.create({
    container:{
        ...globalStyles.container,
    },
    input:{
        backgroundColor: secondaryColor,
        padding: 10, 
        borderRadius: 10,
        textAlign: 'center',
        marginTop: 30
    },
    containerButtons:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btn:{
        padding: 10,
        marginTop: 30,
        marginHorizontal: 10,
        flex: 1
    },
    btnAdd:{
        backgroundColor: primaryColor,
        
    },
    btnCancel: {
        backgroundColor: danger,
    },
    btnDelete:{
        backgroundColor: 'red',
    },
    btnText: {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#FFF',
    },
    listBudgets:{
        ...globalStyles.container,
        transform: [{translateY: 100,}],
        margin: 10,
    },
    contentTotal:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },
    textTotal:{
        fontSize: 22,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
})