import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Todo} from '../types/Todo';
import Icon from 'react-native-vector-icons/Feather';

interface TodoItemProps {
  item: Todo;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
}

const TodoItem = ({item, onEdit, onDelete, onComplete}: TodoItemProps) => {
  return (
    <View className="flex flex-row justify-between items-center py-3 border-b border-gray-200">
      <View>
        <Text className="text-lg font-medium text-gray-800">{item.name}</Text>
        <Text>{item.date}</Text>
      </View>
      <View className="flex flex-row gap-3">
        <TouchableOpacity className="p-1 mt-px" onPress={() => onEdit(item.id)}>
          <Icon name={'edit'} size={15} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity className="p-1" onPress={() => onDelete(item.id)}>
          <Icon name={'trash'} size={15} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity className="p-1" onPress={() => onComplete(item.id)}>
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
