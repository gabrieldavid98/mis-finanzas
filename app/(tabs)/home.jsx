import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, RefreshControl, Text, View } from "react-native";

import useAppwrite from "../../lib/useAppwrite";
import { getUserSavings } from "../../lib/appwrite";
import { EmptyState, CustomButton } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";
import SavingCard from "../../components/SavingCard";

const Home = () => {
  const { user } = useGlobalContext();
  const { data: savings, refetch } = useAppwrite(() => getUserSavings(user.$id));
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const onActionCompleted = async () => {
    await refetch()
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={savings}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <SavingCard
            id={item.$id}
            title={item.description}
            amount={item.amount}
            saved={item.saved}
            dueAmount={item.dueAmount}
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
            <CustomButton
              title="Nuevo Ahorro"
              handlePress={() => router.push('/savings')}
              containerStyles="mt-7"
            />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="Sin Metas de Ahorro"
            subtitle="Cree una Meta de Ahorro"
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
