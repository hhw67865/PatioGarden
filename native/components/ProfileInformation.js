import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Avatar } from '@rneui/themed';
import { pixelRatio } from '../constants/pixelRatio';
import { url } from '../constants/localhost';



const ProfileInformation = ({user}) => {
    return (
        <View style={styles.pictureContainer}>
            <Avatar
              size={100}
              rounded
              source={{ uri: user.image_url?user.image_url.replace("http://localhost:3000", url):"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }}
            />
            <View style={styles.descriptionContainer}>
              
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
    );
}

const styles = StyleSheet.create({
    pictureContainer: {    
        flexDirection: 'row',
        paddingBottom: pixelRatio(7)
      },
      descriptionContainer: {
        marginLeft: pixelRatio(5),
        flex:1
        
      },
      descriptionText: {
        fontFamily: "SansRegular",
        fontSize: pixelRatio(5),
         
      }
})

export default ProfileInformation;
