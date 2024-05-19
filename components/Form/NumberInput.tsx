import { Input } from '@rneui/themed';
import { View, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { useController } from 'react-hook-form';

import ControlledInput from './ControlledInput';

const NumberInput = (props) => {
  const input = React.createRef();
  const { name, label, rules, defaultValue, ...inputProps } = props;

  const { field, fieldState } = useController({ name, rules, defaultValue });

  //   useEffect(() => {
  //     input.current?.setNativeProps({
  //       type: 'numeric',
  //       keyboardType: 'numeric',
  //       value: field.value.toString(),
  //     });
  //   }, []);

  return (
    <ControlledInput {...props}>
      <Input
        ref={input}
        value={field.value.toString()}
        onChangeText={(value) => field.onChange(+value)}
        onBlur={field.onBlur}
        errorMessage={fieldState?.error?.message}
        style={styles.input}
        {...inputProps}
      />
    </ControlledInput>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    textAlign: 'center',
  },
});

export default NumberInput;
