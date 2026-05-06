import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomePage from './src/pages/HomePage';
import StatisticsPage from './src/pages/StatisticsPage';
import TrackingPage from './src/pages/TrackingPage';
import appStyles from './src/styles/appStyles';
import { colors } from './src/styles/colors';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={appStyles.safeArea}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarHideOnKeyboard: true, // Fix: tabs won't push up with keyboard
            tabBarStyle: {
              height: 64,
              backgroundColor: colors.cardBg,
              borderTopWidth: 1,
              borderTopColor: colors.border,
              paddingBottom: 8,
              paddingTop: 8,
              shadowColor: colors.shadow,
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 1,
              shadowRadius: 16,
              elevation: 12,
            },
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textMuted,
            tabBarLabelStyle: {
              fontSize: 11,
              fontWeight: '600',
              letterSpacing: 0.3,
              marginTop: 2,
            },
            tabBarIcon: ({ color, focused }) => {
              const icons: Record<string, [string, string]> = {
                Home: ['water', 'water-outline'],
                Statistics: ['chart-bar', 'chart-bar'],
                Tracking: ['calendar-month', 'calendar-month-outline'],
              };
              const [active, inactive] = icons[route.name];
              return (
                <MaterialCommunityIcons
                  name={(focused ? active : inactive) as any}
                  size={22}
                  color={color}
                />
              );
            },
          })}
        >
          <Tab.Screen name="Home" component={HomePage} />
          <Tab.Screen name="Statistics" component={StatisticsPage} />
          <Tab.Screen name="Tracking" component={TrackingPage} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}