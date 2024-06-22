import {
  View,
  Text,
  ScrollView,
} from "react-native";
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomButton, FormField } from "../../components";
import { currencyFormat } from "../../lib/utils";

const Calculator = () => {
  const [form, setForm] = useState({
    initialInvesment: 0.0,
    monthlyContribution: 0.0,
    lengthInYears: 1.0,
    interestRate: 0.0,
  });

  const [total, setTotal] = useState(0)

  const submit = () => {
    const monthlyInterestRate = (form.interestRate / 12) / 100
    let sum = form.initialInvesment

    for (let i = 1; i <= (form.lengthInYears * 12); i++) {
      if (i > 1 && form.monthlyContribution != 0) {
        sum += form.monthlyContribution
      }

      sum += (sum * monthlyInterestRate)
    }

    setTotal(sum)
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 mb-6 mt-7">
        <Text className="text-2xl text-white font-psemibold">
          Calculadora de Interes Compuesto
        </Text>

        <FormField
          title="Inversión Inicial"
          value={form.initialInvesment}
          handleChangeText={e => {
            let num = parseFloat(e)
            if (Number.isNaN(num)) num = 0;
            setForm({ ...form, initialInvesment: num })
          }}
          otherStyles="mt-7"
          inputMode="decimal"
        />

        <FormField
          title="Contribución Mensual"
          value={form.monthlyContribution}
          placeholder="0"
          handleChangeText={e => {
            let num = parseFloat(e)
            if (Number.isNaN(num)) num = 0;
            setForm({ ...form, monthlyContribution: num })
          }}
          otherStyles="mt-7"
          inputMode="decimal"
        />

        <FormField
          title="Duración en Años"
          value={form.lengthInYears}
          placeholder="10"
          handleChangeText={e => {
            let num = parseInt(e)
            if (Number.isNaN(num)) num = 1;
            setForm({ ...form, lengthInYears: num })
          }}
          otherStyles="mt-7"
          inputMode="number"
        />

        <FormField
          title="Interes Efectivo Anual"
          value={form.interestRate}
          placeholder="10.5"
          handleChangeText={e => {
            let num = parseFloat(e)
            if (Number.isNaN(num)) num = 0.0;
            setForm({ ...form, interestRate: num })
          }}
          otherStyles="mt-7"
          inputMode="decimal"
        />

        <CustomButton
          title="Calcular"
          handlePress={submit}
          containerStyles="mt-7"
        />

        <View className="bg-black-200 rounded-lg p-7 mt-7">
          <Text className="text-base text-gray-100 font-pmedium">
            Inversión Inicial:
          </Text>
          <Text className="text-xl text-gray-100 font-psemibold">
            {currencyFormat(form.initialInvesment)}
          </Text>
          <Text className="text-base text-gray-100 font-pmedium mt-4">
            Inversión Total:
          </Text>
          <Text className="text-xl text-gray-100 font-psemibold">
            {currencyFormat(form.initialInvesment + form.monthlyContribution * (form.lengthInYears * 12))}
          </Text>
          <Text className="text-base text-gray-100 font-pmedium mt-4">
            Inversión Final:
          </Text>
          <Text className="text-xl text-gray-100 font-psemibold">
            {currencyFormat(total)}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Calculator;
