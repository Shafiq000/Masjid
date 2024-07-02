import React, { memo, useCallback, useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useAuthContext } from "../Navigations/AuthContext";
import MainHeader from "../Components/MainHeader";
import TopTabNavigation from "../Navigations/TopTabNavigation";
import Allmosques from '../Components/Allmosques';

const Home = ({ navigation }) => {
  const { themeMode } = useAuthContext();

  const handlemove = () =>{
    navigation.navigate('NearbyMasjid')
   }
  
  return (
    <View style={[{ backgroundColor: '#FFFFFF', flex: 1 }]}>
      <MainHeader title={'Jamaat Hadith'} navigation={navigation} />
      <View style={[styles.container,themeMode === "dark" && { backgroundColor: "#1C1C22" }]}>
        <TopTabNavigation />
      </View>
      <View style={[{ flex: .5, borderTopColor: '#cbcbcb', borderTopWidth: 1 },themeMode === "dark" && { backgroundColor: "#1C1C22" }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18, paddingVertical: 15 }}>
          <Text style={[{ fontSize: 20, fontWeight: '600' },themeMode === "dark" && { color:'#ffff' }]}> Masjids Nearby You</Text>
          <Pressable onPress={handlemove}>
            <Text style={[{ fontSize: 15, fontWeight: '500' },themeMode === "dark" && { color:'#ffff' }]}>See All</Text>
          </Pressable>
        </View>
        <Allmosques navigation={navigation} />
       
      </View>
    </View>
  );
};

export default memo(Home);

const styles = StyleSheet.create({
  allMosquesContainer: {
    paddingHorizontal: 12,
    backgroundColor:'red'
  },
  container: {
    flex: .5,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  itemContainer:{
    flex:1
  }
});
