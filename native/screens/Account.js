import { Text, View, SafeAreaView, StyleSheet, FlatList } from 'react-native'
import { Avatar } from '@rneui/themed';

import { useState } from 'react'
import useUser from '../hooks/UserProvider'
import { COLORS } from '../constants/theme'
import { url } from '../constants/localhost';
import { pixelRatio } from '../constants/pixelRatio';

const Account = () => {

  const {user} = useUser()

  return (
    <SafeAreaView backgroundColor={COLORS.primary} style={{
        flex:1,       
      }}>
        <View style={styles.pictureContainer}>
          <Avatar
            size={150}
            rounded
            source={{ uri: user.image_url.replace("http://localhost:3000", url) }}
          />
          <View style={styles.descriptionContainer}>
            <Text style={{
              fontFamily: "SansBold",
              fontSize: pixelRatio(7),              
              marginBottom: pixelRatio(2)
            }}>
              @{user.username}
            </Text>
            <Text style={styles.descriptionText}>
              {user.name}
            </Text>
            <Text style={styles.descriptionText}>
              {user.skill_level} Gardener
            </Text>
            <Text style={styles.descriptionText}>
              {user.location.name}
            </Text>       
          </View>
        </View>
        
        <View style={styles.statsContainer}>
          <View style={styles.stats}>
            <Text style={styles.number}>{user.posts.length}</Text>
            <Text>POSTS</Text>
          </View>
          <View style={styles.stats}>
            <Text style={styles.number}>{user.followers.length}</Text>
            <Text>FOLLOWERS</Text>
          </View>
          <View style={styles.stats}>
            <Text style={styles.number}>{user.following.length}</Text>
            <Text>FOLLOWING</Text>
          </View>

        </View>

        <Text style={{
          fontFamily: "SansSemiBoldItalic",
          fontSize: pixelRatio(5),
          textAlign:"center",
          paddingHorizontal: pixelRatio(7),
          paddingVertical: pixelRatio(4)                
        }}>
          "{user.description}"
        </Text>
        <Text style={{
          fontFamily: "SansSemiBold",
          fontSize: pixelRatio(7),
          textAlign:"center",
          paddingHorizontal: pixelRatio(7),
          paddingVertical: pixelRatio(4),
        }}>
          - {user.username}'s Garden Repertoire -
        </Text>

        
           
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  pictureContainer: {
    padding: pixelRatio(7),
    flexDirection: 'row',
  },
  descriptionContainer: {
    marginLeft: pixelRatio(5),
    flex:1
    
  },
  descriptionText: {
    fontFamily: "SansRegular",
    fontSize: pixelRatio(5),
     
  },
  statsContainer: {
    padding: pixelRatio(7),
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems:"center",      
  },
  stats: {
    alignItems:"center",
    width:"33%"
  },
  number: {
    fontFamily: "SansBold",
    fontSize: pixelRatio(8),
  }
})

export default Account