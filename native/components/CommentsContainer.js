import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import { pixelRatio } from '../constants/pixelRatio';
import CommentCard from './CommentCard';



const CommentsContainer = ({comments}) => {
    return (
        <ScrollView bounces style={{padding: pixelRatio(4)}}>
            {comments.map((comment,i)=><CommentCard key={i} comment={comment} />)}
            
            <View style={{marginBottom: pixelRatio(6)}}/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({})

export default CommentsContainer;
