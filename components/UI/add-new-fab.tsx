import { View } from 'react-native';
import { Icon } from '@rneui/themed';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

type AddNewFabType = {
  url: string;
};
function AddNewFab({ url }: AddNewFabType) {
  const router = useRouter();
  return (
    <View style={styles.fab}>
      <Icon name="add" color="white" onPress={() => router.push(url)} />
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'red',
    borderRadius: 50,
  },
});

export default AddNewFab;
