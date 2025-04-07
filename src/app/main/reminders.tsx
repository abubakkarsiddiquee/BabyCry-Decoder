import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';

interface Reminder {
  id: number;
  title: string;
  time: string;
  active: boolean;
}

const Reminders: React.FC = () => {
  const [reminderTitle, setReminderTitle] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [nextId, setNextId] = useState(1);

  const addReminder = () => {
    if (!reminderTitle || !reminderTime) {
      Alert.alert('Missing Info', 'Please provide both a title and a time.');
      return;
    }

    const newReminder: Reminder = {
      id: nextId,
      title: reminderTitle,
      time: reminderTime,
      active: true,
    };

    setReminders([...reminders, newReminder]);
    setNextId(nextId + 1);
    setReminderTitle('');
    setReminderTime('');
  };

  const deleteReminder = (id: number) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  const checkReminders = () => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5); // format HH:MM

    reminders.forEach((reminder) => {
      if (reminder.active && reminder.time === currentTime) {
        Alert.alert('Reminder', reminder.title);
        reminder.active = false;
      }
    });

    setReminders([...reminders]);
  };

  useEffect(() => {
    const interval = setInterval(checkReminders, 60000); // every 1 min
    return () => clearInterval(interval);
  }, [reminders]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Set Reminders</Text>

      <TextInput
        style={styles.input}
        placeholder="Reminder Title"
        value={reminderTitle}
        onChangeText={setReminderTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="HH:MM (24hr)"
        value={reminderTime}
        onChangeText={setReminderTime}
      />

      <TouchableOpacity style={styles.buttonPrimary} onPress={addReminder}>
        <Text style={styles.buttonText}>Add Reminder</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Your Reminders:</Text>

      <View style={styles.remindersList}>
        {reminders.map((reminder) => (
          <View key={reminder.id} style={styles.reminderItem}>
            <Text>{reminder.title} - {reminder.time}</Text>
            <TouchableOpacity
              onPress={() => deleteReminder(reminder.id)}
              style={styles.buttonDelete}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#F6F9FC',
    padding: 20,
    minHeight: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    width: '80%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  buttonPrimary: {
    backgroundColor: '#34D399',
    padding: 12,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDelete: {
    backgroundColor: '#FF6347',
    padding: 6,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  remindersList: {
    width: '80%',
    marginTop: 20,
  },
  reminderItem: {
    backgroundColor: '#E4E6EB',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
});

export default Reminders;
