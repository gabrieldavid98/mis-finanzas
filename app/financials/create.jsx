import {
  Text,
  Alert,
  ScrollView,
  View,
} from "react-native";
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import { CustomButton, FormField } from "../../components";
import { createFinancial, getUserFinacials, updateFinacials } from "../../lib/appwrite";
import { router } from "expo-router";
import useAppwrite from "../../lib/useAppwrite";

const CreateMovement = () => {
  const { user } = useGlobalContext();
  const { data: financials, loading } = useAppwrite(() => getUserFinacials(user.$id));
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ monthlyIncome: 0.0 });

  useEffect(() => {
    if (loading || !financials) {
      return
    }

    setForm({
      monthlyIncome: parseFloat(financials.monthlyIncome),
    })
  }, [loading])

  const submit = async () => {
    if (form.monthlyIncome === 0.0) {
      return Alert.alert("Por favor agrege un ingreso mensual");
    }

    setSaving(true)
    try {
      if (financials) {
        await updateFinacials(financials.$id, form)
      } else {
        await createFinancial({ ...form, owner: user.$id })
      }

      Alert.alert("Realizado", "Información Financiera Guardada");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <SafeAreaView className="bg-primary h-full">
        <View className="w-full flex flex-row justify-center">
          <Text className="text-lg text-white font-psemibold">
            Cargando
          </Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 mb-6">
        <Text className="text-2xl text-white font-psemibold">
          Datos financieros
        </Text>

        <FormField
          title="Ingreso Mensual"
          value={form.monthlyIncome}
          placeholder="0"
          handleChangeText={e => {
            let num = parseFloat(e)
            if (Number.isNaN(num)) num = 0;
            setForm({ ...form, monthlyIncome: num })
          }}
          otherStyles="mt-7"
          inputMode="decimal"
        />

        <CustomButton
          title={financials ? "Actualizar" : "Agregar"}
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={saving}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default CreateMovement;