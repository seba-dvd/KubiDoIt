import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Pagină inexistentă' }} />
      <View style={styles.container}>
        <Text variant="titleMedium">Ecranul acesta nu există.</Text>
        <Link href="/" style={styles.link}>
          <Text variant="labelLarge">Înapoi la activități</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  link: { marginTop: 16, paddingVertical: 12 },
});
