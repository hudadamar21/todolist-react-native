// import {action} from 'mobx';
// import {Todo} from '../types/Todo';
// import {useLocalObservable} from 'mobx-react-lite';

// export const useTodoStore = () => {
//   const todoStore = useLocalObservable(() => ({
//     todos: [
//       {id: '1', name: 'Todo 1', date: '12/12/2023', isComplete: false},
//       {id: '2', name: 'Todo 2', date: '12/12/2023', isComplete: false},
//       {id: '3', name: 'Todo 3', date: '12/12/2023', isComplete: false},
//       {id: '4', name: 'Todo 4', date: '12/12/2023', isComplete: false},
//       {id: '5', name: 'Todo 5', date: '12/12/2023', isComplete: false},
//     ],
//     addTodo: action(function (data: Todo) {
//       todoStore.todos.push(data);
//       console.log(todoStore.todos);
//     }),
//     deleteTodo: action(function (id: string) {
//       todoStore.todos = todoStore.todos.filter(todo => todo.id !== id);
//     }),
//     updateTodo: action(function (id: string, newData: Todo) {
//       const index = todoStore.todos.findIndex(todo => todo.id === id);
//       if (index !== -1) {
//         todoStore.todos[index] = newData;
//       }
//       console.log(todoStore.todos);
//     }),
//   }));

//   return todoStore;
// };

// import {create} from 'zustand';
// import {persist, createJSONStorage} from 'zustand/middleware';
// import {Todo} from '../types/Todo';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const useTodoStore = create<TodoStore>()(
//   persist(
//     (set, get) => ({
//       todos: [],
//       createTodo: (data: Todo) =>
//         set(state => {
//           state.todos = [...state.todos, data];
//           //       console.log(todoStore.todos);
//         }),
//       updateTodo: (id: string, newData: Todo) =>
//         set(state => {
//           const index = state.todos.findIndex(todo => todo.id === id);
//           if (index !== -1) {
//             state.todos[index] = newData;
//           }
//         }),
//       deleteTdod: (id: string) =>
//         set(
//           state => (state.todos = state.todos.filter(todo => todo.id !== id)),
//         ),
//     }),
//     {
//       name: 'food-storage', // unique name
//       storage: createJSONStorage(() => AsyncStorage), // (optional) by default, 'localStorage' is used
//     },
//   ),
// );

import {atomWithStorage} from 'jotai/utils';
import {Todo} from '../types/Todo';

export const todosAtom = atomWithStorage<Todo[]>('todos', [
  {
    id: '1',
    name: 'Todo 1',
    date: new Date().toLocaleString(),
    isComplete: false,
  },
  {
    id: '2',
    name: 'Todo 2',
    date: new Date().toLocaleString(),
    isComplete: false,
  },
  {
    id: '3',
    name: 'Todo 3',
    date: new Date().toLocaleString(),
    isComplete: false,
  },
]);
