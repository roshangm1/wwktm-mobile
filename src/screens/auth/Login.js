import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Card, TextInput, Button } from 'react-native-paper';
import { loginWithEmailAsync } from '../../firebase/auth';

const Login = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginWithEmail = async () => {
    setLoading(true);
    await loginWithEmailAsync(email, password);
    setLoading(false);
    navigation.navigate('Home');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
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
        </Card.Content>
      </Card>
    </View>
  );
};

export default Login;
