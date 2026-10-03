import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import { styles } from '../styles/ProfileStyles';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loadingQuote, setLoadingQuote] = useState(true);

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    setLoadingQuote(true);
    try {
      // Using a free API for quotes
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
    } catch (e) {
      console.log('Error fetching quote', e);
      setQuote('A persistência é o caminho do êxito.');
      setAuthor('Charles Chaplin');
    } finally {
      setLoadingQuote(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialIcons name="arrow-back-ios" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meu Perfil</Text>
        <View style={{width: 40}} />
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.name?.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>

        <View style={styles.apiSection}>
          <Text style={styles.apiTitle}>Inspiração do Dia</Text>
          {loadingQuote ? (
            <ActivityIndicator size="small" color="#10B981" style={{ marginVertical: 20 }}/>
          ) : (
            <View style={styles.quoteCard}>
              <Text style={styles.quoteText}>"{quote}"</Text>
              <Text style={styles.quoteAuthor}>- {author}</Text>
            </View>
          )}
          <TouchableOpacity onPress={fetchQuote} style={styles.refreshBtn}>
            <MaterialIcons name="refresh" size={20} color="#4F46E5" />
            <Text style={styles.refreshBtnText}>Nova Frase</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
          <MaterialIcons name="logout" size={20} color="#EF4444" />
          <Text style={styles.logoutBtnText}>Sair da Conta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


export default ProfileScreen;
