// App.tsx or App.js
import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const COHERE_API_KEY = 'qAZKjG66h3nle4hR9FCDmassx4boOzu4mPw8vcTF'; // 🔑 Replace this with your actual API key

export default function App() {
  const [userInput, setUserInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const getAIResponse = async (message: string) => {
    setLoading(true);
    setAiResponse('');
    try {
      const response = await axios.post(
        'https://api.cohere.ai/v1/generate',
        {
          model: 'command', // Free tier supports "command" model
          prompt: message,
          max_tokens: 100,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${COHERE_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const aiText = response.data?.generations?.[0]?.text?.trim();
      setAiResponse(aiText || 'No response from AI.');
    } catch (error) {
      console.error('API Error:', error);
      setAiResponse('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => {
    if (userInput.trim() !== '') {
      getAIResponse(userInput);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🧠 AI Chat with Aladin</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your message..."
        value={userInput}
        onChangeText={setUserInput}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>{loading ? 'Thinking...' : 'Send'}</Text>
      </TouchableOpacity>

      <ScrollView style={styles.responseBox}>
        <Text style={styles.label}>AI Response:</Text>
        <Text style={styles.responseText}>{aiResponse}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f4f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    minHeight: 60,
  },
  button: {
    backgroundColor: '#4c9aff',
    padding: 12,
    marginTop: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  responseBox: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 16,
  },
  responseText: {
    fontSize: 16,
    color: '#333',
  },
});
