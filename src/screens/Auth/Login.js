import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Card, TextInput, Button } from 'react-native-paper';

const Login = ({ params }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
            onPress={() => {}}
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
