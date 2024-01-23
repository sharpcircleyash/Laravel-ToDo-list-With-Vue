<script setup>
import { useTodoStore } from "../stores/todoStore";

const todoStore = useTodoStore();

// Getters
todoStore.fetchData();

const addTodos = () => {
    todoStore.addTodo();
};

const deleteTodo = (todo) => {
    todoStore.deleteTodo(todo);
};

const deleteComplete = (todo) => {
    todoStore.deleteComplete(todo);
};

const deleteAll = () => {
    todoStore.deleteAll();
};

const completed = (todo) => {
    todoStore.complete(todo);
};

const undoCompleteTodo = (todo) => {
    todoStore.undoComplete(todo);
};
</script>

<template>
    <div class="d-flex justify-content-center align-items-center">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Todo APP</h5>
                <div>
                    <form @submit.prevent="addTodos" class="d-flex flex-row">
                        <input
                            type="text"
                            v-model="todoStore.newTodos"
                            class="form-control me-2"
                            name="title"
                            placeholder="add your new todo"
                        />
                        <button class="btn btn-primary">+</button>
                    </form>
                </div>
                <p
                    class="border border-primary fw-bold text-center mt-3"
                    v-if="todoStore.todos <= 0"
                >
                    TODO list is empty!
                </p>
                <ul class="list-group mt-5">
                    <li
                        class="list-group-item"
                        v-for="item in todoStore.todos"
                        :key="item.id"
                    >
                        <span>{{ item.title }}</span>
                        <button
                            class="btn btn-sm btn-danger float-end ms-2"
                            @click="deleteTodo(item)"
                        >
                            -
                        </button>
                        <button
                            class="btn btn-sm btn-success float-end"
                            @click="completed(item)"
                        >
                            &check;
                        </button>
                    </li>
                </ul>
                <p class="mt-3">
                    You have {{ todoStore.todosCount }} task left
                </p>
                <button class="btn btn-danger btn-sm" @click="deleteAll">
                    Clear all
                </button>
            </div>
        </div>
    </div>

    <div class="d-flex justify-content-center align-items-center ms-4">
        <div class="card" style="width: 30rem; height: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Completed TODO</h5>
                <p
                    class="border border-primary fw-bold text-center mt-3"
                    v-if="todoStore.completedTodosCount <= 0"
                >
                    Empty List
                </p>
                <ul class="list-group mt-5">
                    <li
                        class="list-group-item"
                        v-for="item in todoStore.completedTodos"
                        :key="item.id"
                    >
                        <span class="text-decoration-line-through">{{
                            item.title
                        }}</span>
                        <button
                            class="btn btn-sm btn-danger float-end ms-2"
                            @click="deleteComplete(item)"
                        >
                            -
                        </button>
                        <button
                            class="btn btn-sm btn-warning float-end"
                            @click="undoCompleteTodo(item)"
                        >
                            Undo
                        </button>
                    </li>
                </ul>
                <p class="mt-3">
                    You have {{ todoStore.completedTodosCount }} completed task
                </p>
            </div>
        </div>
    </div>
</template>
