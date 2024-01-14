import React from 'react'
import { Picker } from '@react-native-picker/picker'
import { PickerI } from '../interfaces/interfaces'

const MyPicker: React.FC<PickerI> = ({selectedValue, onValueChange}) => {
  return (
    <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
        <Picker.Item label="-- Select --" value="" />
        <Picker.Item label="Save" value="save" />
        <Picker.Item label="Food" value="food" />
        <Picker.Item label="Home" value="home" />
        <Picker.Item label="Miscellaneous" value="miscellaneous" />
        <Picker.Item label="Leisure" value="leisure" />
        <Picker.Item label="Health" value="health" />
        <Picker.Item label="Subscriptions" value="subscriptions" />
    </Picker>
  )
}

export default MyPicker