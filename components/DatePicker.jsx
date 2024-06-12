import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';

import { icons } from "../constants";

/**
 * 
 * @param {Date} date 
 * @returns 
 */
const formatDate = date => {
  const day = `${date.getDate()}`.padStart(2, '0')
  const month = `${date.getMonth()}`.padStart(2, '0')

  return `${day}/${month}/${date.getFullYear()}`
}

const DatePicker = ({
  title,
  value,
  onChange,
  otherStyles,
}) => {
  const [show, setShow] = useState(false)

  const onPress = () => setShow(true)
  const onChangeInternal = (e, date) => {
    if (e.type === 'set') {
      setShow(false)
      onChange(date)
      return
    }

    if (e.type === 'dismissed') {
      setShow(false)
      return
    }
  }

  return (
    <View className={`space-y-2 ${otherStyles}`}>

      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      <TouchableOpacity onPress={onPress}>
        <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
          <Text className="flex-1 text-white font-psemibold text-base">
            {formatDate(value ?? new Date())}
          </Text>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={value}
              mode="date"
              is24Hour={true}
              onChange={onChangeInternal}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DatePicker;
