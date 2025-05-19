import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons'; // <- ícone do olhinho

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const users = await AsyncStorage.getItem('@users');
      const parsedUsers = users ? JSON.parse(users) : [];

      const foundUser = parsedUsers.find(
        user => user.username.trim() === username.trim()
      );

      if (foundUser && foundUser.password === password) {
        await AsyncStorage.setItem('@session_user', username.trim());
        setErrorMessage('');
        navigation.navigate('Home');
      } else {
        setErrorMessage('Usuário ou senha incorretos!');
        Alert.alert('Erro', 'Usuário ou senha incorretos!');
      }
    } catch (error) {
      setErrorMessage('Erro ao tentar fazer login!');
    }
  };

return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <TextInput
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={styles.passwordInput}
        />
        <View style={styles.eyeContainer}>
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color="#3498db"
            />
          </TouchableOpacity>
        </View>
      </View>

      <Button title="Entrar" onPress={handleLogin} />
      <Button title="Registrar" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, marginBottom: 10 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8 },
  error: { color: 'red', marginBottom: 10 },

  passwordContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 8,
    paddingLeft: 10
  },
  eyeContainer: {
    paddingLeft: 5,
    paddingRight: 4,
    justifyContent: 'center',
    alignItems: 'center',
},
  error: {
    color: '#E53935',
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 14
  }
});
