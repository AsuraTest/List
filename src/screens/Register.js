import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Register({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      setErrorMessage('Preencha todos os campos!');
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    try {
      const users = await AsyncStorage.getItem('@users');
      const parsedUsers = users ? JSON.parse(users) : [];

      const userExists = parsedUsers.some(user => user.username === trimmedUsername);

      if (userExists) {
        setErrorMessage('Usuário já existe!');
        Alert.alert('Erro', 'Usuário já existe!');
        return;
      }

      const newUser = {
        username: trimmedUsername,
        password: trimmedPassword,
        notes: [],
      };
      const updatedUsers = [...parsedUsers, newUser];

      await AsyncStorage.setItem('@users', JSON.stringify(updatedUsers));
      await AsyncStorage.setItem('@session_user', trimmedUsername);

      setErrorMessage('');
      navigation.navigate('Home');
    } catch (error) {
      setErrorMessage('Erro ao registrar usuário!');
      Alert.alert('Erro', 'Erro ao registrar usuário!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar</Text>

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <TextInput
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button title="Registrar" onPress={handleRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, marginBottom: 10 },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 8,
    paddingLeft: 10
  },
  eyeButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  error: {
    color: '#E53935',
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 14
  }
});
