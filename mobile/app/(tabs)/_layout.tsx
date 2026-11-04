import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';

type IconProps = ComponentProps<typeof MaterialCommunityIcons>;

function tabIcon(name: IconProps['name']) {
  return ({ color, size }: { color: unknown; size: number }) => (
    <MaterialCommunityIcons name={name} color={color as string} size={size} />
  );
}

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ title: 'Activități', tabBarIcon: tabIcon('format-list-checks') }}
      />
      <Tabs.Screen
        name="stats"
        options={{ title: 'Statistici', tabBarIcon: tabIcon('chart-bar') }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Profil', tabBarIcon: tabIcon('account-circle') }}
      />
    </Tabs>
  );
}
