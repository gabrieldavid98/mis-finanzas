
import {
  Text,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import { CustomButton, FormField } from "../../components";
import { createMovement, createSaving } from "../../lib/appwrite";
import { router } from "expo-router";

const CreateSaving = () => {
  const { user } = useGlobalContext();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    description: "",
    targetAmount: 0.0,
  });

  const submit = async () => {
    if (
      form.description === "" ||
      form.targetAmount === 0.0
    ) {
      return Alert.alert("Por favor rellene todos los campos");
    }

    setSaving(true)
    try {
      await createMovement({ ...form, owner: user.$id })

      Alert.alert("Realizado", "Movimiento Guardado");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        description: "",
        targetAmount: 0.0,
      });

      setSaving(false);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 mb-6">
        <Text className="text-2xl text-white font-psemibold">
          Nuevo Movimiento
        </Text>

        <FormField
          title="Concepto"
          value={form.description}
          placeholder="Arriendo"
          handleChangeText={(e) => setForm({ ...form, description: e })}
          otherStyles="mt-7"
        />

        <FormField
          title="Valor"
          value={form.targetAmount}
          placeholder="1000000"
          handleChangeText={e => {
            let num = parseFloat(e)
            if (Number.isNaN(num)) num = 0;
            setForm({ ...form, targetAmount: num })
          }}
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