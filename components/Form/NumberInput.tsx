import { Input, InputProps } from '@rneui/themed';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import React, { useEffect } from 'react';
import { useController } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import ControlledInput, { ControlledInputType } from './ControlledInput';

export type NumberInputType = Partial<Omit<ControlledInputType, 'children'>> &
  InputProps & {
    name: string;
    rules?: object;
  };
const NumberInput = (props: NumberInputType) => {
  const input = React.createRef<TextInput>();
  const { name, label, rules, defaultValue, ...inputProps } = props;

  const { field, fieldState } = useController({ name, rules, defaultValue });

  return (
    <>
      <ControlledInput {...props}>
        <Input
          ref={input}
          value={field.value}
          onChangeText={(value) => field.onChange(value)}
          onBlur={field.onBlur}
          style={styles.input}
          {...inputProps}
        />
      </ControlledInput>
      <ErrorMessage
        name={name}
        message={fieldState?.error?.message}
        render={({ message }) => (
          <Text style={styles.errorMessageStyle}>{message}</Text>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    textAlign: 'center',
  },
  errorMessageStyle: {
    flex: 1,
    color: 'red',
    textAlign: 'left',
  },
});

export default NumberInput;
