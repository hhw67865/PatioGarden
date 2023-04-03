import React from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import { url } from '../constants/localhost';

const Comments = ({route}) => {

    const { post } = route.params;

    useEffect(()=>{
        fetch(`${url}}/api/posts/${post.id}/comments`)
        .then(r=>r.json())
        .then(setComments)
    },[])

    return (
        <SafeAreaView style={{
            flex:1    
          }}>
            <Text>This is Comments {post.id}</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default Comments;
