import React, { useState } from 'react';
import Toast from 'react-native-simple-toast';
import { Text, ScrollView } from 'react-native';
import { Button, TextInput, Card } from 'react-native-paper';

import AuthLayout from '../../layouts/AuthLayout';
import { signupWithEmail } from '../../firebase/auth';

const Register = ({ navigation }) => {
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const handleInputChange = (name, text) => {
    setSignupData({ ...signupData, [name]: text });
  };

  const signupUser = async () => {
    try {
      setLoading(true);
      await signupWithEmail(signupData);
      navigation.navigate('Activity');
    } catch (error) {
      Toast.show(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthLayout>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      >
        <Card elevation={2} style={{ margin: 16 }}>
          <Card.Content>
            <Text
              style={{ fontWeight: 'bold', fontSize: 18, alignSelf: 'center' }}
            >
              Sign Up
            </Text>
            <TextInput
              label="Name"
              mode="outlined"
              style={{ marginTop: 8 }}
              value={signupData.name}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={text => handleInputChange('name', text)}
            />
            <TextInput
              label="Email"
              mode="outlined"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={signupData.email}
              onChangeText={text => handleInputChange('email', text)}
              style={{ marginTop: 8 }}
            />
            <TextInput
              label="Password"
              mode="outlined"
              value={signupData.password}
              secureTextEntry
              onChangeText={text => handleInputChange('password', text)}
              style={{ marginTop: 8 }}
            />
            <Button
              dark
              mode="contained"
              loading={loading}
              onPress={signupUser}
              style={{ marginTop: 16 }}
            >
              Sign Up
            </Button>
            <Text
              onPress={() => navigation.navigate('Login')}
              style={{
                textAlign: 'center',
                marginTop: 16,
                textDecorationLine: 'underline',
              }}
            >
              Already have an account ? Sign In.
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </AuthLayout>
  );
};

export default Register;
