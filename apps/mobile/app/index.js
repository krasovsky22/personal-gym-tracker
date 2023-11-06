import { Redirect } from "expo-router";

import useAuthStore from "@hooks/useAuthStore";
import { observer } from "mobx-react-lite";

function Home() {
  const { isLoggedIn } = useAuthStore();

  if (!isLoggedIn) {
    <Redirect href="/auth/sign-in" />;
  }

  return <Redirect href="/home" />;
}

export default observer(Home);
