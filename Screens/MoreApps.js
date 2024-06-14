import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderBack from '../Components/HeaderBack'

const MoreApps = ({navigation}) => {
  return (
    <View>
      <HeaderBack title={'More Apps'} navigation={navigation} />
      <Text>MoreApps</Text>
    </View>
  )
}

export default MoreApps

const styles = StyleSheet.create({})  