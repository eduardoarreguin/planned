
import React from 'react';
import { StyleSheet, Text, View, StyleProp, TextStyle } from 'react-native';
import { BudgetI } from '../interfaces/interfaces';
import { formatDate, formatQuantity } from '../helpers';
import globalStyles from '../styles/globalStyles';

const Budget: React.FC<BudgetI> = ({id, date, amount}) => {
    return (
    
        <View style={styles.content}>
            <Text style={globalStyles.textDate as StyleProp<TextStyle>} >{formatDate(Number(date))}</Text>
            <Text style={globalStyles.textAmount as StyleProp<TextStyle>} > {formatQuantity(amount)}</Text>

        </View>
    )
}

export default Budget

const styles = StyleSheet.create({
    content:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },
})