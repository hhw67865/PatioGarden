import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { pixelRatio } from '../constants/pixelRatio';


const ProfileStats = ({user}) => {
    return (
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
    );
}

const styles = StyleSheet.create({
    statsContainer: {    
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

export default ProfileStats;
