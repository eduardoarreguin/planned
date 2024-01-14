import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { CategoriesI, FormDataI } from '../interfaces/interfaces'
import globalStyles from '../styles/globalStyles'
import { formatDate, formatQuantity } from '../helpers'

const dictionaryIcons: CategoriesI = {
    save:          require('../img/icon_save.png'),
    food:          require('../img/icon_food.png'),
    home:          require('../img/icon_home.png'),
    miscellaneous: require('../img/icon_bills.png'),
    leisure:       require('../img/icon_leisure.png'),
    health:        require('../img/icon_health.png'),
    subscriptions: require('../img/icon_subscriptions.png'),


}

const Bill: React.FC<FormDataI>  = ({id, name, amount, category, date, setModal, setBill}) => {

    const handleActions = () =>{
        setModal!(true)
        setBill!({ name, amount, category, id, date })
    }

    return (
        <TouchableOpacity  
            activeOpacity={0.6}
            onLongPress={handleActions}
        >
            <View style={styles.container}>

                <View style={styles.content}>

                    <View style={styles.containerImage}>
                        <Image 
                            style={styles.image}
                            source={dictionaryIcons[category]} 
                        />
                        <View style={styles.containerText}>
                            <Text style={styles.category}>{category}</Text>
                            <Text style={styles.name}>{name}</Text>
                            <Text style={styles.date}>{formatDate(date)}</Text>
                        </View>
                    </View>

                    <Text style={styles.amount}>{formatQuantity(amount)}</Text>
                </View>

            </View>
        </TouchableOpacity>
    )
}

export default Bill

const styles = StyleSheet.create({
    container:{
        ...globalStyles.container,
        marginBottom: 20
    },
    content:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    containerImage:{
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    image:{
        width: 80,
        height: 80,
        marginRight: 20
    },
    containerText:{
        flex: 1,
    },
    category:{
        color: '#94A3B8',
        fontSize: 16,
        fontWeight: '700',
        textTransform: 'uppercase',
        marginBottom: 5
    },
    name:{
        fontSize: 22,
        color: '#64748B',
        marginBottom: 5
    },
    amount:{
        fontSize: 20,
        fontWeight: '700'
    },
    date:{
        fontWeight: '700',
        color: '#DB2777'
    }

})