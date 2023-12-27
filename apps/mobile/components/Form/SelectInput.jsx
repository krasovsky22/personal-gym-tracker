import { useController } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

import ControlledInput from './ControlledInput';

const SelectInput = (props) => {
  const { name, label, rules, options, defaultValue, ...inputProps } = props;
  const { field, fieldState } = useController({
    name: name,
  });

  const hasError = !!fieldState.error;

  return (
    <View style={{ flex: 1 }}>
      <ControlledInput {...props}>
        <SelectList
          save="key"
          data={options}
          setSelected={field.onChange}
          defaultOption={defaultValue}
          dropdownStyles={styles.dropdown}
          {...inputProps}
        />

        {hasError && (
          <Text style={styles.error}>{fieldState?.error?.message}</Text>
        )}
      </ControlledInput>
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
  },
  dropdown: {
    position: 'absolute',
    top: 50,
    width: '100%',
  },
});
export default SelectInput;
