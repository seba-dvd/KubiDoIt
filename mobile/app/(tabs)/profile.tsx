import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { List, Text } from 'react-native-paper';

import { isSupabaseConfigured } from '@/lib/supabase';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text variant="bodyLarge">
        Autentificarea (R5) nu este încă activă. Până atunci aplicația rulează în modul demo, cu
        date locale.
      </Text>
      <List.Section>
        <List.Item
          title="Supabase"
          description={isSupabaseConfigured ? 'Configurat' : 'Neconfigurat (lipsește mobile/.env)'}
          left={(props) => <List.Icon {...props} icon="database" />}
        />
        <List.Item
          title="Versiune"
          description={Constants.expoConfig?.version ?? '—'}
          left={(props) => <List.Icon {...props} icon="information-outline" />}
        />
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
