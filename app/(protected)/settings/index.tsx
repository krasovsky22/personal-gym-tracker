import { router } from 'expo-router';
import { ListItem, lightColors } from '@rneui/themed';
import { View, FlatList, StyleSheet, ListRenderItem } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type RouteType = {
  title: string;
  icon: string;
  link: string;
};
const SETTINGS_PAGES: RouteType[] = [
  {
    title: 'Exercises',
    icon: 'dumbbell',
    link: '/(protected)/settings/exercises',
  },
  {
    title: 'Workouts',
    icon: 'weight-lifter',
    link: '/(protected)/settings/workouts',
  },

  {
    title: 'Placeholder',
    icon: 'map-marker-question',
    link: '',
  },
  {
    title: 'Account',
    icon: 'account',
    link: '/(protected)/settings/account',
  },
];

const renderRow: ListRenderItem<RouteType> = ({ item }) => {
  return (
    <View style={styles.list}>
      <ListItem
        bottomDivider
        onPress={() => item.link && router.push(item.link)}
      >
        <ListItem.Content style={styles.content}>
          <Icon name={item.icon} size={30} />
          <ListItem.Title>{item.title}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </View>
  );
};

function SettingsScreen() {
  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={SETTINGS_PAGES}
          keyExtractor={(a) => a.link}
          renderItem={renderRow}
        />
      </View>
    </>
  );
}

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {},
  list: {
    flex: 1,
    width: '100%',
    display: 'flex',
    borderTopWidth: 1,
    borderColor: lightColors.greyOutline,
  },
  content: {
    gap: 1,
    fontSize: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    verticalAlign: 'middle',
    justifyContent: 'space-between',
  },
});
