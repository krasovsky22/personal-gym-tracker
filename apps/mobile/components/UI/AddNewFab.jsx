import { StyleSheet } from 'react-native';
import { FAB } from '@rneui/themed';
import { useRouter } from 'expo-router';

const AddNewFab = ({ url }) => {
  const router = useRouter();
  return (
    <FAB
      visible
      style={styles.fab}
      onPress={() => router.push(url)}
      icon={{ name: 'add', color: 'white' }}
      color="green"
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    bottom: 20,
    right: 20,
    position: 'absolute',
  },
});

export default AddNewFab;
