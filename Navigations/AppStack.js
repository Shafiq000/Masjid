import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigation from './DrawerNavigation';
import NearbyMasjid from '../Screens/NearbyMasjid'
import MasjidDetails from '../Screens/MasjidDetails';
import Notification from '../Screens/Notification';
import Maps from '../Screens/Maps';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import Setting from '../Screens/Setting';
import PrayerSetting from '../Screens/PrayerSetting';
import AlarmNotification from '../Screens/AlarmNotification';
import Profile from '../Screens/Profile';
import Fullname from '../Screens/Fullname';
import Email from '../Screens/Email';
import UpdatePassowrd from '../Screens/UpdatePassowrd';
import PhoneVerification from '../Screens/PhoneVerification';
const Stack = createNativeStackNavigator();

function AppStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
            <Stack.Screen name="NearbyMasjid" component={NearbyMasjid} />
            <Stack.Screen name="MasjidDetails" component={MasjidDetails} />
            <Stack.Screen name="Notification" component={Notification} />
            <Stack.Screen name="Maps" component={Maps} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Setting" component={Setting} />
            <Stack.Screen name="PrayerSetting" component={PrayerSetting} />
            <Stack.Screen name="AlarmNotification" component={AlarmNotification} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Fullname" component={Fullname} />
            <Stack.Screen name="Email" component={Email} />
            <Stack.Screen name="UpdatePassowrd" component={UpdatePassowrd} />
            <Stack.Screen name="PhoneVerification" component={PhoneVerification} />

        </Stack.Navigator>
    );
}

export default AppStack;
