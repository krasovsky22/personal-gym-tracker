import * as z from 'zod';
import { useRouter } from 'expo-router';
import { View, StyleSheet, Text } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormProvider,
  useForm,
  SubmitHandler,
  SubmitErrorHandler,
} from 'react-hook-form';

import { AsyncButton } from '@components';
import { useExercisesStore } from '@hooks';
import { TextInput } from '@components/Form';
import { ExerciseType } from '@models/Exercise';

const schema = z.object({
  name: z.string().min(1, { message: 'Exercise Name is Required' }),
});

type ExerciseFormValuesType = {
  name: string;
};

type ExerciseFormProps = {
  exercise?: ExerciseType;
};

function ExerciseForm({ exercise }: ExerciseFormProps) {
  const router = useRouter();
  const { ...methods } = useForm({
    defaultValues: {
      name: exercise?.name ?? '',
    },
    resolver: zodResolver(schema),
  });

  const { saveExercise } = useExercisesStore();

  const onSubmit: SubmitHandler<ExerciseFormValuesType> = async (formData) => {
    const { name } = formData;

    const originalName = exercise?.name ?? '';

    try {
      exercise?.setName(name);

      await saveExercise(exercise ?? { name });
      return router.back();
    } catch (e) {
      exercise?.setName(originalName);
      console.error('ERROR', e);
    }
  };

  const onError: SubmitErrorHandler<ExerciseFormValuesType> = (errors, _e) => {
    return console.log('ERRORS ', JSON.stringify(errors, null, 2));
  };

  return (
    <View style={styles.container}>
      <FormProvider {...methods}>
        <View style={styles.formBody}>
          <TextInput
            name="name"
            label="Name"
            placeholder="Exercise Name"
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
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default ExerciseForm;
