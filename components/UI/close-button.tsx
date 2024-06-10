import { Button, useTheme } from '@rneui/themed';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type CloseButtonType = {
  minified?: boolean;
  onPress: () => unknown;
};
export default function CloseButton({
  minified = false,
  onPress,
}: CloseButtonType) {
  const { theme } = useTheme();

  return (
    <View>
      {minified && (
        <Button type="clear" onPress={onPress}>
          <Icon name="close" color={theme.colors.primary} size={28} />
        </Button>
      )}

      {!minified && <Button type="clear" onPress={onPress} title="Close" />}
    </View>
  );
}
