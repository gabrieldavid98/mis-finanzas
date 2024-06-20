import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity, Text } from "react-native";

import { icons } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getUserSavings, signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { CustomButton, EmptyState, InfoBox } from "../../components";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: savings } = useAppwrite(() => getUserSavings(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={savings}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View className="rounded-lg bg-black-200 my-2 mx-7 p-4">
            <Text className="text-white">
              {item.description}
            </Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="Sin Metas de Ahorro"
            subtitle="Cree una Meta de Ahorro"
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <InfoBox
              title={user?.name}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex flex-row">
              <InfoBox
                title={savings.length || 0}
                subtitle="Metas de Ahorro"
                titleStyles="text-xl"
              />
            </View>
            <CustomButton
              title="Agregar Información Financiera"
              handlePress={() => router.push('/financials/create')}
              containerStyles="mt-7 w-full"
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
