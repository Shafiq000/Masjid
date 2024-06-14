import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
// import { TextInput, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import {auth,RecaptchaVerifier } from '@react-native-firebase/auth';
import { ScrollView } from 'react-native';

const PhoneSignUp = ({ navigation }) => {
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [valuePswrd, setValuePswrd] = useState('')
    const [isPhoneInputFocused, setPhoneInputFocused] = useState(false)
    const [isNameInputFocused, setNameInputFocused] = useState(false)
    const [isPswrdInputFocused, setPswrdInputFocused] = useState(false)
    const [isPswrdConfrmInputFocused, setPswrdConfrmInputFocused] = useState(false)
    const [password, setPassword] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [confrmpasswordVisibility, setConfrmPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');
    const [confrmrightIcon, setConfrmRightIcon] = useState('eye');

    const handlePasswordVisibility = () => {
        if (rightIcon === 'eye') {
            setRightIcon('eye-with-line');
            setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === 'eye-with-line') {
            setRightIcon('eye');
            setPasswordVisibility(!passwordVisibility);
        }
    };
    const handleConfrmPasswordVisibility = () => {
        if (confrmrightIcon === 'eye') {
          setConfrmRightIcon('eye-with-line');
            setConfrmPasswordVisibility(!confrmpasswordVisibility);
        } else if (confrmrightIcon === 'eye-with-line') {
          setConfrmRightIcon('eye');
            setConfrmPasswordVisibility(!confrmpasswordVisibility);
        }
    };

    const handleToLogin = () => {
        navigation.navigate('Login')
    }

    const createUser = () => {
        try {
            // Create a RecaptchaVerifier instance
            // const recaptchaVerifier = new auth.RecaptchaVerifier('recaptcha-container');
            // Request verification code
            auth().signInWithPhoneNumber(phone,);
            // Navigate to verification screen with confirmation object
            navigation.navigate('Home', { confirmation, name });
        } catch (error) {
            console.error(error);
        }
    };
    
    

    return (
        <SafeAreaView style={{ flex: 1,backgroundColor:'#FFFFFF' }}>
           <ScrollView  contentContainerStyle={{ flexGrow: 1 }}>
           <View id="recaptcha-container" style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }}>
            <View style={{ justifyContent: 'center', paddingHorizontal: 10 }}>
                    <View style={{ paddingHorizontal: 17, paddingVertical: 10 }}>
                        <Text style={{}}>Phone Number:</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ height: 40, width: 65, backgroundColor: '#AAAAAA', borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 }}>
                                <Image source={require('../../../src/Images/pakistan.png')} style={styles.logoimage} />
                                <Text>+92</Text>
                            </View>
                        </View>
                        <TextInput
                            keyboardType='phone-pad'
                            maxLength={13}
                            value={phone}
                            onChangeText={value => setPhone(value)}
                            style={{ height: 40, width: '65%', marginLeft: '5%', borderColor: isPhoneInputFocused == true ? '#000' : '#AAAAAA', borderWidth: 2, borderRadius: 5, paddingLeft: 10 }}
                            placeholder='333 1122333'
                            onFocus={() => setPhoneInputFocused(true)}
                            onSubmitEditing={() => setPhoneInputFocused(false)}
                            onEndEditing={() => setPhoneInputFocused(false)}
                        />
                    </View>
                </View>
                <View style={{ justifyContent: 'center', paddingHorizontal: 10 }}>
                    <View style={{ paddingHorizontal: 17, paddingVertical: 10 }}>
                        <Text style={{}}>Name:</Text>
                    </View>
                    <TextInput
                        value={name}
                        onChangeText={value => setName(value)}
                        style={{ height: 40, width: '90%', marginLeft: '5%', borderColor: isNameInputFocused == true ? '#000' : '#AAAAAA', borderWidth: 2, borderRadius: 5, paddingLeft: 10 }}
                        placeholder='Enter full name'
                        onFocus={() => setNameInputFocused(true)}
                        onSubmitEditing={() => setNameInputFocused(false)}
                        onEndEditing={() => setNameInputFocused(false)}
                    />
                </View>
                <View style={{ justifyContent: 'center',}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 25 }}>
                        <Text style={{}}>Password:</Text>
                    </View>
                    <TextInput
                        secureTextEntry={passwordVisibility}
                        value={password}
                        onChangeText={value => setPassword(value)}
                        style={{ height: 40,  width: '86%', marginLeft: '7%', borderColor: isPswrdInputFocused == true ? '#000' : '#AAAAAA', borderWidth: 2, borderRadius: 5, paddingLeft: 10 }}
                        placeholder='type your password'
                        onFocus={() => setPswrdInputFocused(true)}
                        onSubmitEditing={() => setPswrdInputFocused(false)}
                        onEndEditing={() => setPswrdInputFocused(false)}
                    />
                    <Pressable style={{ position: 'absolute', right: 35, bottom: 8 }}
                        onPress={handlePasswordVisibility}>
                        <Icon name={rightIcon} size={23} color={'#AAAAAA'} />
                    </Pressable>
                </View>
                <View style={{ justifyContent: 'center',paddingVertical:5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 25 }}>
                        <Text style={{}}>Cofirm Password:</Text>
                    </View>
                    <TextInput
                        secureTextEntry={confrmpasswordVisibility}
                        value={valuePswrd}
                        onChangeText={value => setValuePswrd(value)}
                        style={{ height: 40,  width: '86%', marginLeft: '7%', borderColor: isPswrdConfrmInputFocused == true ? '#000' : '#AAAAAA', borderWidth: 2, borderRadius: 5, paddingLeft: 10 }}
                        placeholder='type your password'
                        onFocus={() => setPswrdConfrmInputFocused(true)}
                        onSubmitEditing={() => setPswrdConfrmInputFocused(false)}
                        onEndEditing={() => setPswrdConfrmInputFocused(false)}
                    />
                    <Pressable style={{ position: 'absolute', right: 35, bottom: 13 }}
                        onPress={handleConfrmPasswordVisibility}>
                        <Icon name={confrmrightIcon} size={23} color={'#AAAAAA'} />
                    </Pressable>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 40 }}>
                    <Pressable onPress={createUser} style={{ height: 40, width: '87%', backgroundColor: '#000', justifyContent: 'center', borderRadius: 5 }}>
                        <Text style={{ color: '#fff', textAlign: 'center', fontSize: 15, fontWeight: '700' }}>Sign Up</Text>
                    </Pressable>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                    <Text>Don't have an account? </Text>
                    <Pressable onPress={handleToLogin}>
                        <Text style={{ fontSize: 15, fontWeight: '700' }}>Log In </Text>
                    </Pressable>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', paddingHorizontal: 50,gap:10 }}>
                    <View style={{ borderBottomColor: '#AAAAAA', borderBottomWidth: 1, height: 5, width: 80 }}></View>
                    <Text style={{}}> or </Text>
                    <View style={{ borderBottomColor: '#AAAAAA', borderBottomWidth: 1, height: 5, width: 80 }}></View>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingVertical:20,gap:20}}>
                  <Pressable>
                  <Image source={require('../../../src/Images/google.png')} style={styles.image} />
                  </Pressable>
                  <Pressable>
                  <Image source={require('../../../src/Images/facebook.png')} style={styles.image} />
                  </Pressable>
                </View>
            </View>
           </ScrollView>
        </SafeAreaView >
    )
}

export default PhoneSignUp

const styles = StyleSheet.create({

  image: {
    height: 45,
    width: 45
},
logoimage: {
    height: 30,
    width: 30
}
})