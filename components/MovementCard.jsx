import { useState } from "react";
import { View, Text } from "react-native";
import { currencyFormat } from "../lib/utils";
import TinyButton from "./TinyButton";
import { deleteMovement } from "../lib/appwrite";


const MovementCard = ({
  id,
  title,
  amount,
  onActionCompleted,
}) => {
  const [deleteLoading, setDeleteLoading] = useState(false)

  const onDelete = async () => {
    setDeleteLoading(true)
    await deleteMovement(id)
    setDeleteLoading(false)

    await onActionCompleted()
  }

  return (
    <View className="bg-black-100 flex flex-col p-4 mx-4 mb-4 rounded-lg">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="flex flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-xl text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="font-psemibold text-md text-gray-100"
              numberOfLines={1}
            >
              {currencyFormat(amount)}
            </Text>
            <View className="flex flex-row w-full justify-end">
              <TinyButton
                title="Eliminar"
                containerStyles="bg-red-500"
                isLoading={deleteLoading}
                handlePress={() => onDelete()}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MovementCard;
