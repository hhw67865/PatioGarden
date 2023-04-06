import React from 'react';
import {View, Text , StyleSheet} from 'react-native';
import { Avatar } from '@rneui/themed';
import { url } from '../constants/localhost';
import { pixelRatio } from '../constants/pixelRatio';


const CommentCard = ({comment}) => {
    return (
        <View style={{flexDirection:"row", marginBottom:pixelRatio(7)}}>
            <Avatar
              size={40}
              rounded
              source={{ uri: comment.user.image_url?comment.user.image_url.replace("http://localhost:3000", url):"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }}
            />
            <View style={{flexGrow:1, marginLeft:pixelRatio(4)}}>
                <View style={{flexDirection:"row"}}>
                    <Text style={{fontFamily: "SansSemiBold"}}>{comment.user.username}</Text>
                    <Text style={{marginLeft:pixelRatio(2), color:"grey", fontFamily: "SansRegular"}}>
                        {comment.created_at_ago}
                    </Text>
                </View>
                <Text>{comment.comment_body}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default CommentCard;
