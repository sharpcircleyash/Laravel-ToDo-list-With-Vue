import { defineStore } from 'pinia';
import axios from 'axios';

export const useTodoStore = defineStore('todo', {
    state: () => ({
        newTodos: '',
        todos: [],
        completedTodos: [],
    }),

    getters: {
        todosCount() {
            return this.todos.length;
        },
        completeTodosCount() {
            return this.completeTodos.length;
        },
    },

    actions: {
        async fetchData() {
            try {
                // Fetch data from the server and update state
                const response = await axios.get("/api/todos");
                const allTodos = response.data;

                this.todos = allTodos.filter((todo) => todo.completed === 0);
                this.completedTodos = allTodos.filter((todo) => todo.completed === 1);
            } catch (error) {
                console.error(error);
            }
        },

        async addTodo() {
            try {
                const response = await axios.post("/api/todos", {
                    title: this.newTodos,
                });
                this.todos.push(response.data);
                this.newTodos = '';
            } catch (error) {
                console.error(error);
            }
        },

        async deleteTodo(todo) {
            try {
                await axios.delete(`/api/todos/${ todo.id }`);
                this.todos = this.todos.filter((e) => e !== todo);
            } catch (error) {
                console.error(error);
            }
        },

        async deleteComplete(todo) {
            try {
                await axios.delete(`/api/todos/${ todo.id }`);
                this.completedTodos = this.completedTodos.filter((e) => e !== todo);
            } catch (error) {
                console.error(error);
            }
        },

        async deleteAll() {
            try {
                await axios.delete("/api/todos");
                this.todos = [];
            } catch (error) {
                console.error(error);
            }
        },

        async complete(todo) {
            try {
                const response = await axios.put(`/api/todos/${ todo.id }`, {
                    completed: true,
                });

                // Update todos and completedTodos lists
                this.todos = this.todos.filter((e) => e.id !== todo.id);
                this.completedTodos.push(response.data);
            } catch (error) {
                console.error(error);
            }
        },

        async undoComplete(todo) {
            try {
                const response = await axios.put(`/api/todos/${ todo.id }`, {
                    completed: false,
                });
                this.todos.push(response.data);
                this.completedTodos = this.completedTodos.filter((e) => e !== todo);
            } catch (error) {
                console.error(error);
            }
        },
    },
});
