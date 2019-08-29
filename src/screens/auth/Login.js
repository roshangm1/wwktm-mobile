import { Text } from 'react-native';
import React, { useState } from 'react';
import { Card, TextInput, Button } from 'react-native-paper';

import AuthLayout from '../../layouts/AuthLayout';
import { loginWithEmailAsync } from '../../firebase/auth';

const Login = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
          <Text
            style={{ fontWeight: 'bold', fontSize: 18, alignSelf: 'center' }}
          >
            Login
          </Text>
          <TextInput
            label="Email"
            mode="outlined"
            style={{ marginTop: 8 }}
            value={email}
            autoCapitalize="none"
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            label="Password"
            mode="outlined"
            value={password}
            secureTextEntry
            onChangeText={text => setPassword(text)}
            style={{ marginTop: 8 }}
          />
          <Button
            dark
            mode="contained"
            loading={loading}
            onPress={loginWithEmail}
            style={{ marginTop: 16 }}
          >
            Log In
          </Button>
          <Text
            onPress={() => navigation.navigate('Register')}
            style={{
              textAlign: 'center',
              marginTop: 16,
              textDecorationLine: 'underline',
            }}
          >
            Don't have an account ? Sign Up.
          </Text>
        </Card.Content>
      </Card>
    </AuthLayout>
  );
};

export default Login;
