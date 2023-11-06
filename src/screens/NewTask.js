import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const NewTask = ({navigation, route}) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [subtasks, setSubtasks] = useState(['']);
  const [taskError, setTaskError] = useState('');

  const addSubtask = () => {
    setSubtasks([...subtasks, '']);
  };

  const removeSubtask = index => {
    const updatedSubtasks = subtasks.filter((_, i) => i !== index);
    setSubtasks(updatedSubtasks);
  };

  const createTask = () => {
    if (!taskTitle) {
      setTaskError('Task title is required');
      return;
    }

    const newTask = {
      title: taskTitle,
      description: taskDescription,
      subtasks: subtasks.filter(subtask => subtask.trim() !== ''),
    };

    route.params.onSave(newTask);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add New Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        value={taskTitle}
        onChangeText={text => setTaskTitle(text)}
      />
      {taskError ? <Text style={styles.error}>{taskError}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Task Description"
        value={taskDescription}
        onChangeText={text => setTaskDescription(text)}
        multiline
      />
      {subtasks.map((subtask, index) => (
        <View key={index} style={styles.subtaskContainer}>
          <TextInput
            style={styles.input}
            placeholder="Subtask"
            value={subtask}
            onChangeText={text => {
              const updatedSubtasks = [...subtasks];
              updatedSubtasks[index] = text;
              setSubtasks(updatedSubtasks);
            }}
          />
          <TouchableOpacity
            style={styles.removeSubtaskButton}
            onPress={() => removeSubtask(index)}>
            <Text style={styles.removeSubtaskButtonText}>✖</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={styles.addSubtaskButton} onPress={addSubtask}>
        <Text style={styles.addSubtaskButtonText}>+ Add New Subtask</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.createTaskButton} onPress={createTask}>
        <Text style={styles.createTaskButtonText}>Create Task</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2c2c35',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    backgroundColor: '#645fc6',
    color: 'white',
    borderRadius: 5,
    marginVertical: 10,
    padding: 10,
  },
  error: {
    color: 'red',
  },
  subtaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeSubtaskButton: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    padding: 5,
    marginLeft: 10,
  },
  removeSubtaskButtonText: {
    color: 'white',
    fontSize: 16,
  },
  addSubtaskButton: {
    backgroundColor: '#645fc6',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  addSubtaskButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  createTaskButton: {
    backgroundColor: '#645fc6',
    borderRadius: 5,
    padding: 15,
  },
  createTaskButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default NewTask;
