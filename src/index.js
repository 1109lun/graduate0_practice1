import './style.css';
import Task from './modules/Task.js';
import { createTaskElement } from './modules/dom.js';
import { saveTasks , loadTasks} from './modules/storage.js';


const taskInput = document.getElementById('task');
const addButton = document.getElementById('add');
const taskList = document.getElementById('taskList');
const clearButton = document.getElementById('clearall');
const savedTasks = loadTasks();

function addTask(){
    let taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('請輸入任務')
        return ;
    }

    const task = new Task(taskText);
    let li = createTaskElement(task , handleDelete , handleToggle);
    taskList.appendChild(li);
    taskInput.value = '';

    saveTasks(taskList);
}

function handleDelete(li){
    li.remove();
    saveTasks(taskList);
}

function handleToggle(task , li , finishButton) {
    task.completed = !task.completed;
    li.classList.toggle('done' , task.completed);
    finishButton.textContent = task.completed ? '未完成' : '已完成';

    const checkbox = li.querySelector('.task-checkbox');
    checkbox.checked = task.completed
    
    saveTasks(taskList);
}

addButton.addEventListener('click' , addTask);

taskInput.addEventListener('keypress' , function(event){
    if (event.key === 'Enter'){
        addTask();
    }
}) ;

clearButton.addEventListener('click' , function(){
    if (confirm('確定要刪除所有任務嗎？')){
        taskList.innerHTML = '';
        localStorage.removeItem('tasks');
    }
});

savedTasks.forEach(task => {
    const li = createTaskElement(task , handleDelete , handleToggle);
    taskList.appendChild(li);
});
