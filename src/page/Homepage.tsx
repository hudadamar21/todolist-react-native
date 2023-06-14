import React, {useEffect, useMemo, useState} from 'react';

import {Text, TextInput, View, TouchableOpacity, FlatList} from 'react-native';
import TodoItem from '../components/TodoItem';
import {Todo} from '../types/Todo';
import {useAtom} from 'jotai';
import {todosAtom} from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomePage = () => {
  const [todos, setTodos] = useAtom(todosAtom);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>();
  const [inputValue, setInputValue] = useState<string>('');

  const todoEdit = useMemo<Todo>(
    () => todos.filter(todo => todo.id === editId)[0],
    [editId, todos],
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedTodos = await AsyncStorage.getItem('todos');
        if (storedTodos) {
          setTodos(JSON.parse(storedTodos));
        }
      } catch (error) {
        console.log('Error loading todos:', error);
      }
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = (id: string) => {
    setEditId(id);
    setIsEdit(true);
    setInputValue(todoEdit?.name);
  };

  const clearState = () => {
    setEditId('');
    setIsEdit(false);
    setInputValue('');
  };

  const handleCreate = () => {
    if (inputValue) {
      setTodos(currentTodos => [
        ...currentTodos,
        {
          id: (currentTodos.length + 1).toString(),
          name: inputValue,
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
        todo.id === editId ? {...todo, name: inputValue} : todo,
      ),
    );
    clearState();
  };
  const handleComplete = (id: string) => {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === id ? {...todo, isComplete: !todo.isComplete} : todo,
      ),
    );
    clearState();
  };
  const handleDelete = (id: string) => {
    setTodos(currTodos => currTodos.filter(todo => todo.id !== id));
    console.log(todos);
  };

  return (
    <View className="p-3">
      <Text className="text-2xl font-bold mt-3 mb-5 text-black">Todo List</Text>
      <View className="flex flex-row w-full mb-5">
        <TextInput
          className="flex-grow h-12 text-base border border-gray-200 rounded-lg px-5"
          placeholder="your todo.."
          onChangeText={setInputValue}
          value={inputValue}
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
      <View>
        <FlatList
          data={todos.filter(todo => !todo.isComplete)}
          renderItem={({item}: {item: Todo}) =>
            TodoItem({
              item,
              onEdit: handleEdit,
              onDelete: handleDelete,
              onComplete: handleComplete,
            })
          }
          keyExtractor={(item: Todo) => item.id}
        />
      </View>
      <View>
        <Text className="text-xl font-bold text-black my-3">
          Todo Completed:
        </Text>
        <FlatList
          data={todos.filter(todo => todo.isComplete)}
          renderItem={({item}: {item: Todo}) =>
            TodoItem({
              item,
              onEdit: handleEdit,
              onDelete: handleDelete,
              onComplete: handleComplete,
            })
          }
          keyExtractor={(item: Todo) => item.id}
        />
      </View>
    </View>
  );
};
export default HomePage;
