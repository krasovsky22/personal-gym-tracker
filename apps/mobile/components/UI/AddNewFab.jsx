import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import { useRouter } from 'expo-router';

const AddNewFab = ({ url }) => {
  const router = useRouter();
  return (
    <View style={styles.fab}>
      <Icon name="add" color="white" onPress={() => router.push(url)} />
    </View>
  );
};

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
