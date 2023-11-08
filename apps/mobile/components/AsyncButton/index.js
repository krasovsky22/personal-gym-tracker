import { useState, useCallback } from 'react';
import { Button } from '@rneui/themed';

const AsyncButton = ({ onPress, ...rest }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleOnPress = async () => {
    setIsLoading(true);
    const result = await onPress();
    setIsLoading(false);
    return result;
  };

  return <Button {...rest} onPress={handleOnPress} loading={isLoading} />;
};

export default AsyncButton;
