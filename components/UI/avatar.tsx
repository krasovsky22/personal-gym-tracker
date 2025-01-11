import { Platform } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { SvgUri, UriProps } from 'react-native-svg';
import { Avatar as RNEAvatar } from 'react-native-elements';

type AvatarProps = UriProps & {
  rounded?: boolean;
  size?: number;
};
const Avatar = ({
  style,
  size = 24,
  rounded = false,
  ...props
}: AvatarProps) => {
  // react native svg does not work in web
  const isWeb = Platform.OS === 'web';

  return (
    <View style={[rounded ? styles.rounded : {}, { borderRadius: size }]}>
      {isWeb ? (
        <RNEAvatar size={32} rounded source={{ uri: props.uri ?? '' }} />
      ) : (
        <SvgUri
          {...props}
          style={[style, { margin: 5, width: size - 5, height: size - 5 }]}
        />
      )}
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  rounded: {
    borderWidth: 1,
  },
});
