import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Switch } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Sound from 'react-native-sound';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '../Navigations/AuthContext';
import HeaderBack from '../Components/HeaderBack';

const AlarmNotification = ({ navigation, route }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Adhan");
    const [alarmTimes, setAlarmTimes] = useState([]);
    const [sound, setSound] = useState(null);
    const { themeMode } = useAuthContext();
    const { editableAlarms } = route?.params ?? {}; // Safely access editableAlarms
    console.log(editableAlarms);
    Sound.setCategory('Playback');

    useEffect(() => {
        loadSound();
        loadSettings();
        const intervalId = setInterval(checkPrayerTimeMatch, 60000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        checkPrayerTimeMatch();
        saveSettings();
    }, [selectedOption, isEnabled]);

    const loadSettings = async () => {
        try {
            const storedIsEnabled = await AsyncStorage.getItem('isEnabled');
            setIsEnabled(storedIsEnabled === 'true');
            const storedSelectedOption = await AsyncStorage.getItem('selectedOption');
            setSelectedOption(storedSelectedOption || 'Adhan');

            const savedAlarmTimes = await AsyncStorage.getItem('alarmTimes');
            if (savedAlarmTimes) {
                setAlarmTimes(JSON.parse(savedAlarmTimes));
            }
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    };

    const loadSound = async () => {
        const soundObject = new Sound(
            "azan.mp3",
            Sound.MAIN_BUNDLE,
            (error) => {
                if (error) {
                    console.log("Failed to load the sound", error);
                    return;
                }
                setSound(soundObject);
            }
        );
    };

    const checkPrayerTimeMatch = () => {
        const currentTime = new Date();
        const currentTimeStr = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        if (!isEnabled || selectedOption === "Default") {
            if (sound) {
                sound.stop();
            }
            return;
        }
        const matchingAlarm = alarmTimes.find(alarmTime => alarmTime === currentTimeStr);
        if (matchingAlarm && sound) {
            sound.play();
        }
    };

    const toggleSwitch = async () => {
        setIsEnabled(!isEnabled);
        try {
            await AsyncStorage.setItem('isEnabled', (!isEnabled).toString());
        } catch (error) {
            console.error('Error saving isEnabled setting:', error);
        }
    };

    const saveSettings = async () => {
        try {
            await AsyncStorage.setItem('isEnabled', isEnabled.toString());
            await AsyncStorage.setItem('selectedOption', selectedOption);
        } catch (error) {
            console.error('Error saving settings:', error);
        }
    };

    const handleOptionPress = (option) => {
        setSelectedOption(option);
    };
    
    return (
        <SafeAreaView style={[styles.container, themeMode === "dark" && { backgroundColor: "#1C1C22", color: "#fff" }]}>
            <HeaderBack title={'Setting'} navigation={navigation}/>
            <View style={{ flexDirection: "column" }}>
                <View style={styles.notifications}>
                    <Text style={[styles.title, themeMode === "dark" && { color: "#fff" }]}>Show Notifications</Text>
                    <Switch
                        trackColor={{ false: '#B2B2B2', true: '#5BB5AB' }}
                        thumbColor={isEnabled ? '#0a9484' : '#f4f3f4'}
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                <View style={{ flexDirection: "column" }}>
                    <View style={styles.items}>
                        <RadioButton.Group
                            onValueChange={value => handleOptionPress(value)}
                            value={selectedOption}
                        >
                            <View style={styles.radioContainer}>
                                <RadioButton.Item
                                    value="Default"
                                    label="Default"
                                    color="#0a9484"
                                    disabled={!isEnabled}
                                    style={[styles.radioButton, themeMode === "dark" && { color: "#fff" }]}
                                    labelStyle={[{ fontSize: 15 }, themeMode === "dark" && { color: "#fff" }]}
                                />
                            </View>
                        </RadioButton.Group>
                    </View>
                    <View style={styles.items}>
                        <RadioButton.Group
                            onValueChange={value => handleOptionPress(value)}
                            value={selectedOption}
                        >
                            <View style={styles.radioContainer}>
                                <RadioButton.Item
                                    label="Adhan"
                                    value="Adhan"
                                    color="#0a9484"
                                    disabled={!isEnabled}
                                    style={[styles.radioButton, themeMode === "dark" && { color: "#fff" }]}
                                    labelStyle={[{ fontSize: 15 }, themeMode === "dark" && { color: "#fff" }]}
                                />
                            </View>
                        </RadioButton.Group>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default AlarmNotification;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    setting: {
        flexDirection: "row",
        gap: 110,
        justifyContent: 'flex-start',
        alignItems: "center",
        height: 60,
        borderBottomColor: '#DCDCDC',
        borderBottomWidth: 1,
    },
    settingIcon: {
        fontSize: 22,
        fontWeight: "700",
    },
    items: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: '#DCDCDC',
        borderBottomWidth: 1,
        justifyContent: "space-between",
        padding: 10
    },
    title: {
        fontSize: 14,
        fontWeight: "500",
        marginRight: 10,
    },
    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    notifications: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: '#DCDCDC',
        borderBottomWidth: 1,
        justifyContent: "space-between",
        padding: 20
    },
    radioButton: {
        flexDirection: 'row-reverse',
        alignSelf: 'flex-start',
    }
});
