import React, {useState, useEffect} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
    Pressable,
} from 'react-native';

import {danger, formColor, formTextColor, secondaryColor} from '../styles/colors';
import globalStyles from '../styles/globalStyles';
import {FormSpentI} from '../interfaces/interfaces';
import MyPicker from './MyPicker';

const FormSpend: React.FC<FormSpentI> = ({
    setModal,
    handleSpent,
    bill,
    setBill,
    deleteSpent,
    setAmountItem
}) => {
    const [name, setName] = useState<string>('');
    const [amount, setAmount] = useState<number|null>(null);
    const [category, setCategory] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [date, setDate] = useState<Date>();

    useEffect(() =>{
        if (bill?.id) {
            setAmountItem(bill.amount!)
        }
    }, [bill])
    useEffect(() => {
        if (bill?.name) {
            setName(bill.name);
            setAmount(bill.amount);
            setCategory(bill.category);
            setId(bill.id!);
            setDate(bill.date!);
        }
    }, [bill]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.containerButtons} >

                <Pressable
                    style={[styles.btn, styles.btnCancel]}
                    onPress={() => {
                        setModal(false);
                        setBill(undefined);
                    }}>
                    <Text style={styles.btnText}>Cancel</Text>
                </Pressable>
                {
                    !!id&&(
                       <Pressable
                            style={[styles.btn, styles.btnDelete]}
                            onPress={()=>{
                                deleteSpent(id)
                            }}
                        > 
                            <Text style={styles.btnText}>Delete</Text>
                        </Pressable>
                    )
                }
                
                    

            </View>

            <View style={styles.form}>
                <Text style={styles.title}>{bill?.name ? 'Edit' : 'New'} Spent</Text>

                <View style={styles.field}>
                    <Text style={styles.label}>Spent name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="spent name ej food"
                        value={name}
                        onChangeText={value => setName(value)}
                    />
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Amount of expense</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="amount of expense"
                        keyboardType="numeric"
                        returnKeyType="done"
                        value={amount?.toString()}
                        onChangeText={(text:string) => {
                            const number = parseInt(text, 10);
                            setAmount(!isNaN(number)? number : 0)
                        }}
                    />
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Category Spent</Text>
                    <MyPicker selectedValue={category} onValueChange={setCategory}/>
                        
                </View>

                <Pressable
                    style={styles.submitBtn}
                    onPress={() => handleSpent({name, amount, category, id, date})}>
                    <Text style={styles.submitBtnText}>
                        {' '}
                        {bill?.name ? 'Save Changes ' : 'Add'} spent
                  </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default FormSpend;

const styles = StyleSheet.create({
    container: {
        backgroundColor: formColor,
        flex: 1,
    },
    containerButtons:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btn:{
        padding: 10,
        marginTop: 30,
        marginHorizontal: 10,
        flex: 1
    },
    btnCancel: {
        backgroundColor: danger,
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
    form: {
        ...globalStyles.container,
        marginTop: -10,
    },
    title: {
        textAlign: 'center',
        fontSize: 28,
        marginBottom: 30,
        color: formTextColor,
    },
    field: {
        marginVertical: 25,
    },
    label: {
        color: formTextColor,
        textTransform: 'uppercase',
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: secondaryColor,
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    submitBtn: {
        backgroundColor: '#3B82F6',
        padding: 10,
        marginTop: 0,
        borderRadius: 2,
    },
    submitBtnText: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});
