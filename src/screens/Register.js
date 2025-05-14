import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
  const trimmedUsername = username.trim();
  const trimmedPassword = password.trim();

  if (!trimmedUsername || !trimmedPassword) {
    Alert.alert('Erro', 'Preencha todos os campos!');
    return;
  }

  try {
    const users = await AsyncStorage.getItem('@users');
    const parsedUsers = users ? JSON.parse(users) : [];

    const userExists = parsedUsers.some(user => user.username === trimmedUsername);

    if (userExists) {
      Alert.alert('Erro', 'Usuário já existe!');
      return;
    }

    const newUser = { username: trimmedUsername, password: trimmedPassword, notes: [] };
    const updatedUsers = [...parsedUsers, newUser];

    await AsyncStorage.setItem('@users', JSON.stringify(updatedUsers));
    await AsyncStorage.setItem('@session_user', trimmedUsername);

    navigation.navigate('Home');
  } catch (error) {
    Alert.alert('Erro ao registrar usuário');
  }
};

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Registrar</Text>
      <TextInput
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <Button title="Registrar" onPress={handleRegister} />
    </View>
  );
}
