import { ScrollView, Text, View, SafeAreaView, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { Avatar } from '@rneui/themed';
import { Image } from '@rneui/themed'
import { Icon, Overlay, Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';


import { useState } from 'react'
import useUser from '../hooks/UserProvider'
import { COLORS } from '../constants/theme'
import { url } from '../constants/localhost';
import { pixelRatio } from '../constants/pixelRatio';
import ProfilePlantCard from '../components/ProfilePlantCard';

const Account = () => {

  const {user, setUser} = useUser()
  const [visible, setVisible] = useState(false)
  let navigation = useNavigation()


  const toggleOverlay = () => {
    setVisible(!visible)
  }

  const handleLogout = () => {
    fetch(`${url}/api/logout`, {
      method:"DELETE"
    })
    .then(r=>{
      if (r.ok) {
          setUser(null)         
      }
    })
  }
  
  if (user===null){
    return null
  }

  return (
    <SafeAreaView backgroundColor={COLORS.primary} style={{
        flex:1,       
      }}>
        <ScrollView style={{padding: pixelRatio(7)}}>
          <View style={{flexDirection: 'row', marginBottom: pixelRatio(7)}}>
            <Text style={{
                  fontFamily: "SansBold",
                  fontSize: pixelRatio(7),              
                  flexGrow:1
                }}>
                  @{user.username}
            </Text>
            <Icon
                name='menu-outline'
                type='ionicon'
                onPress={toggleOverlay}
            />
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}
              
              overlayStyle={{
                position:"absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "70%",
                
                borderRadius: 30
              }}
              >
                <Button title="Logout" type="clear" onPress={handleLogout}/>
            </Overlay>
          </View>
          
          <View style={styles.pictureContainer}>
            <Avatar
              size={100}
              rounded
              source={{ uri: user.image_url?user.image_url.replace("http://localhost:3000", url):"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }}
            />
            <View style={styles.descriptionContainer}>
              
              <Text style={styles.descriptionText}>
                {user.name}
              </Text>
              <Text style={styles.descriptionText}>
                {user.skill_level} Gardener
              </Text>
              <Text style={styles.descriptionText}>
                {user.location.name}
              </Text>       
            </View>                     
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.stats}>
              <Text style={styles.number}>{user.posts.length}</Text>
              <Text>POSTS</Text>
            </View>
            <View style={styles.stats}>
              <Text style={styles.number}>{user.followers.length}</Text>
              <Text>FOLLOWERS</Text>
            </View>
            <View style={styles.stats}>
              <Text style={styles.number}>{user.following.length}</Text>
              <Text>FOLLOWING</Text>
            </View>

          </View>

          <Text style={{
            fontFamily: "SansSemiBoldItalic",
            fontSize: pixelRatio(5),
            textAlign:"center",
            paddingVertical: pixelRatio(4)                
          }}>
            "{user.description}"
          </Text>
          <Text style={{
            fontFamily: "SansSemiBold",
            fontSize: pixelRatio(7),
            textAlign:"center",
            paddingVertical: pixelRatio(4),
          }}>
            - {user.username}'s Garden Repertoire -
          </Text>
          <ScrollView horizontal>
            {user.plants.map((plant, i)=><ProfilePlantCard key={i} plant={plant}/>)}
          </ScrollView>       
        </ScrollView>  
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  pictureContainer: {    
    flexDirection: 'row',
    paddingBottom: pixelRatio(7)
  },
  descriptionContainer: {
    marginLeft: pixelRatio(5),
    flex:1
    
  },
  descriptionText: {
    fontFamily: "SansRegular",
    fontSize: pixelRatio(5),
     
  },
  statsContainer: {    
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems:"center",      
  },
  stats: {
    alignItems:"center",
    width:"33%"
  },
  number: {
    fontFamily: "SansBold",
    fontSize: pixelRatio(8),
  }
})

export default Account