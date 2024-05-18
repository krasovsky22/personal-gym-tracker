import * as z from 'zod';
import { View, Text, StyleSheet } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm, useFieldArray } from 'react-hook-form';
import { TextInput } from '@components/Form';
import { AsyncButton } from '@components';

const schema = z.object({
  name: z.string().min(1, { message: 'Exercise Name is Required' }),
});

function ExerciseForm() {
  const { ...methods } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formData) => {
    console.log(JSON.stringify(formData, null, 2));
    // await saveWorkout(formData, workout_id);

    // return router.back();
  };

  const onError = (errors, e) => {
    return console.log('ERRORS ', JSON.stringify(errors, null, 2));
  };

  return (
    <View style={styles.container}>
      <FormProvider {...methods}>
        <View style={styles.formBody}>
          <TextInput
            name="name"
            label="Name"
            placeholder="Workout Name"
            rules={{ required: 'Workout name is required!' }}
          />
        </View>

        <View style={styles.formFooter}>
          <AsyncButton
            color="success"
            title="Save"
            onPress={methods.handleSubmit(onSubmit, onError)}
          />
        </View>
      </FormProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formBody: {
    // flex: 1,
  },

  formFooter: {
    width: '80%',
    marginBottom: '20',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default ExerciseForm;
