import { Platform, SafeAreaView, View, Text, StyleSheet } from 'react-native';

function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.newsContainer}>
        <Text>Home Screen</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Text>Bottom</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'ios' ? 0 : 30,
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
