import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { styles } from '../styles/HomeStyles';

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(AuthContext);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadTasks();
    }
  }, [isFocused]);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks_' + user.email);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (e) {
      console.log('Error loading tasks', e);
    }
  };

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
          <Text style={styles.btnText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionBtn, styles.deleteBtn]}
          onPress={() => confirmDelete(item.id)}
        >
          <Text style={styles.btnText}>Excluir</Text>
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
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};


export default HomeScreen;
