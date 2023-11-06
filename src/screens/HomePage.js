import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomePage = ({navigation, route}) => {
  const [tasks, setTasks] = useState([]);
  const [currentStatus, setCurrentStatus] = useState('All');

  const openProfile = () => {
    navigation.navigate('ProfileScreen');
  };

  useEffect(() => {
    loadTasks();
  }, [route.params]);

  const loadTasks = async () => {
    try {
      const tasksData = await AsyncStorage.getItem('tasks');
      if (tasksData) {
        const parsedTasks = JSON.parse(tasksData);
        setTasks(parsedTasks);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };
  const saveTasks = async updatedTasks => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTasks(updatedTasks);
      console.log('Updated tasks:', updatedTasks);
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };
  const createNewTask = () => {
    navigation.navigate('NewTask', {
      onSave: newTask => {
        const existingTasks = tasks || [];
        const updatedTasks = [...existingTasks, newTask];
        saveTasks(updatedTasks);
      },
    });
  };

  const editTask = taskId => {
    const taskToEdit = tasks.find(task => task.id === taskId);
    if (taskToEdit) {
      navigation.navigate('EditScreen', {
        taskToEdit,
        onSave: updatedTask => {
          const updatedTasks = tasks.map(task =>
            task.id === updatedTask.id ? updatedTask : task,
          );
          saveTasks(updatedTasks);
        },
      });
    }
  };
  const deleteTask = taskId => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    saveTasks(updatedTasks);
  };

  const filteredTasks =
    currentStatus === 'All'
      ? tasks
      : tasks.filter(task => task.status === currentStatus);

  const changeStatusFilter = status => {
    setCurrentStatus(status);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Task List</Text>
      <TouchableOpacity style={styles.newTaskButton} onPress={createNewTask}>
        <Text style={styles.newTaskButtonText}>Create New Task</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileButton} onPress={openProfile}>
        <Text style={styles.profileButtonText}>Your Profile</Text>
      </TouchableOpacity>
      <FlatList
        data={tasks}
        keyExtractor={item =>
          item.id
            ? item.id.toString()
            : item.key
            ? item.key.toString()
            : Math.random().toString()
        }
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.taskItem}
            onPress={() => editTask(item.id)}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.status}>{item.status}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
      <View style={styles.statusFilters}>
        <TouchableOpacity
          style={styles.statusFilterButton}
          onPress={() => changeStatusFilter('All')}>
          <Text style={styles.statusFilterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.statusFilterButton}
          onPress={() => changeStatusFilter('TO DO')}>
          <Text style={styles.statusFilterText}>TO DO</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.statusFilterButton}
          onPress={() => changeStatusFilter('IN PROGRESS')}>
          <Text style={styles.statusFilterText}>IN PROGRESS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.statusFilterButton}
          onPress={() => changeStatusFilter('COMPLETED')}>
          <Text style={styles.statusFilterText}>COMPLETED</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredTasks}
        keyExtractor={item =>
          item && item.id ? item.id.toString() : Math.random().toString()
        }
        renderItem={({item}) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskTitle}>{item.title}</Text>
            <Text style={styles.status}>{item.status}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2c2c35',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    marginTop: 20,
    padding: 15,
  },
  newTaskButton: {
    backgroundColor: '#645fc6',
    padding: 10,
    borderRadius: 4,
    margin: 10,
    marginTop: 200,
  },
  newTaskButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    backgroundColor: '#645fc6',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  taskTitle: {
    fontSize: 16,
    color: 'white',
  },
  status: {
    fontSize: 16,
    color: 'white',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 10,
  },
  deleteButtonText: {
    color: 'white',
  },
  profileButton: {
    marginTop: -360,
    marginLeft: -290,
  },
  profileButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
  },
  statusFilters: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  statusFilterButton: {
    backgroundColor: '#645fc6',
    padding: 10,
    borderRadius: 5,
    marginBottom: 600,
    marginRight: 12,
    marginLeft: 10,
  },
  statusFilterText: {
    color: 'white',
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    backgroundColor: '#645fc6',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginTop: 50,
  },
  taskTitle: {
    fontSize: 16,
    color: 'white',
  },
  status: {
    fontSize: 16,
    color: 'white',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
  },
  deleteButtonText: {
    color: 'white',
  },
});

export default HomePage;
