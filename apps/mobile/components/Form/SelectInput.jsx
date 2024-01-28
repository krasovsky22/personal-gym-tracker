import { useController } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

import ControlledInput from './ControlledInput';

const SelectInput = (props) => {
  const { name, label, rules, options, ...inputProps } = props;
  const { field, fieldState } = useController({
    name: name,
  });

  const defaultValue = options.find((option) => option.key === field.value);

  const hasError = !!fieldState.error;

  return (
    <View style={{ flex: 1 }}>
      <ControlledInput {...props}>
        <View
          onStartShouldSetResponder={(event) => true}
          onTouchEnd={(e) => {
            e.stopPropagation();
          }}
        >
          <SelectList
            save="key"
            data={options}
            boxStyles={styles.box}
            setSelected={field.onChange}
            defaultOption={defaultValue}
            dropdownStyles={styles.dropdown}
            {...inputProps}
          />
        </View>

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
  box: {},
  dropdown: {
    maxHeight: 150,
    // top: 50,
    // zIndex: 999,
    // width: '100%',
    // position: 'absolute',
    // backgroundColor: 'white',
    // position: 'absolute',
    // top: 40,
    width: '100%',
    zIndex: 999,
  },
});
export default SelectInput;
