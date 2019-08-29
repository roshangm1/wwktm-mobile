import { Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Card, TextInput, Button } from 'react-native-paper';

import AuthLayout from '../../layouts/AuthLayout';
import { loginWithEmailAsync } from '../../firebase/auth';

const Login = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const enterPassword = React.createRef();

  const loginWithEmail = async () => {
    setLoading(true);
    await loginWithEmailAsync(email, password);
    setLoading(false);
    navigation.navigate('Activity');
  };

  return (
    <AuthLayout>
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
          <Text
            onPress={() => navigation.navigate('Register')}
            style={styles.clickableText}
          >
            Don't have an account ? Sign Up.
          </Text>
        </Card.Content>
      </Card>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
  },
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
    textAlign: 'center',
    marginTop: 16,
    textDecorationLine: 'underline',
  },
});

export default Login;
