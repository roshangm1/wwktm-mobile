import React, { useState } from 'react';
import { Avatar, Drawer, Divider } from 'react-native-paper';
import { SafeAreaView, DrawerItems } from 'react-navigation';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { auth } from '../firebase';

const DrawerContent = props => {
  const user = auth().currentUser;
  const [active, setActive] = useState('activity');

  const handleDrawerItemPress = route => {
    props.navigation.navigate(route);
    setActive(route.toLowerCase());
  };

  return (
    <ScrollView>
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: 0, horizontal: 'never' }}
      >
        <View
          style={{
            height: 200,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ecece9',
          }}
        >
          <Avatar.Image size={80} style={{ marginBottom: 8 }} />
          <Text>{user.displayName || 'Roshan Gautam'}</Text>
          <Text>{user.email}</Text>
        </View>
        <Drawer.Item
          label="Activity"
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
          label="About"
          icon="information"
          active={active === 'About'}
          onPress={() => handleDrawerItemPress('About')}
        />
        <Drawer.Item
          label="Settings"
          icon="settings"
          active={active === 'Settings'}
          onPress={() => handleDrawerItemPress('Settings')}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DrawerContent;
