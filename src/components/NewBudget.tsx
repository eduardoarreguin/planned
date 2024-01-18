import { Pressable, StyleProp, StyleSheet, Text, TextInput, TextStyle, View } from 'react-native'
import React, { useState } from 'react'

import Colors from '../styles/colors'
import { BudgetI,  } from '../interfaces/interfaces'
import globalStyles from '../styles/globalStyles'
import Budget from './Budget'
import { formatQuantity } from '../helpers'
import Line from './Line'

interface NewBudgetProps{
    handleNewBudget: (budget:BudgetI) => void;
    budget:          BudgetI[]
    setAddBudget:    React.Dispatch<React.SetStateAction<boolean>>;
    resetApp:        () => void;
}

const newBudget: React.FC<NewBudgetProps> = ({
    handleNewBudget, 
    budget, 
    setAddBudget,
    resetApp
}) => {

    const [amount, setAmount] = useState<number>(0)
    const [id, setId] = useState<string>('');
    const [date, setDate] = useState<Date>();

    const handleBudget = (budget:BudgetI): React.JSX.Element => {
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
                            style={[
                                globalStyles.btn as StyleProp<TextStyle>, 
                                styles.btnCancel
                            ]}
                            onPress={() => { 
                                setAddBudget(false)
                            }}
                        >
                            <Text style={styles.btnText}>Cancel</Text>
                        </Pressable>
                    }
                
                    <Pressable 
                        style={[
                            globalStyles.btn as StyleProp<TextStyle>, 
                            styles.btnAdd
                        ]} 
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
                        <Text style={[styles.textTotal, {color: Colors.primaryColor}]}>Total</Text>
                        <Text style={styles.textTotal } >{formatQuantity(budget.reduce((total, budget ) => Number(budget.amount) + total, 0))}</Text>

                    </View>
                    <Pressable
                        style={[
                            globalStyles.btn as StyleProp<TextStyle>, 
                            styles.btnDelete
                        ]}
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
        backgroundColor: Colors.secondaryColor,
        padding: 10, 
        borderRadius: 10,
        textAlign: 'center',
        marginTop: 30
    },
    containerButtons:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    
    btnAdd:{
        backgroundColor: Colors.primaryColor,
        
    },
    btnCancel: {
        backgroundColor: Colors.pinkLight,
    },
    btnDelete:{
        backgroundColor: Colors.pinkLight,
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
        padding: 5,
        marginBottom: 30
    },
    textTotal:{
        fontSize: 22,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
})