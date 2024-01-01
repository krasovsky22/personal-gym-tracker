import { useState, useCallback } from 'react';
import { Button } from '@rneui/themed';

const AsyncButton = ({ onPress, ...rest }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleOnPress = async () => {
    setIsLoading(true);
    try {
      const result = await onPress();
      setIsLoading(false);

      return result;
    } catch (error) {
      console.warn('Promise rejection in async button - ', error);
    }

    setIsLoading(false);
    return null;
  };

  return <Button {...rest} onPress={handleOnPress} loading={isLoading} />;
};

export default AsyncButton;
