import React, { useState } from 'react';
import {View, StyleSheet, Keyboard, TextInput} from 'react-native';
import { pixelRatio } from '../constants/pixelRatio';
import { Icon } from '@rneui/base';
import { COLORS } from '../constants/theme';
import { url } from '../constants/localhost';
import useUser from '../hooks/UserProvider';

const CommentsUserInput = ({post, user}) => {

    const { refresh } = useUser();
    const [newComment, setNewComment] = useState("")

    function handleComment () {
        fetch(`${url}/api/comments`, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({comment_body:newComment,post_id: post.id,user_id: user.id})
            })
            .then(r=>{
                if(r.ok) {
                    setNewComment("")
                    Keyboard.dismiss()
                    refresh()
                }
                else{
                    r.json().then(console.log)
                }
            })
    }

    return (
        <View style={{flexDirection:"row", alignItems:"center"}}>
            <TextInput
                multiline                    
                style={styles.input}
                placeholder="Comment!" 
                onChangeText={setNewComment}
                value={newComment}                                           
            />
            <Icon
                reverse
                name='send-outline'
                type='ionicon'
                color={COLORS.secondary}
                style={{width: "15%"}}
                size={pixelRatio(5)}
                onPress={handleComment}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        borderRadius: 8,
        height: 35,
        width: "85%",
        borderColor: 'gray',
        borderWidth: 1,
        marginLeft: pixelRatio(2),
        paddingHorizontal: pixelRatio(4),
        fontFamily: "SansRegular",
        fontSize: pixelRatio(5)
    }
})

export default CommentsUserInput;
