import React from 'react';
import {View, StyleSheet, ScrollView,Keyboard, TouchableWithoutFeedback} from 'react-native';
import { pixelRatio } from '../constants/pixelRatio';
import CommentCard from './CommentCard';



const CommentsContainer = ({comments}) => {
    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <ScrollView bounces style={{padding: pixelRatio(4), maxHeight:"93%"}}>
                {comments.map((comment,i)=><CommentCard key={i} comment={comment} />)}
                
                <View style={{marginBottom: pixelRatio(6)}}/>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({})

export default CommentsContainer;
