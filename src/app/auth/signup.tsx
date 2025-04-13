import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import axios from 'axios';

const countries = ['Bangladesh', 'Singapore', 'USA', 'UK', 'Canada'];

const Signup = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    country: countries[0],
    babyAge: '',
    dob: '',
    weight: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const validateForm = () => {
    const { name, email, password, babyAge, dob, weight } = form;

    if (!name || !email || !password || !babyAge || !dob || !weight) {
      Alert.alert('Validation Error', 'All fields are required.');
      return false;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email.');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Validation Error', 'Password must be at least 6 characters.');
      return false;
    }

    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await axios.post('http://192.168.0.119:5000/api/signup', form);
      setLoading(false);
      router.replace('/main'); // Navigate to main stack (index.tsx)
    } catch (error) {
      setLoading(false);
      const errorMsg = error.response?.data?.message || 'Signup failed. Please try again.';
      Alert.alert('Signup Error', errorMsg);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Create Account</Text>

        <InputField
          placeholder="Baby Name"
          value={form.name}
          onChangeText={(val) => handleChange('name', val)}
        />

        <InputField
          placeholder="Email"
          keyboardType="email-address"
          value={form.email}
          onChangeText={(val) => handleChange('email', val)}
        />

        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={form.country}
            onValueChange={(val) => handleChange('country', val)}
            style={styles.picker}
          >
            {countries.map((c) => (
              <Picker.Item key={c} label={c} value={c} />
            ))}
          </Picker>
        </View>

        <InputField
          placeholder="Baby Age (months)"
          keyboardType="numeric"
          value={form.babyAge}
          onChangeText={(val) => handleChange('babyAge', val)}
        />

        <InputField
          placeholder="Date of Birth (YYYY-MM-DD)"
          value={form.dob}
          onChangeText={(val) => handleChange('dob', val)}
        />

        <InputField
          placeholder="Weight (kg)"
          keyboardType="numeric"
          value={form.weight}
          onChangeText={(val) => handleChange('weight', val)}
        />

        <InputField
          placeholder="Password"
          secureTextEntry
          value={form.password}
          onChangeText={(val) => handleChange('password', val)}
        />

        <TouchableOpacity
          style={[styles.buttonPrimary, loading && { backgroundColor: '#9CA3AF' }]}
          onPress={handleSignup}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
          <Text style={styles.linkText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const InputField = ({ placeholder, ...props }) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    placeholderTextColor="#888"
    {...props}
  />
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F6F9FC',
    flexGrow: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 20
  },
  input: {
    width: '100%',
    height: 48,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginBottom: 12,
    fontSize: 16,
    color: '#111827'
  },
  pickerWrapper: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 12,
    overflow: 'hidden'
  },
  picker: {
    width: '100%',
    height: 50
  },
  buttonPrimary: {
    backgroundColor: '#10B981',
    paddingVertical: 14,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  linkText: {
    color: '#2563EB',
    marginTop: 16,
    fontSize: 14
  }
});

export default Signup;
