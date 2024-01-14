import React, { useState, useEffect } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import globalStyles from '../styles/globalStyles'
import { ControlBudgetI } from '../interfaces/interfaces'
import { formatQuantity } from '../helpers'
import { textColor } from '../styles/colors'

 import CircularProgress from 'react-native-circular-progress-indicator'

const controlBudget:React.FC<ControlBudgetI> = ({
    budget, 
    available, 
    spent, 
    percentaje, 
    setAddBudget
}) => {

    // //const [available, setAvailable]   = useState<number>(0)
    // const [spend, setSpend]           = useState<number>(0)
    // const [percentaje, setPercentaje] = useState<number>(0)

    // useEffect(() => {
    //     const totalSpend = bills.reduce( (total, spend ) => Number(spend.amount) + total, 0)
    //     const newPercentaje = (
    //         (totalSpend / budget!) * 100
    //     )

    //     setPercentaje(newPercentaje)
    //     setSpend(totalSpend)
    //     setAvailable(budget! - totalSpend)
        
    // }, [bills])
    

    return (
        <View style={styles.container} >
            <View style={styles.centerGrapic}>
               
                <CircularProgress
                    value={percentaje}
                    duration={2000}
                    radius={150}
                    valueSuffix={'%'}
                    title='spent'
                    inActiveStrokeColor='#F5F5F5'
                    inActiveStrokeWidth={20}
                    activeStrokeColor='#3B82F6'
                    activeStrokeWidth={20}
                    titleStyle={{ fontWeight: 'bold', fontSize: 24 }}
                    titleColor='#64748B'
                    
                />
            </View>

            <View style={styles.containerText}>

                <View style={{justifyContent: 'space-between', alignItems:'center', flexDirection: 'row'}} >
                    

                    <Text style={styles.value}>
                        <Text style={styles.label} >Budget {' '}</Text>
                        {formatQuantity(budget)}
                    </Text>

                    <Pressable 
                        onPress={() => setAddBudget(true)} 
                        style={styles.btnPlus}
                    >
                        <Text style ={styles.btnPlusText}>Add</Text>
                    </Pressable>
                </View>

                <View style={styles.line}></View>

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
    containerText:{
        marginTop:50
    },
    value:{
        fontSize: 24,
        textAlign: 'justify',
        marginLeft: 10
    },
    label:{
        fontWeight: '700',
        color: textColor
    },
    line:{
        backgroundColor: '#64748B',
        height: 2,
        width: '95%',
        alignSelf: 'center',
        margin: 10
    },
    btnPlus:{
        backgroundColor: '#31aef6',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginRight: 10

    },
    btnPlusText:{
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
})