import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, Pressable, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
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
  const { signUpWithEmail, signInWithGoogle, facebookSignIn, user } = useAuthContext();
  const { themeMode } = useAuthContext();

  useEffect(() => {
    GoogleSignin.configure({ webClientId: '497944709344-hq1cvv4nrph3sstc86eg0276tgb09042.apps.googleusercontent.com' });
  }, []);

  useEffect(() => {
    if (user) {
      const { displayName, email } = user;
      navigation.navigate('Home', { name: displayName, email });
    }
  }, [user, navigation]);

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
    // Validation for empty fields
    if (!name.trim()) {
      Alert.alert('Name is required');
      return;
    }
    if (!valueMail.trim()) {
      Alert.alert('Email is required');
      return;
    }
    if (!valuePswrd.trim()) {
      Alert.alert('Password is required');
      return;
    }
    if (!confrmpassword.trim()) {
      Alert.alert('Confirm Password is required');
      return;
    }

    // Password match check
    if (valuePswrd !== confrmpassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    // Attempt to create user
    try {
      await signUpWithEmail(valueMail, valuePswrd, name);
      navigation.navigate('Home', { name, email: valueMail });
      navigation.navigate('Notification', { name, email: valueMail });
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const googlesignin = async () => {
    try {
      await signInWithGoogle();
      const userInfo = await GoogleSignin.signIn();
      const { user } = userInfo;
      const { name, email } = user;
      navigation.navigate('Home', { name, email });
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      await facebookSignIn();
    } catch (error) {
      console.error("Error signing in with Facebook:", error);
    }
  };

  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: '#FFFFFF' }, themeMode === "dark" && { backgroundColor: "#1C1C22" }]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flexDirection: 'column', justifyContent: 'center', paddingVertical: 10 }}>
          <View style={{ justifyContent: 'center', paddingHorizontal: 10 }}>
            <View style={{ paddingHorizontal: 17, paddingVertical: 10 }}>
              <Text style={[themeMode === "dark" && { color: '#fff' }]}>Name:</Text>
            </View>
            <TextInput
              style={[
                styles.input,
                isNameInputFocused && { borderColor: themeMode === "dark" ? '#fff' : '#000' },
                { color: themeMode === "dark" ? '#fff' : '#000' }
              ]}
              value={name}
              onChangeText={setName}
              placeholder='Enter full name'
              placeholderTextColor={themeMode === "dark" ? '#fff' : '#AAAAAA'}
              onFocus={() => setNameInputFocused(true)}
              onBlur={() => setNameInputFocused(false)}
            />
          </View>
          <View style={{ justifyContent: 'center', paddingHorizontal: 10 }}>
            <View style={{ paddingHorizontal: 17, paddingVertical: 10 }}>
              <Text style={[themeMode === "dark" && { color: '#fff' }]}>Email:</Text>
            </View>
            <TextInput
              style={[
                styles.input,
                ismailInputFocused && { borderColor: themeMode === "dark" ? '#fff' : '#000' },
                { color: themeMode === "dark" ? '#fff' : '#000' }
              ]}
              value={valueMail}
              onChangeText={setValueMail}
              placeholder='name@email.com'
              placeholderTextColor={themeMode === "dark" ? '#fff' : '#AAAAAA'}
              onFocus={() => setMailInputFocused(true)}
              onBlur={() => setMailInputFocused(false)}
            />
          </View>
          <View style={{ justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 25 }}>
              <Text style={[themeMode === "dark" && { color: '#fff' }]}>Password:</Text>
            </View>
            <TextInput
              secureTextEntry={passwordVisibility}
              style={[
                styles.input,
                isPswrdInputFocused && { borderColor: themeMode === "dark" ? '#fff' : '#000' },
                { color: themeMode === "dark" ? '#fff' : '#000' }
              ]}
              value={valuePswrd}
              onChangeText={setValuePswrd}
              placeholder='type your password'
              placeholderTextColor={themeMode === "dark" ? '#fff' : '#AAAAAA'}
              onFocus={() => setPswrdInputFocused(true)}
              onBlur={() => setPswrdInputFocused(false)}
            />
            <Pressable style={{ position: 'absolute', right: 35, bottom: 8 }} onPress={handlePasswordVisibility}>
              <Icon name={rightIcon} size={23} color={'#AAAAAA'} />
            </Pressable>
          </View>
          <View style={{ justifyContent: 'center', paddingVertical: 5 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 25 }}>
              <Text style={[themeMode === "dark" && { color: '#fff' }]}>Confirm Password:</Text>
            </View>
            <TextInput
              secureTextEntry={confrmpasswordVisibility}
              style={[
                styles.input,
                isPswrdConfrmInputFocused && { borderColor: themeMode === "dark" ? '#fff' : '#000' },
                { color: themeMode === "dark" ? '#fff' : '#000' }
              ]}
              value={confrmpassword}
              onChangeText={setConfrmPassword}
              placeholder='type your password'
              placeholderTextColor={themeMode === "dark" ? '#fff' : '#AAAAAA'}
              onFocus={() => setPswrdConfrmInputFocused(true)}
              onBlur={() => setPswrdConfrmInputFocused(false)}
            />
            <Pressable style={{ position: 'absolute', right: 35, bottom: 13 }} onPress={handleConfrmPasswordVisibility}>
              <Icon name={confrmrightIcon} size={23} color={'#AAAAAA'} />
            </Pressable>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 40 }}>
            <Pressable onPress={createUser} style={[{ height: 40, width: '87%', backgroundColor: '#000', justifyContent: 'center', borderRadius: 5 },themeMode === 'dark' && {backgroundColor:'#fff'}]}>
              <Text style={[{ color: '#fff', textAlign: 'center', fontSize: 15, fontWeight: '700' },themeMode === "dark" && { color: '#000' }]}>Sign Up</Text>
            </Pressable>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
            <Text style={[themeMode === "dark" && { color: '#fff' }]}>Already have an account? </Text>
            <Pressable onPress={handleToLogin}>
              <Text style={[{ fontSize: 15, fontWeight: '700' }, themeMode === "dark" && { color: '#fff' }]}>Log In</Text>
            </Pressable>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row', paddingHorizontal: 50, gap: 10 }}>
            <View style={{ borderBottomColor: '#AAAAAA', borderBottomWidth: 1, height: 5, width: 80 }}></View>
            <Text style={[themeMode === "dark" && { color: '#fff' }]}> or </Text>
            <View style={{ borderBottomColor: '#AAAAAA', borderBottomWidth: 1, height: 5, width: 80 }}></View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 20, gap: 20 }}>
            <Pressable onPress={googlesignin}>
              <Image source={require('../../../src/Images/google.png')} style={styles.image} />
            </Pressable>
            <Pressable onPress={handleFacebookSignIn}>
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
  input: {
    height: 40,
    width: '90%',
    marginLeft: '5%',
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 10,
    borderColor: '#AAAAAA',
  },
});
