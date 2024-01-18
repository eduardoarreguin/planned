import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native'
import React from 'react'
import { BillI } from '../interfaces/interfaces';
import Bill from './Bill'
import globalStyles from '../styles/globalStyles'

export interface ListBillsProps{
    bills:         BillI[]
    setModal:      React.Dispatch<React.SetStateAction<boolean>>;
    setBill:       React.Dispatch<React.SetStateAction<BillI|undefined>> ;
    filter:        string;
    filteredBills: BillI[];
}

const ListBills: React.FC<ListBillsProps>  = ({
    bills, 
    setModal, 
    setBill, 
    filter,
    filteredBills
}) => {
    const handleBill = (bill:BillI) =>{
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
            <Text style={[globalStyles.title as StyleProp<TextStyle>, {marginTop: 20}]} >Bills</Text>
            
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
    noSpents:{
        marginVertical: 20,
        textAlign: 'center',
        fontSize: 20
    }
})