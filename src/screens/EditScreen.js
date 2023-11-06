import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const EditScreen = ({route, navigation}) => {
  const {taskToEdit} = route.params;
  const [editedTaskTitle, setEditedTaskTitle] = useState(taskToEdit.title);

  const handleSave = () => {
    const updatedTask = {
      ...taskToEdit,
      title: editedTaskTitle,
    };

    route.params.onSave(updatedTask);
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Text>Edit Task: {taskToEdit.title}</Text>

      <TextInput
        placeholder="Edit Task Title"
        value={editedTaskTitle}
        onChangeText={text => setEditedTaskTitle(text)}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text>Save</Text>
      </TouchableOpacity>
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
  saveButton: {
    backgroundColor: '#645fc6',
    padding: 10,
    borderRadius: 4,
  },
});

export default EditScreen;
