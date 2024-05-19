import { ExercisesStoreType } from '@stores/ExercisesStore';
import useStore from './useStore';

const useExercisesStore = () =>
  useStore<ExercisesStoreType>('exercisesStore') as ExercisesStoreType;

export default useExercisesStore;
