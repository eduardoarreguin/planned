import React from 'react'
import { View } from 'react-native'

import { Picker } from '@react-native-picker/picker'

interface PickerProps{
  selectedValue: string
  onValueChange: React.Dispatch<React.SetStateAction<string>>
}


const MyPicker: React.FC<PickerProps> = ({selectedValue, onValueChange}) => {
  return (
    <View style={{}} >
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

    </View>
    
  )
}

export default MyPicker
