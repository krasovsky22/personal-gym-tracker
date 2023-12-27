import { useController } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

import ControlledInput from './ControlledInput';

const TEMP_OPTIONS = [
  { key: 1, value: 'Mobiles' },
  { key: 2, value: 'Appliances' },
  { key: 3, value: 'Cameras' },
  { key: 4, value: 'Computers' },
  { key: 5, value: 'Vegetables' },
  { key: 6, value: 'Diary Products' },
  { key: 7, value: 'Drinks' },
];

const SelectInput = (props) => {
  const { name, label, rules, defaultValue, ...inputProps } = props;
  const { field, fieldState } = useController({
    name: name,
  });

  const hasError = !!fieldState.error;

  return (
    <View style={{ flex: 1 }}>
      <ControlledInput {...props}>
        <SelectList
          save="key"
          data={TEMP_OPTIONS}
          setSelected={field.onChange}
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
