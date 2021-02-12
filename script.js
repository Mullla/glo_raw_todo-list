'use strict';

const addTodoForm = document.querySelector('.todo-control'),
    addTodoInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoListCompleted = document.querySelector('.todo-completed'),
    addTodoBtn = document.querySelector('.header-button'),
    todoTemplate = document.getElementById('todo-task').content, // шаблон новой задачи
    todoItem = todoTemplate.querySelector('.todo-item'); // элемент li из шаблона

    let todoData = [];
// получаю данные из localStorage в формате json и превращаю их в массив объектов
if (localStorage.getItem(todo) !== null) {
    let data = localStorage.getItem(todo, 'jsonTodo');
    todoData = JSON.parse(data);
} else {
    todoData = [
        {
            value: 'Создать свою первую задачу',
            completed: false
        },
        {
            value: 'Загрузить страницу с ToDo',
            completed: true
        },
    ];
}

const render = function () {  
    todoList.textContent = '';
    todoListCompleted.textContent = '';

    todoData.forEach(function (item) {  
        const task = todoItem.cloneNode(true); // клонирую шаблон
        const taskText = task.querySelector('.text-todo'); // получаю span, где хранится текст

        // задача добавится только если поле не пустое
        if (item.value.trim() !== ''){
            taskText.textContent = item.value.trim(); // обрезаю пробелы
            
            if (item.completed) {
                todoListCompleted.append(task); // задача сразу добавляется в сделанные
            } else {
                todoList.append(task);
            }
        }

        addTodoInput.value = ''; // очищаю инпут

        // отметить задачу как выполненную и наоборот
        const completeTodoBtn = task.querySelector('.todo-complete'); 
        completeTodoBtn.addEventListener('click', function () {  
            item.completed = !item.completed;
            render();
        });

        // удалить задачу из массива
        const removeTodoBtn = task.querySelector('.todo-remove');
        removeTodoBtn.addEventListener('click', function () {  
            todoData.splice(todoData.indexOf(item), 1);
            render();
        });

        // перевод в json формат и запись в localStorage
        let jsonTodo = JSON.stringify(todoData);
        localStorage.setItem(todo, jsonTodo);
    });
};

addTodoForm.addEventListener('submit', function (event) {  
    event.preventDefault();

    // новый объект задачи
    const newTodo = {
        value: addTodoInput.value,
        completed: false
    }

    todoData.push(newTodo); // добавление в массив новой задачи
    render(); // переотрисовка списка задач

});

render();
