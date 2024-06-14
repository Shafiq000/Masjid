import React from 'react';
import { StyleSheet,Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Masjid from '../Components/Masjid';
import PrayerTime from '../Components/PrayerTime';

const Tab = createMaterialTopTabNavigator();

const TopTabNavigation = () => {
  return (
      <Tab.Navigator
      
      sceneContainerStyle= {{
        backgroundColor: "transparent"
      }}
      screenOptions={{
        tabBarPressColor:'transparent',
        tabBarStyle: {
          elevation: 0,
          // borderTopWidth: 0,
        },
        tabBarPressColor:'transparent',
        tabBarGap: 40,
        swipeEnabled: false,
        animationEnabled: false,
        tabBarIndicatorStyle: {
            backgroundColor: 'transparent',
        },
        tabBarContentContainerStyle: {backgroundColor : 'transparent', },
        tabBarItemStyle: { width: 80, height: 40 },
    }}
      >
        <Tab.Screen 
        
          name="Masjid" 
          component={Masjid}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text style={{ color: focused ? '#fff' : '#0a9484', backgroundColor: focused ? '#0a9484' : '#EFEFEF', padding: 15,height:50, borderRadius: 10, textAlign: 'center', width: '140%',fontWeight:'600' }}>
                Masjid
              </Text>
            )
          }} 
        />
        <Tab.Screen 
        
          name="Prayer Time" 
          component={PrayerTime}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text style={{ color: focused ? '#fff' : '#0a9484', backgroundColor: focused ? '#0a9484' : '#EFEFEF', padding: 15,height:50, borderRadius: 10, textAlign: 'center', width: '100%',fontWeight:'600' }}>
                Prayer Time
              </Text>
            )
          }} 
        />
      </Tab.Navigator>
  );
};

export default TopTabNavigation;

const styles = StyleSheet.create({});
