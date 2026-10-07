import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import { validateRegister, isFormValid } from '../utils/validation';
import { colors } from '../theme/theme';
import { styles } from '../styles/AuthStyles';

/**
 * Tela de cadastro. Após criar a conta o usuário já entra no app
 * automaticamente (o navegador troca para as telas autenticadas).
 */
const RegisterScreen = ({ navigation }) => {
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /** Atualiza um campo e limpa o erro dele enquanto o usuário digita. */
  const updateField = (field) => (value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined, general: undefined }));
  };

  const handleRegister = async () => {
    const validation = validateRegister(form);
    setErrors(validation);
    if (!isFormValid(validation)) return;

    setIsSubmitting(true);
    const result = await register(form.name, form.email, form.password);
    if (!result.success) {
      setErrors({ general: result.message });
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <View style={styles.content}>
            <View style={styles.logo}>
              <MaterialIcons name="person-add" size={24} color={colors.white} />
            </View>
            <Text style={styles.title}>Criar conta</Text>
            <Text style={styles.subtitle}>Preencha os dados abaixo para se cadastrar.</Text>

            {errors.general ? (
              <View style={styles.errorBanner}>
                <MaterialIcons name="error-outline" size={20} color={colors.dangerDark} />
                <Text style={styles.errorBannerText}>{errors.general}</Text>
              </View>
            ) : null}

            <FormInput
              label="Nome completo"
              icon="person"
              placeholder="Como devemos te chamar?"
              value={form.name}
              onChangeText={updateField('name')}
              error={errors.name}
              autoCapitalize="words"
            />
            <FormInput
              label="E-mail"
              icon="email"
              placeholder="seu@email.com"
              value={form.email}
              onChangeText={updateField('email')}
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <FormInput
              label="Senha"
              icon="lock"
              placeholder="Mínimo de 6 caracteres"
              value={form.password}
              onChangeText={updateField('password')}
              error={errors.password}
              secureTextEntry
            />
            <FormInput
              label="Confirmar senha"
              icon="lock-outline"
              placeholder="Digite a senha novamente"
              value={form.confirmPassword}
              onChangeText={updateField('confirmPassword')}
              error={errors.confirmPassword}
              secureTextEntry
              onSubmitEditing={handleRegister}
            />

            <PrimaryButton
              title="Cadastrar"
              icon="how-to-reg"
              onPress={handleRegister}
              loading={isSubmitting}
              style={styles.button}
            />

            <View style={styles.footer}>
              <Text style={styles.footerText}>Já tem uma conta? </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.footerLink}>Entrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
