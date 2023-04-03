import React from 'react';
import {View,TouchableWithoutFeedback, Text, StyleSheet} from 'react-native';
import { Icon } from '@rneui/base';
import { pixelRatio } from '../constants/pixelRatio';
import { useState } from 'react';

import { url } from '../constants/localhost';
import useUser from '../hooks/UserProvider'
import { updateId } from 'expo-updates';
import { useNavigation } from '@react-navigation/native';




const PostCardUserInteraction = ({post, liked, setLiked}) => {

    let navigation = useNavigation()
    const {refresh} = useUser()
    
    
    function handleLike () {
        fetch(`${url}/api/post_likes`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({post_id: post.id})
        })
        .then(r=>{
            if (r.ok) {
                setLiked(true)
                refresh()

            }
        })
    }

    function handleDislike () {
        fetch(`${url}/api/unlike`, {
            method: "DELETE",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({post_id: post.id})
        })
        .then(r=>{
            if (r.ok) {
                setLiked(false)
                refresh()

            }
        })
    }


    return (
        <View flexDirection="row" style={{justifyContent:"space-between", marginBottom: pixelRatio(2)}}>                
            <View flexDirection="row" style={{alignItems:"center"}} >
                {liked?
                    <Icon name="heart-fill" color="red" type="octicon" onPress={handleDislike} />
                    :
                    <Icon name="heart" type="octicon" onPress={handleLike} />
                }
                <Text> {post.liked_users.length} {post.liked_users.length===1?"like":"likes"}</Text>
            </View>
            <View flexDirection="row" style={{alignItems:"center"}} >
                <Text onPress={()=>{
                    navigation.navigate('Comments', {post: post})
                }}> {post.comments.length} {post.comments.length===1?"comment":"comments"}</Text>                     
            </View>                              
        </View>
    );
}

const styles = StyleSheet.create({})

export default PostCardUserInteraction;
