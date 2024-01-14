import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ListBillsI, FormDataI } from '../interfaces/interfaces';
import Bill from './Bill'

const ListBills: React.FC<ListBillsI>  = ({
    bills, 
    setModal, 
    setBill, 
    filter,
    filteredBills
}) => {
    const handleBill = (bill:FormDataI) =>{
        return (
            <Bill 
                id={bill.id}
                name={bill.name}
                amount={bill.amount}
                category={bill.category}
                date={bill.date}
                key={bill.id}
                setModal={setModal}
                setBill={setBill}
            />
        )
    }

    return (
        <View style={styles.container} >
            <Text style={styles.title} >Bills</Text>
                
            { filter? filteredBills.map( handleBill ) : bills.map( handleBill) }
            
            { ((bills.length === 0) || (filteredBills.length === 0 && !!filter ))&&
                <Text style={styles.noSpents}>No expenses there</Text>
            }
        </View>
    )
}
 
export default ListBills

const styles = StyleSheet.create({
    container:{
        marginTop: 70,
        marginBottom: 100,
    },
    title:{
        color: '#64748B',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: '700',
        marginTop: 20
    },
    noSpents:{
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 20
    }
})