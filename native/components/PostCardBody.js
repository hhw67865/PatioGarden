import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { pixelRatio } from '../constants/pixelRatio';

const PostCardBody = ({post}) => {
    return (
        <>
            <View>
                <Text style={{fontFamily: "SansRegular"}}>{post.post_body}</Text>
            </View>
            <Text style={{fontFamily: "SansRegular", color: "grey", fontSize: pixelRatio(4)}}>
                {post.created_at_ago}
            </Text>
        </>
    );
}

const styles = StyleSheet.create({})

export default PostCardBody;
