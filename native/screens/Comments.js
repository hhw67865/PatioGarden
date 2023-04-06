import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import { url } from '../constants/localhost';
import CommentCard from '../components/CommentCard';
import { COLORS } from '../constants/theme';
import { pixelRatio } from '../constants/pixelRatio';

const Comments = ({route}) => {

    const { post } = route.params;
    const [comments, setComments] = useState([])

    useEffect(()=>{
        fetch(`${url}/api/posts/${post.id}/comments`)
        .then(r=>r.json())
        .then(setComments)
    },[])

    return (
        <SafeAreaView backgroundColor={COLORS.primary} style={{
            flex:1    
          }}>            
            <ScrollView bounces style={{padding: pixelRatio(4)}}>
                {comments.map((comment,i)=><CommentCard key={i} comment={comment} />)}
                
                <View style={{marginBottom: pixelRatio(6)}}/>
            </ScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default Comments;
