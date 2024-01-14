import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import globalStyles from '../styles/globalStyles'
import { FilterI } from '../interfaces/interfaces'
import MyPicker from './MyPicker'



const Filter: React.FC<FilterI> = ({ filter, setFilter, bills, setFilteredBills }) => {

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
            <Text style={styles.label}>Filter</Text>
            <MyPicker selectedValue={filter} onValueChange={ setFilter } />
                
        </View>
    )
}

export default Filter

const styles = StyleSheet.create({
    container:{
        ...globalStyles.container,
        marginTop: 30
    },
    label:{
        fontSize: 22,
        fontWeight: '900',
        color: '#64748B'
    }
    
})