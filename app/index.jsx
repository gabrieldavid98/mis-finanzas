import { Redirect } from "expo-router";
import { useGlobalContext } from "../context/GlobalProvider";

const Welcome = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return <Redirect href="/sign-in" />
};

export default Welcome;
