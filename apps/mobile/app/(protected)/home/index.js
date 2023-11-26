import { View, Text, StyleSheet } from 'react-native';

function HomeScreen() {
      return (
    <View style={styles.container}>
      <View style={styles.newsContainer}>
        <Text>Home Screen</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Text>Bottom</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  newsContainer: {
    flex: 1,
  },

  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 2,
    flexWrap: 'wrap',
  },
});

export default HomeScreen;
