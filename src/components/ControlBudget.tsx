import React, { useState, useEffect } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native';

import Line from '../components/Line';
import globalStyles from '../styles/globalStyles';
import { ControlBudgetI } from '../interfaces/interfaces';
import { formatQuantity } from '../helpers';
import { danger, textColor } from '../styles/colors';

import CircularProgress from 'react-native-circular-progress-indicator';

const controlBudget:React.FC<ControlBudgetI> = ({
    budget, 
    available, 
    spent, 
    percentaje, 
    setAddBudget
}) => {

    return (
        <View style={styles.container} >
            <View style={styles.centerGrapic}>
               
                <CircularProgress
                    value={!isNaN(percentaje)? percentaje : 0 }
                    duration={2000}
                    radius={150}
                    valueSuffix={'%'}
                    title='spent'
                    inActiveStrokeColor='#F5F5F5'
                    inActiveStrokeWidth={20}
                    activeStrokeColor='#3B82F6'
                    activeStrokeWidth={20}
                    titleStyle={{ fontWeight: 'bold', fontSize: 29+1 }}
                    titleColor='#64748B'
                    
                />
            </View>

            <View style={styles.containerText}>

                <Pressable 
                    onPress={() => setAddBudget(true)} 
                    style={styles.btnPlus}
                >
                    <Text style ={styles.btnPlusText}>Add Budget</Text>
                </Pressable>
                
                <Text style={styles.value}>
                    <Text style={styles.label} >Budget {' '}</Text>
                    {formatQuantity(budget)}
                </Text>

                <Text style={styles.value}>
                    <Text style={styles.label} >Available {' '}</Text>
                    {formatQuantity(available)}
                </Text>

                <Text style={styles.value}>
                    <Text style={styles.label} >Spend {' '}</Text>
                    {formatQuantity(spent)}
                </Text>
            </View>
        </View>
    )
}

export default controlBudget

const styles = StyleSheet.create({
    container:{
        ...globalStyles.container,
    },
    centerGrapic:{
        alignItems:'center'
    },
    btnPlus:{
        backgroundColor: danger,
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        alignItems:'center'

    },
    btnPlusText:{
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    containerText:{
        marginTop:50
    },
    value:{
        fontSize: 24,
        textAlign: 'center',
        marginLeft: 10
    },
    label:{
        fontWeight: '700',
        color: textColor
    },
    
})