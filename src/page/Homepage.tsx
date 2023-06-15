import React, {useEffect, useMemo} from 'react';

import {Text, View, FlatList} from 'react-native';
import TodoItem from '../components/TodoItem';
import {Todo} from '../types/Todo';
import {useAtom} from 'jotai';
import {todosAtom} from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoInputField from '../components/TodoInputField';

const HomePage = () => {
  const [todos, setTodos] = useAtom(todosAtom);

  const todoNotComplete = useMemo(
    () => todos.filter(todo => !todo.isComplete),
    [todos],
  );
  const todoIsComplete = useMemo(
    () => todos.filter(todo => todo.isComplete),
    [todos],
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
  return (
    <View className="p-3">
      <Text className="text-2xl font-bold mt-3 mb-5 text-black">Todo List</Text>
      <TodoInputField />
      <View>
        <FlatList
          data={todoNotComplete}
          renderItem={({item}: {item: Todo}) => <TodoItem item={item} />}
          keyExtractor={(item: Todo) => item.id}
        />
      </View>
      <View>
        <Text className="text-xl font-bold text-black my-3">
          Todo Completed:
        </Text>
        <FlatList
          data={todoIsComplete}
          renderItem={({item}: {item: Todo}) => <TodoItem item={item} />}
          keyExtractor={(item: Todo) => item.id}
        />
      </View>
    </View>
  );
};
export default HomePage;
