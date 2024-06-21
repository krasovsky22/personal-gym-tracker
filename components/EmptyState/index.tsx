import { View, Text, StyleSheet } from 'react-native';

type EmptyStateType = {
  title?: string;
  description?: string;
};

const EmptyState = ({
  title = 'No elements found',
  description,
}: EmptyStateType) => {
  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{title}</Text>
        {description && (
          <Text style={{ textAlign: 'center' }}>{description}</Text>
        )}
      </View>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  bodyContainer: {
    width: '100%',
    justifyContent: 'center',
    marginVertical: 'auto',
  },
});
