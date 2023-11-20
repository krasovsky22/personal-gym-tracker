import { lightColors } from '@rneui/themed';
import { View, Text, StyleSheet } from 'react-native';

function WorkoutsScreen() {
  return (
    <View style={styles.container}>
      <Text>Workouts Page</Text>
    </View>
  );
}

export default WorkoutsScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  list: {
    flex: 1,
    width: '100%',
    display: 'flex',
    borderTopWidth: 1,
    borderColor: lightColors.greyOutline,
  },
  content: {
    gap: 1,
    fontSize: '12',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    verticalAlign: 'middle',
    justifyContent: 'space-between',
  },
});
