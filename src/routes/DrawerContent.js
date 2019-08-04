import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { SafeAreaView, DrawerItems } from 'react-navigation';
import { Avatar } from 'react-native-paper';
import { auth } from '../firebase';

const DrawerContent = props => {
  const user = auth().currentUser;
  return (
    <ScrollView>
      <SafeAreaView
        style={styles.container}
        forceInset={{ top: 'always', horizontal: 'never' }}
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
        <DrawerItems {...props} />
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
