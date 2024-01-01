import React from 'react';
import { Input } from '@rneui/themed';
import { useController } from 'react-hook-form';

import ControlledInput from './ControlledInput';

const TextInput = (props) => {
  const { name, label, rules, defaultValue, ...inputProps } = props;

  const { field, fieldState } = useController({ name, rules, defaultValue });

  return (
    <ControlledInput {...props}>
      <Input
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        errorMessage={fieldState?.error?.message}
        {...inputProps}
      />
    </ControlledInput>
  );
};

export default TextInput;
