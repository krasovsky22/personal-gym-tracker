import React from 'react';
import { Input } from '@rneui/themed';
import { useController } from 'react-hook-form';

import ControlledInput, { ControlledInputType } from './ControlledInput';

export type HiddenInputType = Partial<Omit<ControlledInputType, 'children'>> & {
  name: string;
  rules?: object;
  defaultValue?: string;
};
function HiddenInput(props: HiddenInputType) {
  const { name, rules, defaultValue } = props;

  const { field, fieldState } = useController({ name, rules, defaultValue });

  return (
    <ControlledInput {...props}>
      <Input
        containerStyle={{ display: 'none' }}
        disabled
        errorMessage={fieldState?.error?.message}
        value={field.value}
      />
    </ControlledInput>
  );
}

export default HiddenInput;
