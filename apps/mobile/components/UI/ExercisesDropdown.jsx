import useExercisesStore from '@hooks/useExercisesStore';

import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { SelectInput } from '@components/Form';

const ExercisesDropdown = (props) => {
  const { exercises } = useExercisesStore();

  const exercisesOptions = useMemo(() => {
    return exercises.map((exercise) => ({
      key: exercise.id,
      value: exercise.name,
    }));
  }, [exercises.length]);

  return (
    <SelectInput
      options={exercisesOptions}
      search={false}
      label="Exercise"
      rules={{ required: 'Exercise name is required!' }}
      {...props}
    />
  );
};

export default observer(ExercisesDropdown);
