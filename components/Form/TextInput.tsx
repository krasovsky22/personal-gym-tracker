import React from 'react';
import { Input, InputProps } from '@rneui/themed';
import { useController } from 'react-hook-form';

import ControlledInput, { ControlledInputType } from './ControlledInput';

type TextInputType = Partial<Omit<ControlledInputType, 'children'>> &
  InputProps & {
    name: string;
    rules?: object;
    defaultValue?: string;
  };

function TextInput(props: TextInputType) {
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
}

export default TextInput;
