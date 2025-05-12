// src/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importando os ícones

export default function HomeScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [username, setUsername] = useState('');
  const [editNoteModalVisible, setEditNoteModalVisible] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState('');
  const [noteIndexToEdit, setNoteIndexToEdit] = useState(null);

  useEffect(() => {
    const loadNotes = async () => {
      const sessionUser = await AsyncStorage.getItem('@session_user');
      if (!sessionUser) {
        navigation.navigate('Login');
        return;
      }

      setUsername(sessionUser);

      const users = await AsyncStorage.getItem('@users');
      const parsedUsers = users ? JSON.parse(users) : [];

      const user = parsedUsers.find(u => u.username === sessionUser);
      setNotes(user?.notes || []);
    };

    loadNotes();
  }, []);

  const handleAddNote = async () => {
    if (newNote.trim() === '') return;

    const users = await AsyncStorage.getItem('@users');
    const parsedUsers = users ? JSON.parse(users) : [];

    const userIndex = parsedUsers.findIndex(u => u.username === username);
    if (userIndex === -1) return;

    parsedUsers[userIndex].notes.push(newNote);
    await AsyncStorage.setItem('@users', JSON.stringify(parsedUsers));

    setNotes([...notes, newNote]);
    setNewNote('');
  };

  const handleDeleteNote = async (index) => {
    const users = await AsyncStorage.getItem('@users');
    const parsedUsers = users ? JSON.parse(users) : [];

    const userIndex = parsedUsers.findIndex(u => u.username === username);
    if (userIndex === -1) return;

    parsedUsers[userIndex].notes.splice(index, 1);
    await AsyncStorage.setItem('@users', JSON.stringify(parsedUsers));

    setNotes(parsedUsers[userIndex].notes);
  };

  const handleEditNote = async () => {
    if (noteToEdit.trim() === '') return;

    const users = await AsyncStorage.getItem('@users');
    const parsedUsers = users ? JSON.parse(users) : [];

    const userIndex = parsedUsers.findIndex(u => u.username === username);
    if (userIndex === -1) return;

    parsedUsers[userIndex].notes[noteIndexToEdit] = noteToEdit;
    await AsyncStorage.setItem('@users', JSON.stringify(parsedUsers));

    setNotes(parsedUsers[userIndex].notes);
    setEditNoteModalVisible(false);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('@session_user');
    navigation.navigate('Login');
  };

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Minhas Anotações</Text>

      <FlatList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{ padding: 10, borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ flex: 1 }}>{item}</Text>
            <TouchableOpacity onPress={() => {
              setNoteToEdit(item);
              setNoteIndexToEdit(index);
              setEditNoteModalVisible(true);
            }}>
              <Icon name="edit" size={20} color="blue" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteNote(index)}>
              <Icon name="trash" size={20} color="red" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          </View>
        )}
        style={{ marginBottom: 20 }}
      />

      <TextInput
        placeholder="Nova anotação"
        value={newNote}
        onChangeText={setNewNote}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <Button title="Adicionar Anotação" onPress={handleAddNote} />
      <View style={{ marginTop: 20 }}>
        <Button title="Sair" onPress={handleLogout} color="red" />
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editNoteModalVisible}
        onRequestClose={() => setEditNoteModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Editar Anotação</Text>
            <TextInput
              value={noteToEdit}
              onChangeText={setNoteToEdit}
              style={{ borderWidth: 1, padding: 8, marginBottom: 20 }}
            />
            <Button title="Salvar" onPress={handleEditNote} />
            <Button title="Cancelar" onPress={() => setEditNoteModalVisible(false)} color="red" />
          </View>
        </View>
      </Modal>
    </View>
  );
}
