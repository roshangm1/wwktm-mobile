import React, { useState } from 'react';
import firebase from 'react-native-firebase';
import Toast from 'react-native-simple-toast';
import { GoogleSignin } from 'react-native-google-signin';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { Card, TextInput, Button, IconButton } from 'react-native-paper';

import AuthLayout from '../../layouts/AuthLayout';
import { loginWithEmailAsync, addUserDetail } from '../../firebase/auth';
import Row from '../../components/Row';
import Colors from '../../configs/colors';
import Spinner from '../../components/Spinner';

const Login = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);
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
    setSocialLoading(true);
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        return;
      }

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        Alert.alert(
          'Error',
          'Something went wrong obtaining the users access token',
        );
      }

      const credential = firebase.auth.FacebookAuthProvider.credential(
        data.accessToken,
      );

      // TODO: Move these tasks to auth.js
      try {
        await firebase.auth().signInWithCredential(credential);
        await addUserDetail();
        navigation.navigate('Activity');
      } catch (error) {
        if (error.code === 'auth/account-exists-with-different-credential') {
          const graphResponse = await fetch(
            `https://graph.facebook.com/v2.12/me?fields=name,first_name,last_name,email&access_token=${credential.token}`,
          );
          const profileData = await graphResponse.json();
          const { email } = profileData;

          const providers = await firebase
            .auth()
            .fetchSignInMethodsForEmail(email);
          Alert.alert(
            'Error',
            `This email is already used in a different account, try logging in with ${
              providers[0]
            } to gain the access.`,
          );
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSocialLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setSocialLoading(true);

    try {
      await GoogleSignin.configure();
      const result = await GoogleSignin.signIn();
      const tokenData = await GoogleSignin.getTokens();
      console.log(result);

      const credential = firebase.auth.GoogleAuthProvider.credential(
        tokenData.idToken,
        tokenData.accessToken,
      );
      try {
        // TODO: Move these tasks to auth.js
        await firebase.auth().signInWithCredential(credential);
      } catch (error) {
        if (error.code === 'auth/account-exists-with-different-credential') {
          console.log(result);
        }
      }
      await addUserDetail();

      navigation.navigate('Activity');
    } catch (e) {
    } finally {
      setSocialLoading(false);
    }
  };

  return (
    <AuthLayout>
      {socialLoading && <Spinner />}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      >
        <KeyboardAvoidingView behavior="padding">
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
                autoCapitalize="none"
              />
              <Button
                dark
                mode="contained"
                loading={loading}
                disabled={loading}
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
        </KeyboardAvoidingView>
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
