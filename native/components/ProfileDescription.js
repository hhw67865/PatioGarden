import React from 'react';
import {Text, StyleSheet} from 'react-native';
import { pixelRatio } from '../constants/pixelRatio';

const ProfileDescription = ({user}) => {
    return (
        <Text style={styles.profileDescription}>
            "{user.description}"
        </Text>
    );
}

const styles = StyleSheet.create({
    profileDescription: {
        fontFamily: "SansSemiBoldItalic",
        fontSize: pixelRatio(5),
        textAlign:"center",
        paddingVertical: pixelRatio(4)                
      }
})

export default ProfileDescription;
