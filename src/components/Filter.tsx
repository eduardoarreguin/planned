import React, { useEffect } from 'react'
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native'

import globalStyles from '../styles/globalStyles'
import { BillI } from '../interfaces/interfaces'
import MyPicker from './MyPicker'

interface FilterProps {
    filter:           string;
    setFilter:        React.Dispatch<React.SetStateAction<string>>;
    bills:            BillI[];
    setFilteredBills: React.Dispatch<React.SetStateAction<BillI[]>>;
  }

const Filter: React.FC<FilterProps> = ({ filter, setFilter, bills, setFilteredBills }) => {

    useEffect(() => {
        if(filter === ''){
            setFilteredBills([])
        }else{
            const spentFiltered = bills.filter( bill => bill.category === filter )
            setFilteredBills( spentFiltered )
        }
    }, [filter])

    return (
        <View style={styles.container} >
            <Text style={[globalStyles.title as StyleProp<TextStyle>, {marginBottom: 30}]}>Filter</Text>
            <MyPicker selectedValue={filter} onValueChange={ setFilter } />
                
        </View>
    )
}

export default Filter

const styles = StyleSheet.create({
    container:{
        ...globalStyles.container,
        marginTop: 30,
        paddingTop: 20
    }
    
})