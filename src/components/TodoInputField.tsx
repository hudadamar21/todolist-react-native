import React from 'react';
import {useAtom} from 'jotai';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {editIdAtom, isEditAtom, todosAtom, valueAtom} from '../store';

function TodoInputField() {
  const [, setTodos] = useAtom(todosAtom);
  const [value, setValue] = useAtom(valueAtom);
  const [editId, setEditId] = useAtom(editIdAtom);
  const [isEdit, setIsEdit] = useAtom(isEditAtom);

  const clearState = () => {
    setEditId('');
    setIsEdit(false);
    setValue('');
  };

  const handleCreate = () => {
    if (value) {
      setTodos(currentTodos => [
        ...currentTodos,
        {
          id: (currentTodos.length + 1).toString(),
          name: value,
          date: new Date().toLocaleString(),
          isComplete: false,
        },
      ]);
      clearState();
    }
  };
  const handleUpdate = () => {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === editId ? {...todo, name: value} : todo,
      ),
    );
    clearState();
  };

  return (
    <View className="flex flex-row w-full mb-5">
      <TextInput
        className="flex-grow h-12 text-base border border-gray-200 rounded-lg px-5"
        placeholder="your todo.."
        onChangeText={setValue}
        value={value}
      />
      {!isEdit ? (
        <TouchableOpacity
          activeOpacity={0.9}
          className=" bg-blue-500 flex justify-center items-center ml-2 text-white w-20 rounded-lg"
          onPress={handleCreate}>
          <Text className="text-white flex items-center">Create</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          className="bg-blue-500 flex justify-center items-center ml-2 text-white w-20 rounded-lg"
          onPress={handleUpdate}>
          <Text className="text-white flex items-center">Update</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default TodoInputField;
