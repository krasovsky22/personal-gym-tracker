import React, { useEffect } from 'react';
import { Input } from '@rneui/themed';
import { useController } from 'react-hook-form';

import ControlledInput from './ControlledInput';

const NumberInput = (props) => {
  const input = React.createRef();
  const { name, label, rules, defaultValue, ...inputProps } = props;

  const { field, fieldState } = useController({ name, rules, defaultValue });

  useEffect(() => {
    input.current.setNativeProps({
      type: 'numeric',
      keyboardType: 'numeric',
    });

    input.current.focus();
  }, []);

  return (
    <ControlledInput {...props}>
      <Input
        ref={input}
        onChangeText={(value) => field.onChange(+value)}
        onBlur={field.onBlur}
        errorMessage={fieldState?.error?.message}
        {...inputProps}
      />
    </ControlledInput>
  );
};

export default NumberInput;
