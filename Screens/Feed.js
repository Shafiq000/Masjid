import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderBack from '../Components/HeaderBack'

const Feed = ({navigation}) => {
  return (
    <View style={{flex:1}}>
      <HeaderBack title={'Feed'} navigation={navigation} />
     <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
     <Text style={{fontSize:15,fontWeight:'600'}}>No Update in Feed</Text>
     </View>
    </View>
  )
}

export default Feed

const styles = StyleSheet.create({})