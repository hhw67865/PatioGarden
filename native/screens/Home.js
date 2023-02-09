import { Text, View, SafeAreaView, FlatList } from 'react-native'
import { useState } from 'react'

import { COLORS } from '../constants/theme'

const Home = () => {
  return (
    <SafeAreaView style={{
        flex:1,
        borderWidth: 1,
        borderColor: 'black',
        width: 100,
        height: 100
      }}>
        <Text style={{
        borderWidth: 1,
        borderColor: 'black',
        width: 100,
        height: 100
      }}>
            This is Home
        </Text>   
    </SafeAreaView>

  );
}
export default Home;