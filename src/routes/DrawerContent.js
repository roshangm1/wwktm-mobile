import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { SafeAreaView, DrawerItems } from 'react-navigation';
import { Avatar } from 'react-native-paper';

import { auth } from '../firebase';
import { logout } from '../firebase/auth';

const DrawerContent = props => {
  const user = auth().currentUser;
  const logoutUser = () => {
    logout();
    props.navigation.navigate('AuthStack');
  };
  return (
    <ScrollView contentContainerStyle={styles.rootContainer}>
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: 'always', horizontal: 'never' }}
      >
        <View>
          <View style={styles.topContainer}>
            <Avatar.Image size={80} style={{ marginBottom: 8 }} />
            <Text>{user.displayName || 'Roshan Gautam'}</Text>
            <Text>{user.email}</Text>
          </View>
          <DrawerItems {...props} />
        </View>
        <Text onPress={logoutUser} style={styles.logoutText}>
          Logout
        </Text>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  logoutText: {
    fontSize: 15,
    color: '#223741',
    padding: 20,
    fontWeight: 'bold',
  },
  topContainer: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecece9',
  },
  rootContainer: {
    flexGrow: 1,
  },
});

export default DrawerContent;
