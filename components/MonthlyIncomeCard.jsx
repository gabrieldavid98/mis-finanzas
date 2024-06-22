import { View, Text } from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { currencyFormat } from "../lib/utils";


const MonthlyIncomeCard = ({ amount, totalSpending }) => {
  const percent = (totalSpending === 0 ? 100 : (amount - totalSpending) * 100 / amount)

  return (
    <View className="bg-black-100 flex flex-col items-center p-4 mt-4 rounded-lg">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="flex justify-center items-center flex-1 ml-3 gap-y-1">
            <AnimatedCircularProgress
              size={130}
              width={20}
              fill={percent}
              tintColor="#B91C1C"
              backgroundColor="#3d5875">
              {
                (fill) => (
                  <Text className="text-white text-lg">
                    {parseInt(fill)}%
                  </Text>
                )
              }
            </AnimatedCircularProgress>
            <View className="flex justify-center items-center pt-4">
              <Text
                className="font-psemibold text-lg text-green-500"
                numberOfLines={1}
              >
                Ingreso Mensual
              </Text>
              <Text
                className="font-psemibold text-lg text-white mb-2"
                numberOfLines={1}
              >
                {currencyFormat(amount) + ' / ' + currencyFormat(amount - totalSpending)}
              </Text>
              <Text
                className="font-psemibold text-lg text-red-500"
                numberOfLines={1}
              >
                Gasto Total
              </Text>
              <Text
                className="font-psemibold text-lg text-white mb-4"
                numberOfLines={1}
              >
                {currencyFormat(totalSpending)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MonthlyIncomeCard;
