import React, {useEffect, useState} from 'react';
import {View, KeyboardAvoidingView,Keyboard, StyleSheet, SafeAreaView,TouchableWithoutFeedback, TextInput} from 'react-native';
import { url } from '../constants/localhost';
import CommentCard from '../components/CommentCard';
import { COLORS } from '../constants/theme';
import { pixelRatio } from '../constants/pixelRatio';
import { Icon } from '@rneui/base';
import CommentsContainer from '../components/CommentsContainer';
import CommentsUserInput from '../components/CommentsUserInput';
import useUser from '../hooks/UserProvider';

const Comments = ({route}) => {
    const { user , update } = useUser();
    const { post } = route.params;
    const [comments, setComments] = useState([])

    useEffect(()=>{
        fetch(`${url}/api/posts/${post.id}/comments`)
        .then(r=>r.json())
        .then(setComments)
    },[update])

    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <SafeAreaView backgroundColor={COLORS.primary} style={{
                flex:1    
            }}>
                <KeyboardAvoidingView
                    behavior="padding"
                    style={{flexGrow:1}}  
                    keyboardVerticalOffset={comments.length>5?pixelRatio(45):pixelRatio(30)}             
                >            
                    <CommentsContainer comments={comments}/>
                    <CommentsUserInput user={user} post={post} />
                </KeyboardAvoidingView>
                
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    
})

export default Comments;
