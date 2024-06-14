import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HeaderBack from '../Components/HeaderBack';
import { useAuthContext } from '../Navigations/AuthContext';

const Notification = ({ navigation }) => {
  const { user, isAuthenticated } = useAuthContext();

  const getCurrentDate = () => {
    const date = new Date();
    const options = {
      // weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <View style={styles.container}>
      <HeaderBack title="Notification" navigation={navigation} />
      {isAuthenticated ? (
        <View style={{ flex: 1, alignItems: 'center', paddingVertical: 20 }}>
          <View style={styles.welcomContainer}>
            <Text style={styles.userInfoname}>Welcome {user.displayName}!</Text>
            <Text style={styles.userInfoDate}>{getCurrentDate()}</Text>
            <Text style={styles.userInfoText}>You are all set up to start using our services</Text>
          </View>
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 15, fontWeight: '500' }}>No Logged-in User</Text>
        </View>
      )}
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  welcomContainer: {
    height: 100,
    width: '90%',
    borderRadius: 10,
    backgroundColor: '#FCF5E5',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
  },
  userInfoname: {
    fontSize: 16,
    fontWeight: '700',
  },
  userInfoDate: {
    fontSize: 16,
    fontWeight: '700',
  },
  userInfoText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
