import { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { currencyFormat } from "../lib/utils";
import TinyButton from "./TinyButton";
import { deleteSaving, save } from "../lib/appwrite";


const SavingCard = ({
  id,
  title,
  amount,
  saved,
  dueAmount,
  onActionCompleted,
}) => {
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)

  const percent = 100 - (saved === 0 ? 100 : (amount - saved) * 100 / amount)

  const onDelete = async () => {
    setDeleteLoading(true)
    await deleteSaving(id)
    setDeleteLoading(false)

    await onActionCompleted()
  }

  const onSave = async () => {
    setSaveLoading(true)
    await save(id, amount, dueAmount, saved)
    setSaveLoading(false)

    await onActionCompleted()
  }

  return (
    <View className="bg-black-100 flex flex-col items-center p-4 mx-7 my-4 rounded-lg">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="flex justify-center items-center flex-1 ml-3 gap-y-1">
            <AnimatedCircularProgress
              size={130}
              width={20}
              fill={percent}
              tintColor="#91FF98"
              backgroundColor="#3d5875">
              {
                (fill) => (
                  <Text className="text-white text-lg">
                    {parseInt(fill)}%
                  </Text>
                )
              }
            </AnimatedCircularProgress>
            <Text
              className="font-psemibold text-lg text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="font-psemibold text-lg text-white mb-4"
              numberOfLines={1}
            >
              {currencyFormat(amount) + '/' + currencyFormat(saved)}
            </Text>
            <View className="flex flex-row w-full justify-around">
              <TinyButton
                title="Eliminar"
                containerStyles="bg-red-300"
                isLoading={deleteLoading}
                handlePress={() => onDelete()}
              />
              <TinyButton
                title="Ahorrar"
                containerStyles="bg-green-500"
                isLoading={saveLoading}
                handlePress={() => onSave()}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SavingCard;
