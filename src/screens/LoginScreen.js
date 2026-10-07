import React, { useState, useContext, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext, DEMO_ACCOUNT } from '../context/AuthContext';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import { validateLogin, isFormValid } from '../utils/validation';
import { colors, gradients } from '../theme/theme';
import { styles } from '../styles/AuthStyles';

/** Tela de login: valida os campos e autentica pelo AuthContext. */
const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const insets = useSafeAreaInsets();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const passwordRef = useRef(null);

  /** Atualiza um campo e limpa o erro dele enquanto o usuário digita. */
  const updateField = (field) => (value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined, general: undefined }));
  };

  const handleLogin = async () => {
    const validation = validateLogin(form);
    setErrors(validation);
    if (!isFormValid(validation)) return;

    setIsSubmitting(true);
    const result = await login(form.email, form.password);
    if (!result.success) {
      setErrors({ general: result.message });
      setIsSubmitting(false);
    }
  };

  const fillDemoAccount = () => {
    setForm({ email: DEMO_ACCOUNT.email, password: DEMO_ACCOUNT.password });
    setErrors({});
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <LinearGradient
            colors={gradients.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.hero, { paddingTop: insets.top + 36 }]}
          >
            <View style={styles.heroContent}>
              <View style={styles.logo}>
                <MaterialIcons name="task-alt" size={34} color={colors.white} />
              </View>
              <Text style={styles.title}>Olá de novo! 👋</Text>
              <Text style={styles.subtitle}>Entre para organizar suas tarefas.</Text>
            </View>
          </LinearGradient>

          <View style={styles.sheet}>
            <View style={styles.content}>
              {errors.general ? (
                <View style={styles.errorBanner}>
                  <MaterialIcons name="error-outline" size={20} color={colors.dangerDark} />
                  <Text style={styles.errorBannerText}>{errors.general}</Text>
                </View>
              ) : null}

              <FormInput
                label="E-mail"
                icon="email"
                placeholder="seu@email.com"
                value={form.email}
                onChangeText={updateField('email')}
                error={errors.email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
              />

              <FormInput
                ref={passwordRef}
                label="Senha"
                icon="lock"
                placeholder="Sua senha"
                value={form.password}
                onChangeText={updateField('password')}
                error={errors.password}
                secureTextEntry
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />

              <PrimaryButton
                title="Entrar"
                icon="login"
                onPress={handleLogin}
                loading={isSubmitting}
                style={styles.button}
              />

              <TouchableOpacity style={styles.demoCard} onPress={fillDemoAccount} activeOpacity={0.8}>
                <View style={styles.demoIcon}>
                  <MaterialIcons name="school" size={22} color={colors.white} />
                </View>
                <View style={styles.demoTextContainer}>
                  <Text style={styles.demoTitle}>Usar conta de teste</Text>
                  <Text style={styles.demoSubtitle}>
                    {DEMO_ACCOUNT.email} • {DEMO_ACCOUNT.password}
                  </Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color={colors.primary} />
              </TouchableOpacity>

              <View style={styles.footer}>
                <Text style={styles.footerText}>Não tem uma conta? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={styles.footerLink}>Cadastre-se</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
