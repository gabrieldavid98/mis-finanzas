import {
  Text,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import { CustomButton, FormField } from "../../components";
import DatePicker from "../../components/DatePicker";
import { createSaving } from "../../lib/appwrite";
import { router } from "expo-router";

const CreateSaving = () => {
  const { user } = useGlobalContext();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    startDate: new Date(),
    description: "",
    amount: 10000.0,
    dues: 1.0,
    dueAmount: 50.0,
  });

  const submit = async () => {
    if (
      form.description === "" ||
      form.amount === 0.0 ||
      form.dues === 0.0 ||
      form.dueAmount === 0.0
    ) {
      return Alert.alert("Por favor rellene todos los campos");
    }

    setSaving(true)
    try {
      await createSaving({ ...form, creator: user.$id })

      Alert.alert("Realizado", "Meta de Ahorro Guardada");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        startDate: new Date(),
        description: "",
        amount: 10000.0,
        dues: 1.0,
        dueAmount: 50.0,
      });

      setSaving(false);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 mb-6">
        <Text className="text-2xl text-white font-psemibold">
          Nueva Meta de Ahorro
        </Text>

        <DatePicker
          title="Fecha Inicial"
          value={form.startDate}
          otherStyles="mt-7"
          onChange={date => setForm({ ...form, startDate: date })}
        />

        <FormField
          title="Concepto"
          value={form.description}
          placeholder="Ahorro para una moto"
          handleChangeText={(e) => setForm({ ...form, description: e })}
          otherStyles="mt-7"
        />

        <FormField
          title="Valor"
          value={form.amount}
          placeholder="1000000"
          handleChangeText={(e) => setForm({ ...form, amount: parseFloat(e) })}
          otherStyles="mt-7"
          inputMode="decimal"
        />

        <FormField
          title="Cuotas"
          value={form.dues}
          placeholder="10"
          handleChangeText={(e) => setForm({ ...form, dues: parseFloat(e) })}
          otherStyles="mt-7"
          inputMode="decimal"
        />

        <FormField
          title="Valor Cuotas"
          value={form.dueAmount}
          placeholder="100000"
          handleChangeText={(e) => setForm({ ...form, dueAmount: parseFloat(e) })}
          otherStyles="mt-7"
          inputMode="decimal"
        />

        <CustomButton
          title="Crear"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={saving}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default CreateSaving;