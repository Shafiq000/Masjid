import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Pressable,Alert } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Entypo';
import { useAuthContext } from '../../../Navigations/AuthContext'; // assuming this is where themeMode is provided
import auth from '@react-native-firebase/auth';

const PhonLogin = ({ navigation }) => {
    const [valueMail, setValueMail] = useState('');
    const [valuePswrd, setValuePswrd] = useState('');
    const [ismailInputFocused, setMailInputFocused] = useState(false);
    const [isPswrdInputFocused, setPswrdInputFocused] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');
    const [confirm, setConfirm] = useState(null);

    // verification code (OTP - One-Time-Passcode)
    const [code, setCode] = useState('');
    const { themeMode } = useAuthContext();

    const handlePasswordVisibility = () => {
        setRightIcon(rightIcon === 'eye' ? 'eye-with-line' : 'eye');
        setPasswordVisibility(!passwordVisibility);
    };

    const handleToSignup = () => {
        navigation.navigate('SignUp');
    };

    const signInWithPhoneNumber = async(phoneNumber) =>{
        // const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        // setConfirm(confirmation);
        Alert.alert('Use Mail for login')
      }
    
      const confirmCode = async ()=> {
        try {
          await confirm.confirm(code);
        } catch (error) {
          console.log('Invalid code.');
        }
      }

    return (
        <SafeAreaView style={[
            { flex: 1, backgroundColor: '#FFFFFF' },
            themeMode === "dark" && { backgroundColor: "#1C1C22" }
        ]}>
            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                <View style={{ justifyContent: 'center', paddingHorizontal: 10 }}>
                    <View style={{ paddingHorizontal: 17, paddingVertical: 10 }}>
                        <Text style={themeMode === "dark" && { color: '#fff' }}>Phone Number:</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={[
                            { height: 40, width: 65, backgroundColor: '#AAAAAA', borderRadius: 5, alignItems: 'center', justifyContent: 'center' },
                            themeMode === "dark" && { backgroundColor: '#333' }
                        ]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 }}>
                                <Image source={require('../../../src/Images/pakistan.png')} style={styles.logoimage} />
                                <Text style={themeMode === "dark" && { color: '#fff' }}>+92</Text>
                            </View>
                        </View>
                        <TextInput
                            keyboardType='phone-pad'
                            maxLength={13}
                            value={valueMail}
                            onChangeText={value => setValueMail(value)}
                            style={[
                                styles.input,
                                { borderColor: ismailInputFocused ? '#000' : '#AAAAAA' },
                                themeMode === "dark" && { borderColor: '#fff', color: '#fff' }
                            ]}
                            placeholder='+92 333 1122333'
                            placeholderTextColor={themeMode === "dark" ? '#fff' : '#AAAAAA'}
                            onFocus={() => setMailInputFocused(true)}
                            onSubmitEditing={() => setMailInputFocused(false)}
                            onEndEditing={() => setMailInputFocused(false)}
                        />
                    </View>
                </View>
                <View style={{ justifyContent: 'center', marginVertical: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 25 }}>
                        <Text style={themeMode === "dark" && { color: '#fff' }}>Password:</Text>
                        <Pressable>
                            <Text style={themeMode === "dark" && { color: '#fff' }}>Forgot Password ?</Text>
                        </Pressable>
                    </View>
                    <TextInput
                        secureTextEntry={passwordVisibility}
                        value={valuePswrd}
                        onChangeText={value => setValuePswrd(value)}
                        style={[
                            styles.inputPassword,
                            { borderColor: isPswrdInputFocused ? '#000' : '#AAAAAA' },
                            themeMode === "dark" && { borderColor: '#fff', color: '#fff' }
                        ]}
                        placeholder='type your password'
                        placeholderTextColor={themeMode === "dark" ? '#fff' : '#AAAAAA'}
                        onFocus={() => setPswrdInputFocused(true)}
                        onSubmitEditing={() => setPswrdInputFocused(false)}
                        onEndEditing={() => setPswrdInputFocused(false)}
                    />
                    <Pressable style={{ position: 'absolute', right: 35, bottom: 8 }} onPress={handlePasswordVisibility}>
                        <Icon name={rightIcon} size={23} color={themeMode === "dark" ? '#fff' : '#AAAAAA'} />
                    </Pressable>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 5 }}>
                    <Pressable onPress={signInWithPhoneNumber} style={[
                        styles.loginButton,
                        themeMode === "dark" && { backgroundColor: '#fff' }
                    ]}>
                        <Text style={[
                            styles.loginButtonText,
                            themeMode === "dark" && { color: '#000' }
                        ]}>
                            Log in
                        </Text>
                    </Pressable>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                    <Text style={themeMode === "dark" && { color: '#fff' }}>Don't have an account? </Text>
                    <Pressable onPress={handleToSignup}>
                        <Text style={[
                            styles.signUpText,
                            themeMode === "dark" && { color: '#fff' }
                        ]}>Sign Up</Text>
                    </Pressable>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', paddingHorizontal: 50, gap: 10 }}>
                    <View style={[
                        styles.divider,
                        themeMode === "dark" && { borderBottomColor: '#fff' }
                    ]}></View>
                    <Text style={themeMode === "dark" && { color: '#fff' }}> or </Text>
                    <View style={[
                        styles.divider,
                        themeMode === "dark" && { borderBottomColor: '#fff' }
                    ]}></View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 20, gap: 20 }}>
                    <Pressable>
                        <Image source={require('../../../src/Images/google.png')} style={styles.image} />
                    </Pressable>
                    <Pressable>
                        <Image source={require('../../../src/Images/facebook.png')} style={styles.image} />
                    </Pressable>
                </View>
            </View>
        </SafeAreaView >
    )
}

export default PhonLogin

const styles = StyleSheet.create({
    input: {
        height: 40,
        width: '67%',
        marginLeft: '5%',
        borderWidth: 2,
        borderRadius: 5,
        paddingLeft: 10
    },
    loginButton: {
        height: 40,
        width: '87%',
        backgroundColor: '#000',
        justifyContent: 'center',
        borderRadius: 5
    },
    loginButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '700'
    },
    signUpText: {
        fontSize: 15,
        fontWeight: '700'
    },
    divider: {
        borderBottomColor: '#AAAAAA',
        borderBottomWidth: 1,
        height: 5,
        width: 80
    },
    image: {
        height: 45,
        width: 45
    },
    logoimage: {
        height: 30,
        width: 30
    },
    inputPassword:{
        height: 40,
        width: '90%',
        marginLeft: '5%',
        borderWidth: 2,
        borderRadius: 5,
        paddingLeft: 10
    }
});
