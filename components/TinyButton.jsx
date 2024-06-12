import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

const TinyButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`rounded-md min-h-[32px] px-4 flex flex-row justify-center items-center ${containerStyles} ${isLoading ? "opacity-50" : ""
        }`}
      disabled={isLoading}
    >
      {!isLoading &&
        <Text className={`text-primary font-psemibold text-md ${textStyles}`}>
          {title}
        </Text>}

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default TinyButton;
