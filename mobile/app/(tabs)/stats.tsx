import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export default function StatsScreen() {
  return (
    <View style={styles.container}>
      <Text variant="bodyLarge">
        Aici vor apărea numărul de activități pe status și procentul de finalizare.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
