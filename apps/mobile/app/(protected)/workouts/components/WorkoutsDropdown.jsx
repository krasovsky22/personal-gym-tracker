import useExercisesStore from '@hooks/useExercisesStore';

import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { SelectInput } from '@components/Form';

const WorkoutsDropdown = (props) => {
  const { workouts } = useExercisesStore();

  const workoutsOptions = useMemo(() => {
    return workouts.map((workout) => ({
      key: workout.id,
      value: workout.name,
    }));
  }, [workouts.length]);

  return <SelectInput options={workoutsOptions} label="Workout" {...props} />;
};

export default observer(WorkoutsDropdown);
