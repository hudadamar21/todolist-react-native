import React from 'react';
import {useMemo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Todo} from '../types/Todo';
import Icon from 'react-native-vector-icons/Feather';
import {editIdAtom, isEditAtom, todosAtom, valueAtom} from '../store';
import {useAtom} from 'jotai';

interface TodoItemProps {
  item: Todo;
}

const TodoItem = ({item}: TodoItemProps) => {
  const [todos, setTodos] = useAtom(todosAtom);
  const [, setValue] = useAtom(valueAtom);
  const [editId, setEditId] = useAtom(editIdAtom);
  const [, setIsEdit] = useAtom(isEditAtom);

  const todoEdit = useMemo<Todo>(
    () => todos.filter(todo => todo.id === editId)[0],
    [editId, todos],
  );

  const handleEdit = (id: string) => {
    setEditId(id);
    setIsEdit(true);
    setValue(todoEdit?.name);
  };

  const handleComplete = (id: string) => {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === id ? {...todo, isComplete: !todo.isComplete} : todo,
      ),
    );
    setEditId('');
    setIsEdit(false);
    setValue('');
  };
  const handleDelete = (id: string) => {
    setTodos(currTodos => currTodos.filter(todo => todo.id !== id));
  };

  return (
    <View className="flex flex-row justify-between items-center py-3 border-b border-gray-200">
      <View>
        <Text className="text-lg font-medium text-gray-800">{item.name}</Text>
        <Text>{item.date}</Text>
      </View>
      <View className="flex flex-row gap-3">
        <TouchableOpacity
          className="p-1 mt-px"
          onPress={() => handleEdit(item.id)}>
          <Icon name={'edit'} size={15} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity className="p-1" onPress={() => handleDelete(item.id)}>
          <Icon name={'trash'} size={15} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity
          className="p-1"
          onPress={() => handleComplete(item.id)}>
          {item.isComplete ? (
            <Icon name={'check-circle'} size={15} color={'blue'} />
          ) : (
            <Icon name={'check'} size={15} color={'black'} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoItem;
