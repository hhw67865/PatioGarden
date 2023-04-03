import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Avatar, Chip} from '@rneui/base';
import { pixelRatio } from '../constants/pixelRatio';
import { url } from '../constants/localhost';



const PostCardUserBar = ({post}) => {

    return (
        <>
            <View style={{flexDirection:"row"}}>
                <Avatar
                size={pixelRatio(12)}
                rounded
                source={{ uri: post.user.image_url?post.user.image_url.replace("http://localhost:3000", url):"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }}
                />
                <Text style={{flexGrow:1, alignSelf:"center", paddingLeft:pixelRatio(3), fontSize:pixelRatio(5), fontFamily: "SansSemiBold"}}>{post.user.username}</Text>
                <Text style={{alignSelf:"center"}}>{post.plant.name}</Text>
            </View>
            <View style={{flexDirection:"row", marginHorizontal: pixelRatio(12)}}>
                {post.tags.map((tag,i)=><Chip key={i} title={tag.name.toUpperCase()} type="outline" size='sm' containerStyle={{ marginHorizontal: pixelRatio(1) }} />)}
            </View>
        </>
    );
}

const styles = StyleSheet.create({})

export default PostCardUserBar;
