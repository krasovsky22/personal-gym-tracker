import { Redirect, Stack, Tabs, Navigator, Slot } from "expo-router";
import useAuthStore from "@hooks/useAuthStore";
import { observer } from "mobx-react-lite";
import { SafeAreaView, View, Text } from "react-native";
import { TabRouter } from "@react-navigation/native";

function Layout() {
  const { isLoggedIn } = useAuthStore();

  console.log("layout is logged in -", isLoggedIn);

  if (!isLoggedIn) {
    return <Redirect href="/auth/sign-in" />;
  }

  return (
    <View className="flex-1 bg-red text-red">
      {/* <Navigator router={TabRouter}> */}
      <View>
        <Text className="text-blue bg-red">Header</Text>
      </View>
      <Tabs />
    </View>
  );
}

export default observer(Layout);
