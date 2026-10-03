import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { styles } from '../styles/HomeStyles';

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(AuthContext);
  const isFocused = useIsFocused();

  const loadTasks = useCallback(async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks_' + user.email);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (e) {
      console.log('Error loading tasks', e);
    }
  }, [user.email]);

  useEffect(() => {
    if (isFocused) {
      loadTasks();
    }
  }, [isFocused, loadTasks]);

  const deleteTask = async (id) => {
    try {
      const updatedTasks = tasks.filter(task => task.id !== id);
      await AsyncStorage.setItem('tasks_' + user.email, JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
    } catch (e) {
      console.log('Error deleting task', e);
    }
  };

  const confirmDelete = (id) => {
    Alert.alert('Excluir Tarefa', 'Tem certeza que deseja excluir esta tarefa?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', onPress: () => deleteTask(id), style: 'destructive' }
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <View style={styles.taskInfo}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskDesc} numberOfLines={2}>{item.description}</Text>
        {item.location && (
          <Text style={styles.locationText}>📍 Capturado com GPS</Text>
        )}
      </View>
      <View style={styles.taskActions}>
        <TouchableOpacity 
          style={[styles.actionBtn, styles.editBtn]}
          onPress={() => navigation.navigate('TaskDetail', { task: item })}
        >
          <MaterialIcons name="edit" size={20} color="#D97706" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionBtn, styles.deleteBtn]}
          onPress={() => confirmDelete(item.id)}
        >
          <MaterialIcons name="delete" size={20} color="#DC2626" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Minhas Tarefas</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View style={styles.profileBtn}>
            <Text style={styles.profileBtnText}>{user?.name?.charAt(0).toUpperCase()}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="fact-check" size={64} color="#D1D5DB" />
          <Text style={styles.emptyText}>Nenhuma tarefa encontrada.</Text>
          <Text style={styles.emptySubText}>Clique no botão abaixo para adicionar uma.</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('TaskDetail')}
        activeOpacity={0.8}
      >
        <MaterialIcons name="add" size={32} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};


export default HomeScreen;
