import React, { createContext, useState, useEffect, useContext } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

const AuthContext = createContext(null);

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState("light");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GoogleSignin.configure({ webClientId: '497944709344-hq1cvv4nrph3sstc86eg0276tgb09042.apps.googleusercontent.com' }); // Replace with your actual webClientId
  }, []);

  useEffect(() => {
    (async () => {
      // Load theme from AsyncStorage
      const storedTheme = await AsyncStorage.getItem("themeMode");
      if (storedTheme) {
        setThemeMode(storedTheme);
      } else {
        const systemTheme = Appearance.getColorScheme();
        setThemeMode(systemTheme || "light");
      }

      // Check for stored user session data
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      }

      setLoading(false);  // Set loading to false once initialization is done
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("themeMode", themeMode);
  }, [themeMode]);

  const toggleThemeMode = () => {
    const newThemeMode = themeMode === "dark" ? "light" : "dark";
    setThemeMode(newThemeMode);
  };

  const signUpWithEmail = async (email, password, name) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const { user } = userCredential;
      await user.updateProfile({ displayName: name });
      const userData = {
        email: user.email,
        displayName: name,
        uid: user.uid,
        // Add other properties if needed
      };
      setUser(userData);
      setIsAuthenticated(true);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Error signing up with email: ", error);
      throw error;
    }
  };

  const signInWithEmail = async (email, password) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const { user } = userCredential;
      const userData = {
        email: user.email,
        displayName: user.displayName || 'User', // Ensure a fallback name is set
        uid: user.uid,
        // Add other properties if needed
      };
      setUser(userData);
      setIsAuthenticated(true);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      return userData; // Return userData for further use in navigation
    } catch (error) {
      console.error("Error signing in with email: ", error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const { user } = userInfo;
      const userData = {
        email: user.email,
        displayName: user.name,
        uid: user.id,
        // Add other properties if needed
      };
      setUser(userData);
      setIsAuthenticated(true);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      if (error.code) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            console.log('User cancelled the login flow');
            break;
          case statusCodes.IN_PROGRESS:
            console.log('Sign in is in progress already');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log('Play services are not available or outdated');
            break;
          case statusCodes.DEVELOPER_ERROR:
            console.log('Developer error. Check your configuration');
            break;
          default:
            console.log('Some other error happened', error);
            break;
        }
      } else {
        console.log('An error occurred not related to Google Sign-In', error);
      }
    }
  };

  const signOut = async () => {
    try {
      // Google Sign Out
      await GoogleSignin.signOut();

      // Firebase Sign Out
      const currentUser = auth().currentUser;
      if (currentUser) {
        await auth().signOut();
      }

      // Clear local authentication state
      setIsAuthenticated(false);
      setUser(null);

      // Remove user-related data from AsyncStorage
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('HomeMasjid'); // Clear home mosque
      await AsyncStorage.removeItem('Subscribe'); // Clear subscriptions

      console.log('User signed out and data cleared');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const value = {
    themeMode,
    toggleThemeMode,
    isAuthenticated,
    user,
    loading,
    signUpWithEmail,
    signInWithEmail,
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
