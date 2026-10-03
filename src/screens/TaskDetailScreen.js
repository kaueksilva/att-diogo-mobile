import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { AuthContext } from '../context/AuthContext';
import { styles } from '../styles/TaskDetailStyles';

const TaskDetailScreen = ({ route, navigation }) => {
  const { user } = useContext(AuthContext);
  const existingTask = route.params?.task || null;

  const [title, setTitle] = useState(existingTask ? existingTask.title : '');
  const [description, setDescription] = useState(existingTask ? existingTask.description : '');
  const [location, setLocation] = useState(existingTask ? existingTask.location : null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const saveTask = async () => {
    if (!title) {
      Alert.alert('Erro', 'O título da tarefa é obrigatório.');
      return;
    }

    try {
      const storedTasksStr = await AsyncStorage.getItem('tasks_' + user.email);
      let tasks = storedTasksStr ? JSON.parse(storedTasksStr) : [];

      if (existingTask) {
        // Update
        tasks = tasks.map(t => {
          if (t.id === existingTask.id) {
            return { ...t, title, description, location };
          }
          return t;
        });
      } else {
        // Create
        const newTask = {
          id: Date.now().toString(),
          title,
          description,
          location,
          createdAt: new Date().toISOString()
        };
        tasks.push(newTask);
      }

      await AsyncStorage.setItem('tasks_' + user.email, JSON.stringify(tasks));
      navigation.goBack();
    } catch (e) {
      console.log('Error saving task', e);
      Alert.alert('Erro', 'Não foi possível salvar a tarefa.');
    }
  };

  const getLocation = async () => {
    setIsLoadingLocation(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Precisamos da permissão de localização para anexar a localização à tarefa.');
        setIsLoadingLocation(false);
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude
      });
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível obter a localização.');
    } finally {
      setIsLoadingLocation(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{existingTask ? 'Editar Tarefa' : 'Nova Tarefa'}</Text>
        <View style={{width: 60}} />
      </View>

      <ScrollView style={styles.formContainer}>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Comprar leite"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Detalhes da tarefa..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Localização (Recurso Nativo)</Text>
        <View style={styles.locationContainer}>
          {location ? (
            <Text style={styles.locationText}>
              Lat: {location.latitude.toFixed(4)}, Lon: {location.longitude.toFixed(4)}
            </Text>
          ) : (
            <Text style={styles.locationText}>Nenhuma localização anexada</Text>
          )}
          <TouchableOpacity 
            style={styles.locationBtn} 
            onPress={getLocation}
            disabled={isLoadingLocation}
          >
            <Text style={styles.locationBtnText}>
              {isLoadingLocation ? 'Buscando...' : 'Capturar GPS'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={saveTask}>
          <Text style={styles.saveBtnText}>Salvar Tarefa</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};


export default TaskDetailScreen;
