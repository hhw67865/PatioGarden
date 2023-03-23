import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { pixelRatio } from '../constants/pixelRatio';
import PostCard from './PostCard';

const ProfilePosts = ({user, userPosts}) => {
    return (
        <View>
            <Text
              style={styles.postTitle}>
              Posts
            </Text>
            <View>
                {userPosts.map((post, i)=><PostCard post={post} key={i}/>)}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    postTitle: {
        fontFamily: "SansSemiBold",
        fontSize: pixelRatio(7),
        textAlign:"center"
    }
})

export default ProfilePosts;
