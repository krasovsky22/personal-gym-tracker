import { useState } from "react";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button, Input } from "react-native-elements";
import useAuthStore from "@hooks/useAuthStore";

export default function Account() {
  const [loading, setLoading] = useState(true);

  const { user, signOut } = useAuthStore();

  //   async function getProfile() {
  //     try {
  //       setLoading(true);
  //       if (!session?.user) throw new Error('No user on the session!');

  //       const { data, error, status } = await supabase
  //         .from('profiles')
  //         .select(`username, website, avatar_url`)
  //         .eq('id', session?.user.id)
  //         .single();
  //       if (error && status !== 406) {
  //         throw error;
  //       }

  //       if (data) {
  //         setUsername(data.username);
  //         setWebsite(data.website);
  //         setAvatarUrl(data.avatar_url);
  //       }
  //     } catch (error) {
  //       if (error instanceof Error) {
  //         Alert.alert(error.message);
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   async function updateProfile({ username, website, avatar_url }) {
  //     try {
  //       setLoading(true);
  //       if (!session?.user) throw new Error('No user on the session!');

  //       const updates = {
  //         id: session?.user.id,
  //         username,
  //         website,
  //         avatar_url,
  //         updated_at: new Date(),
  //       };

  //       const { error } = await supabase.from('profiles').upsert(updates);

  //       if (error) {
  //         throw error;
  //       }
  //     } catch (error) {
  //       if (error instanceof Error) {
  //         Alert.alert(error.message);
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input label="Email" value={user.email} disabled />
      </View>
      <Link href={{ pathname: "home/messages" }}>Go to Home</Link>
      {/* <View style={styles.verticallySpaced}>
        <Input
          label="Username"
          value={user.email}
          onChangeText={(text) => {}}
        />
      </View> */}
      {/* <View style={styles.verticallySpaced}>
        <Input
          label="Website"
          value={website || ''}
          onChangeText={(text) => setWebsite(text)}
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? 'Loading ...' : 'Update'}
          onPress={() =>
            updateProfile({ username, website, avatar_url: avatarUrl })
          }
          disabled={loading}
        />
      </View> */}
      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={signOut} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
