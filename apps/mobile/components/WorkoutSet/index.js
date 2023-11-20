import { useMemo, useEffect, useState } from 'react';
import MultiSelect from 'react-native-multiple-select';
import { Divider, Input } from '@rneui/themed';
import { View, Text, StyleSheet } from 'react-native';

const WorkoutSet = ({ index }) => {
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
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Repeats</Text>
        <Input
          type="numeric"
          textAlign={'center'}
          keyboardType="numeric"
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
