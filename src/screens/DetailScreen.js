import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DetailScreen({ navigation }) {
  const [note, setNote] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const loadNoteDetails = async () => {
      const sessionUser = await AsyncStorage.getItem('@session_user');
      if (!sessionUser) {
        navigation.navigate('Login');
        return;
      }

      setUsername(sessionUser);

      const users = await AsyncStorage.getItem('@users');
      const parsedUsers = users ? JSON.parse(users) : [];

      const user = parsedUsers.find(u => u.username === sessionUser);

      const noteIndex = await AsyncStorage.getItem('@note_index');
      const index = parseInt(noteIndex, 10);

      if (user && index >= 0 && index < user.notes.length) {
        setNote(user.notes[index]);
      } else {
        Alert.alert('Erro', 'Anotação não encontrada');
        navigation.navigate('Home');
      }
    };

    loadNoteDetails();
  }, [navigation]);

  const handleDeleteNote = async () => {
    const users = await AsyncStorage.getItem('@users');
    const parsedUsers = users ? JSON.parse(users) : [];

    const userIndex = parsedUsers.findIndex(u => u.username === username);
    if (userIndex === -1) return;

    const noteIndex = await AsyncStorage.getItem('@note_index');
    const index = parseInt(noteIndex, 10);

    if (index >= 0 && index < parsedUsers[userIndex].notes.length) {
      parsedUsers[userIndex].notes.splice(index, 1);
      await AsyncStorage.setItem('@users', JSON.stringify(parsedUsers));
      navigation.navigate('Home');
    } else {
      Alert.alert('Erro', 'Não foi possível excluir a anotação');
    }
  };

  if (!note) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Detalhes da Anotação</Text>
      <Text style={{ marginBottom: 20 }}>{note}</Text>

      <Button title="Excluir Anotação" onPress={handleDeleteNote} color="red" />
      <Button
        title="Voltar"
        onPress={() => navigation.navigate('Home')}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}
