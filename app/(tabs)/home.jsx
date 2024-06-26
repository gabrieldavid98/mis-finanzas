import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, RefreshControl, Text, View } from "react-native";

import useAppwrite from "../../lib/useAppwrite";
import { getUserMovements, getUserFinacials } from "../../lib/appwrite";
import { EmptyState, CustomButton } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";
import SavingCard from "../../components/SavingCard";
import MonthlyIncomeCard from "../../components/MonthlyIncomeCard";
import MovementCard from "../../components/MovementCard";

const buttons = financials => {
  if (Array.isArray(financials)) {
    return <></>
  }

  if (!financials) {
    return (
      <CustomButton
        title="Agregar Ingreso Mensual"
        handlePress={() => router.push('/financials/create')}
        containerStyles="mt-7 w-full"
      />
    )
  }

  return (
    <CustomButton
      title="Nuevo Movimiento"
      handlePress={() => router.push('/financials/create-movement')}
      containerStyles="mt-7"
    />
  )
}

const Home = () => {
  const { user } = useGlobalContext();
  const {
    data: financials,
    refetch: refetchFinancials,
  } = useAppwrite(() => getUserFinacials(user.$id));
  const {
    data: movements,
    refetch: refetchMovements,
  } = useAppwrite(() => getUserMovements(user.$id));
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetchMovements();
    await refetchFinancials();
    setRefreshing(false);
  };

  const onActionCompleted = async () => {
    await refetchMovements()
  }

  const totalSpending = movements.reduce(
    (acc, cur) => acc + cur.targetAmount, 0.0)

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={movements}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <MovementCard
            id={item.$id}
            title={item.description}
            amount={item.targetAmount}
            onActionCompleted={onActionCompleted}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Bienvenido de Nuevo
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.name ?? "Invitado"}
                </Text>
              </View>
            </View>
            {buttons(financials)}
            <MonthlyIncomeCard
              amount={financials?.monthlyIncome ?? 0}
              totalSpending={totalSpending}
            />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="Sin Movimientos"
            subtitle="Cree Movimientos Financieros"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
