// EmailLogin.js
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Pressable, Alert } from 'react-native';
import React, { useState,useEffect } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { useAuthContext } from '../../../Navigations/AuthContext';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { ScrollView } from 'react-native';
const EmailLogin = ({ navigation }) => {
    const [valueMail, setValueMail] = useState('');
    const [valuePswrd, setValuePswrd] = useState('');
    const [ismailInputFocused, setMailInputFocused] = useState(false);
    const [isPswrdInputFocused, setPswrdInputFocused] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');
    const { signInWithEmail, user, signInWithGoogle, isAuthenticated } = useAuthContext();

    useEffect(() => {
      GoogleSignin.configure({ webClientId: '497944709344-hq1cvv4nrph3sstc86eg0276tgb09042.apps.googleusercontent.com' });
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            navigation.navigate('DrawerNavigation', { name: user.displayName, email: user.email });
        }
    }, [isAuthenticated, navigation, user]);

    const handlePasswordVisibility = () => {
        setRightIcon(rightIcon === 'eye' ? 'eye-with-line' : 'eye');
        setPasswordVisibility(!passwordVisibility);
    };

    const handleToSignup = () => {
        navigation.navigate('SignUp');
    };

    const handleLogin = async () => {
        try {
          const userData = await signInWithEmail(valueMail, valuePswrd);
          navigation.navigate('DrawerNavigation', { email: userData.email, name: userData.displayName });
        } catch (error) {
          Alert.alert('Login failed', 'Please check your credentials and try again.');
          console.error("Error logging in: ", error);
        }
      };
      
    const googlesignin = async () => {
        try {
          await signInWithGoogle();
          const userInfo = await GoogleSignin.signIn();
          // Extract user name and email
          const { user } = userInfo;
          const { name, email } = user;
          navigation.navigate('DrawerNavigation', { name, email });
        } catch (error) {
          console.error("Error signing in with Google:", error);
        }
      };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
           <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                <View style={{ justifyContent: 'center', paddingHorizontal: 10 }}>
                    <View style={{ paddingHorizontal: 17, paddingVertical: 10 }}>
                        <Text>Email:</Text>
                    </View>
                    <TextInput
                        value={valueMail}
                        onChangeText={value => setValueMail(value)}
                        style={{ height: 40, width: '90%', marginLeft: '5%', borderColor: ismailInputFocused ? '#000' : '#AAAAAA', borderWidth: 2, borderRadius: 5, paddingLeft: 10 }}
                        placeholder='name@email.com'
                        onFocus={() => setMailInputFocused(true)}
                        onSubmitEditing={() => setMailInputFocused(false)}
                        onEndEditing={() => setMailInputFocused(false)}
                    />
                </View>
                <View style={{ justifyContent: 'center', marginVertical: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 25 }}>
                        <Text>Password:</Text>
                        <Pressable>
                            <Text>Forgot Password ?</Text>
                        </Pressable>
                    </View>
                    <TextInput
                        secureTextEntry={passwordVisibility}
                        value={valuePswrd}
                        onChangeText={value => setValuePswrd(value)}
                        style={{ height: 40, width: '86%', marginLeft: '7%', borderColor: isPswrdInputFocused ? '#000' : '#AAAAAA', borderWidth: 2, borderRadius: 5, paddingLeft: 10 }}
                        placeholder='type your password'
                        onFocus={() => setPswrdInputFocused(true)}
                        onSubmitEditing={() => setPswrdInputFocused(false)}
                        onEndEditing={() => setPswrdInputFocused(false)}
                    />
                    <Pressable style={{ position: 'absolute', right: 35, bottom: 8 }} onPress={handlePasswordVisibility}>
                        <Icon name={rightIcon} size={23} color={'#AAAAAA'} />
                    </Pressable>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 5 }}>
                    <Pressable onPress={handleLogin} style={{ height: 40, width: '87%', backgroundColor: '#000', justifyContent: 'center', borderRadius: 5 }}>
                        <Text style={{ color: '#fff', textAlign: 'center', fontSize: 15, fontWeight: '700' }}>Log in</Text>
                    </Pressable>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                    <Text>Don't have an account? </Text>
                    <Pressable onPress={handleToSignup}>
                        <Text style={{ fontSize: 15, fontWeight: '700' }}>Sign Up </Text>
                    </Pressable>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', paddingHorizontal: 50, gap: 10 }}>
                    <View style={{ borderBottomColor: '#AAAAAA', borderBottomWidth: 1, height: 5, width: 80 }}></View>
                    <Text> or </Text>
                    <View style={{ borderBottomColor: '#AAAAAA', borderBottomWidth: 1, height: 5, width: 80 }}></View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 20, gap: 20 }}>
                    <Pressable onPress={googlesignin}>
                        <Image source={require('../../../src/Images/google.png')} style={styles.image} />
                    </Pressable>
                    <Pressable>
                        <Image source={require('../../../src/Images/facebook.png')} style={styles.image} />
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default EmailLogin;

const styles = StyleSheet.create({
    image: {
        height: 45,
        width: 45
    }
});
