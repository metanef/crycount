import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './src/pages/HomePage';
import StatisticsPage from './src/pages/StatisticsPage';
import TrackingPage from './src/pages/TrackingPage';
import styles from './src/styles/styles';
import appStyles from './src/styles/appStyles';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={appStyles.safeArea}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarStyle: {
                height: 70,
                backgroundColor: "#6a5acd",
                borderRadius: 40,
                bottom: -20,
              },
              tabBarActiveBackgroundColor: 'white',
              tabBarActiveTintColor: "#6a5acd",
              tabBarInactiveTintColor: "#dcdcdc",
              tabBarLabelPosition: "beside-icon",
              tabBarIcon: () => null,
              tabBarLabelStyle: {
                fontSize: 16,
                textAlign: "center",
                left: -12,
                marginBottom: 5,
              },
              tabBarItemStyle: {
                borderRadius: 40,
              },
            }}
          >
            <Tab.Screen name="Home" component={HomePage} />
            <Tab.Screen name="Statistics" component={StatisticsPage} />
            <Tab.Screen name="Tracking" component={TrackingPage} />
          </Tab.Navigator>
        </NavigationContainer>
    </SafeAreaView>
  );
}
