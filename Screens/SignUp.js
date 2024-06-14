import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EmailSignUp from '../Components/Auth/SignUp/EmailSignUp';
import PhoneSignUp from '../Components/Auth/SignUp/PhoneSignUp';
import MosqueIcon from 'react-native-vector-icons/FontAwesome5';
import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PhoneIcon from 'react-native-vector-icons/FontAwesome';

const Tab = createMaterialTopTabNavigator();

const SignUp = () => {
    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <View style={{ flexDirection: "column", justifyContent: 'center', alignItems: 'center', marginVertical: 50 }}>
                <MosqueIcon name='mosque' size={40} />
                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 25, fontWeight: '800' }}>Let's Get Started</Text>
                    <Text>Sign up for your account</Text>
                </View>
            </View>
            <Tab.Navigator
                screenOptions={{
                    tabBarPressColor: 'transparent',
                    tabBarStyle: {
                        elevation: 0,
                    },
                    tabBarIndicatorStyle: {
                        backgroundColor: '#000',
                    },
                }}>
                <Tab.Screen name="Email" component={EmailSignUp}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <View style={[styles.tabTitleStyle]}>
                                <EmailIcon name='email-outline' size={25} right={10} style={{ color: focused ? '#000' : '#AAAAAA' }} />
                                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '600', color: focused ? '#000' : '#AAAAAA' }}>
                                    Email
                                </Text>
                            </View>
                        )
                    }}
                />
                <Tab.Screen name="Phone" component={PhoneSignUp}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <View style={[styles.tabTitleStyle]}>
                                <PhoneIcon name='phone' size={25} right={10} style={{ color: focused ? '#000' : '#AAAAAA' }} />
                                <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '600', color: focused ? '#000' : '#AAAAAA' }}>
                                    Phone
                                </Text>
                            </View>
                        )
                    }}
                />
            </Tab.Navigator>
        </View>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    tabTitleStyle: {
        flexDirection: 'row',
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
