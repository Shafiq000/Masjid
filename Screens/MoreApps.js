import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View, Image, FlatList, Linking } from 'react-native';
import { useAuthContext } from '../Navigations/AuthContext';
import HeaderBack from '../Components/HeaderBack';

const MoreApps = ({ navigation }) => {
  const { themeMode } = useAuthContext();
  const data = [
    {
      id: 1,
      image: require('../src/Images/shalat.png'),
      title: "Jamaat",
      uri: "https://play.google.com/store/apps/details?id=com.mslm.jamaat"
    },
    {
      id: 2,
      image: require('../src/Images/time.png'),
      title: "Prayer Time",
      uri: "https://play.google.com/store/apps/details?id=com.mslm.jamaat.prayertime"
    },
    {
      id: 3,
      image: require('../src/Images/qibla.png'),
      title: "Qibla",
      uri: "https://play.google.com/store/apps/details?id=com.mslm.jamaat.qibla"
    },
    {
      id: 4,
      image: require('../src/Images/tasbih.png'),
      title: "Tasbih",
      uri: "https://play.google.com/store/apps/details?id=com.mslm.tasbih&hl=en_US"
    },
    {
      id: 5,
      image: require('../src/Images/allah.png'),
      title: "99 Names",
      uri: "https://play.google.com/store/apps/details?id=com.mslm.allah.names"
    },
    {
      id: 6,
      image: require('../src/Images/dua.png'),
      title: "Dua Azkar",
      uri: "https://play.google.com/store/apps/details?id=com.mslm.dua&hl=en&gl=US"
    },
    {
      id: 7,
      image: require('../src/Images/quran.png'),
      title: "Hadith",
      uri: "https://play.google.com/store/apps/details?id=com.mslm.hadith"
    },
    // {
    //   id: 8,
    //   image: require('../src/Images/mosque.png'),
    //   title: "Masjid",
    //   uri: "https://play.google.com/store/apps/details?id=com.mslm.masjid"
    // },
    {
      id: 8,
      image: require('../src/Images/calendar.png'),
      title: "Calendar",
      uri: "https://play.google.com/store/apps/details?id=com.mslm.islamic.calendar&hl=en_US"
    },
  ];

  const renderItem = ({ item }) => {
    const handlePress = () => {
      Linking.openURL(item.uri);
    };
    return (
      <View style={styles.item}>
        <Pressable onPress={handlePress} style={styles.pressable}>
          <View style={styles.blockImag}>
            <Image style={styles.innerImage} source={item.image} />
          </View>
          <Text style={[styles.titleText, themeMode === "dark" && { color: "#fff" }]}>{item.title}</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, themeMode === "dark" && { backgroundColor: "#1C1C22" }]}>
      <HeaderBack title={'MoreApps'} navigation={navigation} />
      <View style={styles.listContainer}>
        <FlatList
          numColumns={4}
          // columnWrapperStyle={{ marginTop: 15 }}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  listContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  item: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockImag: {
    backgroundColor: "#0a9484",
    borderRadius: 8,
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  innerImage: {
    height: 50,
    width: 50,

  },
  titleText: {
    marginTop: 15,
    fontSize: 13,
    fontWeight: "500",
    alignSelf: "center",
  },
});

export default MoreApps;
