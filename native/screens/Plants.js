import { Text, View, SafeAreaView, StyleSheet, FlatList } from 'react-native'

import { useState } from 'react'
import useUser from '../hooks/UserProvider'
import { COLORS } from '../constants/theme'

const Plants = () => {
  return (
    <SafeAreaView backgroundColor={COLORS.primary} style={{
        flex:1,
        // borderWidth: 1,
        // borderColor: 'black',
        
      }}>
        <Text style={{
        borderWidth: 1,
        borderColor: 'black',
        
      }}>
            This is Plants
        </Text>   
    </SafeAreaView>
  )
}

export default Plants