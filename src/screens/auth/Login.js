import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card, TextInput, Button } from 'react-native-paper';
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
    navigation.navigate('Home');
  };

  return (
    <View style={styles.rootContainer}>
      <Card elevation={2} style={{ margin: 16 }}>
        <Card.Content>
          <Text style={styles.titleText}>Login</Text>
          <TextInput
            label="Email"
            mode="outlined"
            style={styles.inputText}
            value={email}
            autoCapitalize="none"
            returnKeyType="next"
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
        </Card.Content>
      </Card>
    </View>
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
});

export default Login;
