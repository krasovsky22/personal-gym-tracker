import { StyleSheet, View } from 'react-native';
import { SvgUri, UriProps } from 'react-native-svg';

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
  return (
    <View style={[rounded ? styles.rounded : {}, { borderRadius: size }]}>
      <SvgUri
        {...props}
        style={[style, { margin: 5, width: size - 5, height: size - 5 }]}
      />
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  rounded: {
    borderWidth: 1,
  },
});
