import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Pressable, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useAuthContext } from '../../../Navigations/AuthContext';
const EmailSignUp = ({ navigation }) => {
  const [valueMail, setValueMail] = useState('');
  const [name, setName] = useState('');
  const [valuePswrd, setValuePswrd] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [confrmpasswordVisibility, setConfrmPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [confrmrightIcon, setConfrmRightIcon] = useState('eye');
  const [ismailInputFocused, setMailInputFocused] = useState(false);
  const [isNameInputFocused, setNameInputFocused] = useState(false);
  const [isPswrdInputFocused, setPswrdInputFocused] = useState(false);
  const [isPswrdConfrmInputFocused, setPswrdConfrmInputFocused] = useState(false);
  const [confrmpassword, setConfrmPassword] = useState('');
  const { signUpWithEmail,signInWithGoogle } = useAuthContext();

  useEffect(() => {
    GoogleSignin.configure({ webClientId: '497944709344-hq1cvv4nrph3sstc86eg0276tgb09042.apps.googleusercontent.com' });
  }, []);

  const handlePasswordVisibility = () => {
    setRightIcon(rightIcon === 'eye' ? 'eye-with-line' : 'eye');
    setPasswordVisibility(!passwordVisibility);
  };

  const handleConfrmPasswordVisibility = () => {
    setConfrmRightIcon(confrmrightIcon === 'eye' ? 'eye-with-line' : 'eye');
    setConfrmPasswordVisibility(!confrmpasswordVisibility);
  };

  const handleToLogin = () => {
    navigation.navigate('Login');
  };

  const createUser = async () => {
    if (valuePswrd !== confrmpassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    try {
      await signUpWithEmail(valueMail, valuePswrd, name);
      navigation.navigate('DrawerNavigation', { name, email: valueMail });
      navigation.navigate('Notification', { name, email: valueMail });
    } catch (error) {
      console.error("Error creating user:", error);
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
    <SafeAreaView style={{ backgroundColor: '#FFFFFF' }}>
     <ScrollView  contentContainerStyle={{ flexGrow: 1 }}>
     <View style={{  flexDirection: 'column', justifyContent: 'center', paddingVertical: 10 }}>
        <View style={{ justifyContent: 'center', paddingHorizontal: 10 }}>
          <View style={{ paddingHorizontal: 17, paddingVertical: 10 }}>
            <Text>Name:</Text>
          </View>
          <TextInput
            value={name}
            onChangeText={value => setName(value)}
            style={{ height: 40, width: '90%', marginLeft: '5%', borderColor: isNameInputFocused ? '#000' : '#AAAAAA', borderWidth: 2, borderRadius: 5, paddingLeft: 10 }}
            placeholder='Enter full name'
            onFocus={() => setNameInputFocused(true)}
            onSubmitEditing={() => setNameInputFocused(false)}
            onEndEditing={() => setNameInputFocused(false)}
          />
        </View>
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
        <View style={{ justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 25 }}>
            <Text>Password:</Text>
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
        <View style={{ justifyContent: 'center', paddingVertical: 5 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 25 }}>
            <Text>Confirm Password:</Text>
          </View>
          <TextInput
            secureTextEntry={confrmpasswordVisibility}
            value={confrmpassword}
            onChangeText={value => setConfrmPassword(value)}
            style={{ height: 40, width: '86%', marginLeft: '7%', borderColor: isPswrdConfrmInputFocused ? '#000' : '#AAAAAA', borderWidth: 2, borderRadius: 5, paddingLeft: 10 }}
            placeholder='type your password'
            onFocus={() => setPswrdConfrmInputFocused(true)}
            onSubmitEditing={() => setPswrdConfrmInputFocused(false)}
            onEndEditing={() => setPswrdConfrmInputFocused(false)}
          />
          <Pressable style={{ position: 'absolute', right: 35, bottom: 13 }} onPress={handleConfrmPasswordVisibility}>
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
     </ScrollView>
    </SafeAreaView>
  );
};

export default EmailSignUp;

const styles = StyleSheet.create({
  image: {
    height: 45,
    width: 45,
  },
});
