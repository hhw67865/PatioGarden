import React, {useEffect, useState} from 'react';
import {View, KeyboardAvoidingView, StyleSheet, SafeAreaView,TouchableWithoutFeedback, TextInput} from 'react-native';
import { url } from '../constants/localhost';
import CommentCard from '../components/CommentCard';
import { COLORS } from '../constants/theme';
import { pixelRatio } from '../constants/pixelRatio';
import { Icon } from '@rneui/base';
import CommentsContainer from '../components/CommentsContainer';
import CommentsUserInput from '../components/CommentsUserInput';
import useUser from '../hooks/UserProvider';

const EditProfile = () => {

    const {user} = useUser()

    return (
        <SafeAreaView backgroundColor={COLORS.primary} style={{
            flex:1    
        }}>
            <KeyboardAvoidingView
                behavior="padding"
                style={{flexGrow:1}}                              
            >            
                
            </KeyboardAvoidingView>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default EditProfile;
