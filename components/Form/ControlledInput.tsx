import React from 'react';
import { useFormContext } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

export type ControlledInputType = {
  name: string;
  label?: string;
  children: React.ReactNode;
  containerStyles?: object;
  labelStyles?: object;
};
function ControlledInput({
  name,
  label,
  children,
  containerStyles = {},
  labelStyles = {},
}: ControlledInputType) {
  const formContext = useFormContext();

  if (!formContext || !name) {
    const msg = !formContext
      ? 'TextInput must be wrapped by the FormProvider'
      : 'Name must be defined';
    console.error(msg);
    return null;
  }

  return (
    <View style={{ ...styles.formGroup, ...containerStyles }}>
      {label && (
        <Text style={{ ...styles.label, ...labelStyles }}>{label}</Text>
      )}
      <View style={styles.inputContainer}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 20,
  },

  formGroup: {
    display: 'flex',
    overflow: 'visible',

    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginLeft: 10,
    marginRight: 10,
  },

  inputContainer: {
    flex: 1,
  },
});

export default ControlledInput;
