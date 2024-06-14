import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
// import { TextInput, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';

const PhonLogin = ({ navigation }) => {
    const [valueMail, setValueMail] = useState('')
    const [valuePswrd, setValuePswrd] = useState('')
    const [ismailInputFocused, setMailInputFocused] = useState(false)
    const [isPswrdInputFocused, setPswrdInputFocused] = useState(false)
    const [password, setPassword] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');

    const handlePasswordVisibility = () => {
        if (rightIcon === 'eye') {
            setRightIcon('eye-with-line');
            setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === 'eye-with-line') {
            setRightIcon('eye');
            setPasswordVisibility(!passwordVisibility);
        }
    };

    const handleToSignup = () => {
        navigation.navigate('SignUp')
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <View style={{flexDirection: 'column', justifyContent: 'center' }}>
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
                            keyboardType='number-pad'
                            maxLength={10}
                            value={valueMail}
                            onChangeText={value => setValueMail(value)}
                            style={{ height: 40, width: '67%', marginLeft: '5%', borderColor: ismailInputFocused == true ? '#000' : '#AAAAAA', borderWidth: 2, borderRadius: 5, paddingLeft: 10 }}
                            placeholder='333 1122333'
                            onFocus={() => setMailInputFocused(true)}
                            onSubmitEditing={() => setMailInputFocused(false)}
                            onEndEditing={() => setMailInputFocused(false)}
                        />
                    </View>
                </View>
                <View style={{ justifyContent: 'center', marginVertical: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 25 }}>
                        <Text style={{}}>Password:</Text>
                        <Pressable>
                            <Text style={{}}>Forgot Password ?</Text>
                        </Pressable>
                    </View>
                    <TextInput
                        secureTextEntry={passwordVisibility}
                        value={valuePswrd}
                        onChangeText={value => setValuePswrd(value)}
                        style={{ height: 40, width: '86%', marginLeft: '7%', borderColor: isPswrdInputFocused == true ? '#000' : '#AAAAAA', borderWidth: 2, borderRadius: 5, paddingLeft: 10 }}
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
                <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 5 }}>
                    <Pressable style={{ height: 40, width: '87%', backgroundColor: '#000', justifyContent: 'center', borderRadius: 5 }}>
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
                    <Text style={{}}> or </Text>
                    <View style={{ borderBottomColor: '#AAAAAA', borderBottomWidth: 1, height: 5, width: 80 }}></View>
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

    image: {
        height: 45,
        width: 45
    },
    logoimage: {
        height: 30,
        width: 30
    }
})