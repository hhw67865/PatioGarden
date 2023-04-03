import { View, ScrollView, SafeAreaView, StyleSheet } from 'react-native'
import { url } from '../constants/localhost';
import { useState, useEffect } from 'react';

import useUser from '../hooks/UserProvider'
import { COLORS } from '../constants/theme'
import { pixelRatio } from '../constants/pixelRatio';
import ProfileBanner from '../components/ProfileBanner';
import ProfileInformation from '../components/ProfileInformation';
import ProfileStats from '../components/ProfileStats'
import ProfileDescription from '../components/ProfileDescription'
import ProfileRepertoire from '../components/ProfileRepertoire'
import ProfilePosts from '../components/ProfilePosts'

const Account = () => {

  const {user, setUser, update} = useUser()
  const [userPosts, setUserPosts] = useState([])

  useEffect(() => {
    fetch(`${url}/api/users/${user.username}/posts`)
    .then(r=>r.json())
    .then(setUserPosts)
  }, [update]);

  
  if (user===null){
    return null
  }

  return (
    <SafeAreaView backgroundColor={COLORS.primary} style={{
        flex:1    
      }}>
        <ScrollView bounces style={{padding: pixelRatio(7)}}>
          
          <ProfileBanner user={user} setUser={setUser}/>
          <ProfileInformation user={user}/>
          <ProfileStats user={user}/>
          <ProfileDescription user={user}/>
          <ProfileRepertoire user={user}/>        
          <ProfilePosts user={user} userPosts={userPosts}/>
          <View style={{marginBottom: pixelRatio(10)}}/>             
        </ScrollView>  
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
 
  
})

export default Account