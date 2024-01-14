import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { buttonColor, primaryColor, secondaryColor } from '../styles/colors'
import { NewBudgetI } from '../interfaces/interfaces'
import globalStyles from '../styles/globalStyles'

const newBudget: React.FC<NewBudgetI> = ({
    handleNewBudget, 
    budget, 
    setBudget,
    firstBudget,
    setAddBudget
}) => {

    const [budgetAux, setBudgetAux] = useState<number>(0)

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Define Budget</Text>
            <TextInput
                keyboardType='numeric'
                placeholder='Add your Budget: Ej. 300'
                style={styles.input}
                value={
                    firstBudget? budget.toString() : budgetAux.toString()
                }
                returnKeyType="done"
                onChangeText={(text: string) => {
                    const number = parseInt(text, 10);
                    const isNumber = !isNaN(number);
                    firstBudget ? setBudget(isNumber ? number : 0) : setBudgetAux(isNumber ? number : 0);
                }}
            />
            <View style={styles.containerButtons} >
            {!firstBudget&&
                <Pressable
                    style={[styles.btn, styles.btnCancel]}
                    onPress={() => { 
                        setAddBudget(false)
                    }}
                >
                    <Text style={styles.btnText}>Cancelar</Text>
                </Pressable>
            }
            
            <Pressable 
                style={[styles.btn, styles.btnAdd]} 
                onPress={()=> 
                    handleNewBudget(firstBudget ? budget : budgetAux )
                }
            >
                <Text style={styles.btnText} >Add budget</Text>
            </Pressable>
            </View>
        
        </View>
    )
}

export default newBudget

const styles = StyleSheet.create({
    container:{
        ...globalStyles.container
    },
    label:{
        textAlign: 'center',
        fontSize: 24,
        color: primaryColor,
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
    btnAdd:{
        backgroundColor: buttonColor,
        
    },
    btn:{
        padding: 10,
        marginTop: 30,
        marginHorizontal: 10,
        flex: 1
    },
    btnCancel: {
        backgroundColor: '#DB2777',
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
})