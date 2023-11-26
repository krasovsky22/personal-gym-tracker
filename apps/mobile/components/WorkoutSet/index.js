import { Input } from '@rneui/themed';
import { useController } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

const WorkoutSet = ({ id, index }) => {
  const { field: weightField } = useController({
    name: `sets.${id}.weight`,
    rules: [],
  });

  const { field: repeatField } = useController({
    name: `sets.${id}.repeat`,
    rules: [],
  });

  return (
    <View style={styles.setContainer}>
      <Text>{index}.</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Weight</Text>
        <Input
          type="numeric"
          keyboardType="numeric"
          maxLength={5}
          textAlign={'center'}
          containerStyle={{
            width: 75,
          }}
          value={weightField.value}
          onChangeText={weightField.onChange}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Repeats</Text>
        <Input
          type="numeric"
          textAlign={'center'}
          keyboardType="numeric"
          value={repeatField.value}
          onChangeText={repeatField.onChange}
          maxLength={3}
          containerStyle={{ width: 75 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  setContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    padding: 5,
  },
  inputGroup: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: 10,
  },

  label: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default WorkoutSet;
