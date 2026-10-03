import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
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
  const [titleError, setTitleError] = useState('');

  const saveTask = async () => {
    if (!title || title.trim().length === 0) {
      setTitleError('O título da tarefa é obrigatório');
      return;
    }
    setTitleError('');

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
          <MaterialIcons name="arrow-back-ios" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{existingTask ? 'Editar Tarefa' : 'Nova Tarefa'}</Text>
        <View style={{width: 40}} />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
      >
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Text style={styles.label}>Título da Tarefa</Text>
          <TextInput
            style={[styles.input, titleError && styles.inputError]}
            placeholder="Ex: Comprar leite"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#9CA3AF"
          />
          {titleError ? <Text style={styles.errorText}>{titleError}</Text> : null}

          <Text style={styles.label}>Descrição (Opcional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Detalhes da tarefa..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            placeholderTextColor="#9CA3AF"
          />

          <Text style={styles.label}>Localização da Tarefa</Text>
          <View style={styles.locationContainer}>
            {location ? (
              <Text style={styles.locationText}>
                📍 Lat: {location.latitude.toFixed(4)}{'\n'}   Lon: {location.longitude.toFixed(4)}
              </Text>
            ) : (
              <Text style={styles.locationText}>Nenhuma localização anexada a esta tarefa.</Text>
            )}
            <TouchableOpacity 
              style={[styles.locationBtn, location && {backgroundColor: '#EF4444'}]} 
              onPress={location ? () => setLocation(null) : getLocation}
              disabled={isLoadingLocation}
            >
              <MaterialIcons name={location ? "location-off" : "my-location"} size={18} color="#FFFFFF" />
              <Text style={styles.locationBtnText}>
                {isLoadingLocation ? 'Buscando...' : (location ? 'Remover' : 'Capturar')}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.saveBtn} onPress={saveTask} activeOpacity={0.8}>
            <MaterialIcons name="save" size={24} color="#FFFFFF" />
            <Text style={styles.saveBtnText}>Salvar Tarefa</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};


export default TaskDetailScreen;
