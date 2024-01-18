import React from 'react'
import { Pressable, StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';

import globalStyles from '../styles/globalStyles';
import {  } from '../interfaces/interfaces';
import { formatQuantity } from '../helpers';
import Colors from '../styles/colors';

import CircularProgress from 'react-native-circular-progress-indicator';
import colors from '../styles/colors';

interface ControlBudgetProps{
    budget:       number;
    available:    number;
    spent:        number;
    percentaje:   number;
    setAddBudget: React.Dispatch<React.SetStateAction<boolean>>
}

const controlBudget:React.FC<ControlBudgetProps> = ({
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
                    inActiveStrokeColor={Colors.secondaryColor}
                    inActiveStrokeWidth={20}
                    activeStrokeColor={Colors.primaryColor}
                    activeStrokeWidth={20}
                    titleStyle={{ fontWeight: 'bold', fontSize: 29+1 }}
                    titleColor={Colors.textColor}
                    
                />
            </View>

            <View style={styles.containerText}>

                <Pressable 
                    onPress={() => setAddBudget(true)} 
                    style={[
                        globalStyles.btn as StyleProp<TextStyle>,
                        { 
                            backgroundColor: Colors.pinkLight, 
                            marginBottom: 30 
                        }
                    ]}
                >
                    <Text style ={styles.btnPlusText}>Add Budget</Text>
                </Pressable>
                
                <Text style={styles.text}>
                    <Text style={[styles.text, {color:Colors.primaryColor}]} >Budget {' '}</Text>
                    {formatQuantity(budget)}
                </Text>

                <Text style={styles.text}>
                    <Text style={[styles.text, {color:Colors.primaryColor}]} >Available {' '}</Text>
                    {formatQuantity(available)}
                </Text>

                <Text style={styles.text}>
                    <Text style={[styles.text, {color:Colors.primaryColor}]} >Spend {' '}</Text>
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
    btnPlusText:{
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    containerText:{
        marginTop:50
    },
    text:{
        fontSize: 24,
        textAlign: 'center',
        marginLeft: 10,
        color: colors.textColor,
        fontWeight: '700',
    },
    
})