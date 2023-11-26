import { View, Text, StyleSheet, FlatList } from 'react-native';

const WorkoutsScreen = () => {
  return (
    <View>
      <Text>TestView</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  list: {
    flex: 1,
    width: '100%',
    display: 'flex',
    borderTopWidth: 1,
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

export default WorkoutsScreen;
