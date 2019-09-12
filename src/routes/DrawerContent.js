import { auth } from '../firebase';
import React, { useState } from 'react';
import Colors from './../configs/colors';
import { SafeAreaView } from 'react-navigation';
import { getNameInitials } from './../utils/string';
import { Avatar, Drawer, Divider } from 'react-native-paper';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Alert,
  ImageBackground,
} from 'react-native';
import { logout } from '../firebase/auth';

const DrawerContent = props => {
  const user = auth().currentUser;

  const [active, setActive] = useState('activity');

  const handleDrawerItemPress = route => {
    props.navigation.navigate(route);
    setActive(route.toLowerCase());
  };

  const logoutUser = () => {
    logout();
    props.navigation.navigate('AuthStack');
  };

  return (
    <ScrollView>
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: 0, horizontal: 'never' }}
      >
        <View>
          <ImageBackground
            source={require('../assets/images/wwktm.jpeg')}
            style={styles.topContainer}
          >
            {user.photoURL ? (
              <Avatar.Image
                size={80}
                source={{ uri: user.photoURL }}
                style={{ marginBottom: 8, backgroundColor: Colors.secondary }}
              />
            ) : (
              <Avatar.Text
                size={80}
                color={Colors.white}
                label={getNameInitials(user.displayName)}
                style={{ marginBottom: 8 }}
              />
            )}
            <Text style={styles.headerText}>
              {user.displayName || 'Roshan Gautam'}
            </Text>
            <Text style={styles.headerText}>{user.email}</Text>
          </ImageBackground>

          <Drawer.Item
            label="Activity Stream"
            icon="wifi"
            active={active === 'activity'}
            onPress={() => handleDrawerItemPress('Activity')}
          />
          <Drawer.Item
            label="Speakers"
            icon="account"
            active={active === 'speakers'}
            onPress={() => handleDrawerItemPress('Speakers')}
          />
          <Drawer.Item
            label="Schedule"
            icon="clock-outline"
            active={active === 'schedule'}
            onPress={() => handleDrawerItemPress('Schedule')}
          />
          <Divider style={{ height: 1 }} />
          <Drawer.Item
            label="QNAs"
            icon="lock-question"
            active={active === 'questions'}
            onPress={() => handleDrawerItemPress('Questions')}
          />
          <Drawer.Item
            label="Notes"
            icon="note-multiple-outline"
            active={active === 'notes'}
            onPress={() => handleDrawerItemPress('Notes')}
          />
          <Drawer.Item
            label="Favourite Talks"
            icon="star"
            active={active === 'favourites'}
            onPress={() => handleDrawerItemPress('Favourites')}
          />
          <Divider style={{ height: 1 }} />
          <Drawer.Item
            label="Map"
            icon="map"
            active={active === 'map'}
            onPress={() => handleDrawerItemPress('Map')}
          />
          <Drawer.Item
            label="About"
            icon="information"
            active={active === 'about'}
            onPress={() => handleDrawerItemPress('About')}
          />
          <Drawer.Item
            label="Logout"
            icon="logout"
            active={active === 'logout'}
            onPress={() => {
              Alert.alert('Log out', 'Are you sure you want to logout ?', [
                { text: 'No' },

                { text: 'Yes', onPress: () => logoutUser() },
              ]);
            }}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },

  topContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecece9',
  },
  headerText: {
    color: Colors.white,
    fontWeight: 'bold',
  },
});

export default DrawerContent;
