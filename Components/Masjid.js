import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ExclaIcon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from "@react-native-async-storage/async-storage";
import LocIcon from 'react-native-vector-icons/EvilIcons';
import moment from 'moment';
import { useAuthContext } from '../Navigations/AuthContext';
const Masjid = ({ navigation }) => {
  const [homeMasjid, setHomeMasjid] = useState(null);
  const [nextPrayer, setNextPrayer] = useState({});
  const [remainingTime, setRemainingTime] = useState('');
  const [intervalId, setIntervalId] = useState(null);
  const { themeMode } = useAuthContext();

  const fetchHomeMasjid = async () => {
    try {
      const homeMasjidData = await AsyncStorage.getItem("HomeMasjid");
      if (homeMasjidData) {
        const masjidData = JSON.parse(homeMasjidData);
        setHomeMasjid(masjidData);
        fetchPrayerData(masjidData.prayerTimes);
      } else {
        setHomeMasjid(null);
      }
    } catch (e) {
      console.error("Error fetching home masjid:", e);
      setHomeMasjid(null);
    }
  };

  useEffect(() => {
    const unsethome = navigation.addListener('focus', () => {
      fetchHomeMasjid();
    });
    return unsethome;
  }, [navigation]);

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  const fetchPrayerData = async (prayerTimes) => {
    const currentTime = moment();
    const formattedPrayerTimes = Object.entries(prayerTimes).map(([prayer, time]) => {
      const [timeStr, period] = time.split(' ');
      const prayerMoment = moment(timeStr + ' ' + period, 'h:mm A');
      if (prayerMoment.isBefore(currentTime)) {
        prayerMoment.add(1, 'days');
      }
      return { prayer, time: prayerMoment };
    }).sort((a, b) => a.time - b.time);

    let nextPrayerTime = null;
    for (const { prayer, time } of formattedPrayerTimes) {
      if (time.isAfter(currentTime)) {
        nextPrayerTime = { prayer, time };
        break;
      }
    }
    if (!nextPrayerTime) {
      nextPrayerTime = formattedPrayerTimes[0];
    }

    setNextPrayer(nextPrayerTime);

    const updateRemainingTime = () => {
      const now = moment();
      const timeLeft = moment.duration(nextPrayerTime.time.diff(now));
      const formattedTime = `${String(timeLeft.hours()).padStart(2, '0')}:${String(timeLeft.minutes()).padStart(2, '0')}:${String(timeLeft.seconds()).padStart(2, '0')}`;
      setRemainingTime(formattedTime);
    };

    updateRemainingTime();
    const id = setInterval(updateRemainingTime, 1000);
    setIntervalId(id);
  };

  const handlemosque = () => {
    navigation.navigate('NearbyMasjid');
  };

  const handleItemPress = (item) => {
    navigation.navigate('MasjidDetails', { itemId: item.id });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {homeMasjid ? (
        <Pressable onPress={() => handleItemPress(homeMasjid)} style={styles.forMosqueContainer}>
          <View style={styles.innerBodyMosqueStyle}>
            <View style={styles.titleStyleContainer}>
              <Text style={[styles.title,themeMode === "dark" && { color:'#ffff' }]}>{homeMasjid.title}</Text>
              <View style={{ flexDirection: 'row' }}>
                <LocIcon name='location' size={25} style={[themeMode === "dark" && { color:'#ffff' }]} />
                <Text style={[styles.address,themeMode === "dark" && { color:'#ffff' }]}>{homeMasjid.address}</Text>
              </View>
            </View>

            <Text style={[{ bottom: 5, left: 10 },themeMode === "dark" && { color:'#ffff' }]}>Next Jamaat {nextPrayer.prayer}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
              <Text style={[{ fontSize: 18, fontWeight: '700' },themeMode === "dark" && { color:'#ffff' }]}>{nextPrayer.time ? nextPrayer.time.format('h:mm A') : ''}</Text>
              <Text style={[{ fontSize: 18, fontWeight: '700' },themeMode === "dark" && { color:'#ffff' }]}>{remainingTime}</Text>
            </View>
            <View style={styles.nameTimeStyle}>
              {homeMasjid.prayerTimes && Object.entries(homeMasjid.prayerTimes).map(([prayer, time]) => {
                const isCurrentPrayer = nextPrayer.prayer === prayer;
                return (
                  <View key={prayer}>
                    <Text style={[styles.prayerName, isCurrentPrayer && styles.currentPrayer]}>{prayer}</Text>
                    <Text style={[styles.prayerTime, isCurrentPrayer && styles.currentPrayer]}>{time.split(' ')[0]}{'\n'}{time.split(' ')[1]}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </Pressable>
      ) : (
        <View style={styles.bodyContainer}>
          <View style={styles.innerBodyStyle}>
            <ExclaIcon name='exclamationcircleo' size={40} color={'#0a9484'} />
            <Text>You don't have set any mosque as home.</Text>
            <Pressable onPress={handlemosque} style={styles.btnstyle}>
              <Text style={{ color: '#fff', fontWeight: '600' }}>Set Home</Text>
            </Pressable>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Masjid;

const styles = StyleSheet.create({
  bodyContainer: {
    backgroundColor: '#DDF1EF',
    height: 230,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderColor: '#DCDCDC',
    borderWidth: 1,
  },
  innerBodyStyle: {
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  btnstyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a9484',
    width: 100,
    height: 35,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 16,
    marginBottom: 10,
  },
  prayerName: {
    fontSize: 13,
    textAlign: 'center',
  },
  prayerTime: {
    fontSize: 12,
    fontWeight: "700",
    textAlign: 'center',
  },
  currentPrayer: {
    color: '#0a9484',
  },
  forMosqueContainer: {
    height: 230,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderColor: '#DCDCDC',
    borderWidth: 1,
  },
  innerBodyMosqueStyle: {
    flex: 1,
  },
  titleStyleContainer: {
    borderBottomColor: '#DCDCDC',
    borderBottomWidth: 1,
    justifyContent: 'center',
    marginVertical: 15,
    marginHorizontal: 10
  },
  nameTimeStyle: {
    height: 68,
    width: 320,
    marginVertical: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#E8E1F9',
    borderRadius: 15,
  },
});
  