import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { pixelRatio } from '../constants/pixelRatio';

import PostCardUserBar from './PostCardUserBar';
import PostCardImage from './PostCardImage';
import PostCardUserInteraction from './PostCardUserInteraction';
import PostCardBody from './PostCardBody';
import useUser from '../hooks/UserProvider'


const PostCard = ({post}) => {

    const {user} = useUser()
    const [liked, setLiked] = useState(
        post.liked_users.filter((like)=>user.username.toLowerCase()===like.username.toLowerCase()).length>0
    )
    return (
        <View style={{marginVertical: pixelRatio(5)}}>
            <PostCardUserBar post={post}/>
            <PostCardImage liked={liked} setLiked={setLiked} post={post}/>
            <PostCardUserInteraction liked={liked} setLiked={setLiked} post={post}/>
            <PostCardBody post={post}/>
        </View>
    );
}

const styles = StyleSheet.create({
    
})

export default PostCard;
