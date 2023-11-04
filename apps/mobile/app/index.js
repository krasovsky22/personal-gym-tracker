import { Link } from 'expo-router';
import { SafeAreaView, View } from 'react-native';

export default function Root() {
  return (
    <SafeAreaView>
      <Link replace href="/home/messages">
        Navigate to nested route
      </Link>
    </SafeAreaView>
  );
}
