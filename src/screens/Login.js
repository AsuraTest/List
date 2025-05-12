import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const users = await AsyncStorage.getItem('@users');
      const parsedUsers = users ? JSON.parse(users) : [];

      const foundUser = parsedUsers.find(user => user.username === username);

      if (foundUser && foundUser.password === password) {
        await AsyncStorage.setItem('@session_user', username);
        navigation.navigate('Home');
      } else {
        Alert.alert('Erro', 'Usuário ou senha incorretos!');
      }
    } catch (error) {
      Alert.alert('Erro ao fazer login');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Login</Text>
      <TextInput
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10, padding: 5 }}
      />
      <Button title="Entrar" onPress={handleLogin} />
      <Button
        title="Registrar"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
}
