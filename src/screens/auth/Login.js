import React, { useState } from 'react';
import firebase from 'react-native-firebase';
import Toast from 'react-native-simple-toast';
import { GoogleSignin } from 'react-native-google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import { Card, TextInput, Button, IconButton } from 'react-native-paper';

import AuthLayout from '../../layouts/AuthLayout';
import { loginWithEmailAsync, addUserDetail } from '../../firebase/auth';
import Row from '../../components/Row';
import Colors from '../../configs/colors';

const Login = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const enterPassword = React.createRef();

  const loginWithEmail = async () => {
    try {
      setLoading(true);

      await loginWithEmailAsync(email, password);
      navigation.navigate('Activity');
    } catch (error) {
      Toast.show(error.message);
    } finally {
      setLoading(false);
    }
  };
  const loginWithFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
      ]);

      if (result.isCancelled) {
        throw new Error('User cancelled request');
      }

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw new Error(
          'Something went wrong obtaining the users access token',
        );
      }

      const credential = firebase.auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      // Nont sure why this is here and not in the auth file inside firebase, adding the addUser function here, please migrate that function too if you ever change it to auth module
      await firebase.auth().signInWithCredential(credential);
      await addUserDetail();
      navigation.navigate('Activity');
    } catch (e) {
      console.error(e);
    }
  };

  const loginWithGoogle = async () => {
    try {
      await GoogleSignin.configure();
      await GoogleSignin.signIn();
      const tokenData = await GoogleSignin.getTokens();

      const credential = firebase.auth.GoogleAuthProvider.credential(
        tokenData.idToken,
        tokenData.accessToken,
      );
      // Same thing, we can use signInWithCredntial function from module for both fb and google
      await firebase.auth().signInWithCredential(credential);
      await addUserDetail();

      navigation.navigate('Activity');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthLayout>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      >
        <Card elevation={2} style={{ margin: 16 }}>
          <Card.Content>
            <Text style={styles.titleText}>Login</Text>
            <TextInput
              label="Email"
              mode="outlined"
              returnKeyType="next"
              style={styles.inputText}
              value={email}
              autoCapitalize="none"
              onChangeText={text => setEmail(text)}
              onSubmitEditing={() => enterPassword.current.focus()}
            />
            <TextInput
              ref={enterPassword}
              label="Password"
              mode="outlined"
              value={password}
              secureTextEntry
              onChangeText={text => setPassword(text)}
              style={styles.inputText}
              onSubmitEditing={loginWithEmail}
            />
            <Button
              dark
              mode="contained"
              loading={loading}
              onPress={loginWithEmail}
              style={styles.button}
            >
              Log In
            </Button>
            <View style={styles.socialContainer}>
              <Text>OR</Text>
              <Text
                onPress={() => navigation.navigate('Register')}
                style={styles.clickableText}
              >
                Don't have an account ? Sign Up.
              </Text>
              <Row style={{ marginTop: 16 }}>
                <IconButton
                  icon="facebook"
                  size={24}
                  color={Colors.white}
                  style={{ backgroundColor: Colors.facebook }}
                  onPress={loginWithFacebook}
                />
                <IconButton
                  icon="google"
                  size={24}
                  color={Colors.white}
                  style={{ backgroundColor: Colors.google }}
                  onPress={loginWithGoogle}
                />
              </Row>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  titleText: {
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center',
  },
  button: {
    marginTop: 16,
    paddingVertical: 5,
  },
  inputText: {
    marginTop: 8,
  },
  clickableText: {
    marginTop: 16,
    textDecorationLine: 'underline',
  },
  socialContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
});

export default Login;
