import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const getAIResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('crying')) {
    return 'Baby crying can be due to several reasons. Try feeding or checking if the baby is sleepy.';
  }
  if (lowerMessage.includes('hungry')) {
    return 'If your baby is crying and seems restless, they might be hungry. Offer some milk or food.';
  }
  if (lowerMessage.includes('discomfort')) {
    return 'Check for wet diaper, tight clothes, or if the baby needs a burp.';
  }
  if (lowerMessage.includes('tired')) {
    return 'Try rocking your baby gently or playing soft lullabies.';
  }
  if (lowerMessage.includes('belly pain')) {
    return 'Try gently massaging your baby’s tummy or use a warm compress.';
  }
  if (lowerMessage.includes('burping')) {
    return 'Burping after feeding helps release trapped air. Pat or rub their back gently.';
  }
  if (lowerMessage.includes('sleep')) {
    return 'Ensure a quiet, comfortable space for sleep.';
  }
  if (lowerMessage.includes('health tips')) {
    return 'Regular check-ups, vaccinations, and good nutrition help your baby stay healthy.';
  }

  return 'I\'m not sure about that. Try rephrasing or asking something else about your baby!';
};

const TeddyChat: React.FC = () => {
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);

  const handleSendMessage = () => {
    if (userMessage.trim()) {
      const userMsg = { sender: 'user', text: userMessage };
      const botMsg = { sender: 'bot', text: getAIResponse(userMessage) };

      setMessages((prev) => [...prev, userMsg, botMsg]);
      setUserMessage('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Text style={styles.title}>Teddy Chat</Text>

      <FlatList
        style={styles.chatBox}
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={item.sender === 'user' ? styles.userMessage : styles.botMessage}>
            <Text>{item.text}</Text>
          </View>
        )}
      />

      <TextInput
        style={styles.input}
        value={userMessage}
        onChangeText={setUserMessage}
        placeholder="Ask me about your baby..."
      />

      <TouchableOpacity style={styles.buttonPrimary} onPress={handleSendMessage}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F9FC',
    padding: 20,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'center',
    marginBottom: 10,
  },
  chatBox: {
    flex: 1,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#D1F7C4',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    maxWidth: '80%',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E4E6EB',
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    maxWidth: '80%',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  buttonPrimary: {
    backgroundColor: '#34D399',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default TeddyChat;
