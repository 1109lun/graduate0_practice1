import './style.css';
import Task from './modules/Task.js';
import Project from './modules/Project.js';
import { createTaskElement } from './modules/dom.js';
import { saveProjects , loadProjects} from './modules/storage.js';


const taskInput = document.getElementById('task');
const addButton = document.getElementById('add');
const taskList = document.getElementById('taskList');
const clearButton = document.getElementById('clearall');
//const savedTasks = loadTasks();

let projects = loadProjects();
let currentProject = projects.find(p => p.name === 'Inbox') || new Project('Inbox');

if (!projects.find(p => p.name === 'Inbox')){
    projects.push(currentProject);
    saveProjects(projects);
}

renderTaskList(currentProject.tasks);

function addTask(){
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('請輸入任務')
        return ;
    }

    const task = new Task(taskText);
    currentProject.addTask(task);
    renderTaskList(currentProject.tasks);
    saveProjects(projects);
    taskInput.value = '';
}

function handleDelete(task){
    currentProject.removeTask(task);
    renderTaskList(currentProject.tasks);
    saveProjects(projects);
}

function handleToggle(task) {
    task.toggleCompleted();
    renderTaskList(currentProject.tasks);
    saveProjects(projects);
}

function renderTaskList(tasks){
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = createTaskElement(task , handleDelete , handleToggle);
        taskList.appendChild(li);
    });
}

taskInput.addEventListener('keypress' , function(event){
    if (event.key === 'Enter'){
        addTask();
    }
}) ;

clearButton.addEventListener('click' , function(){
    if (confirm('確定要刪除所有任務嗎？')){
        currentProject.tasks = [];
        renderTaskList(currentProject.tasks);
        saveProjects(projects);
    }
});

/*savedTasks.forEach(task => {
    const li = createTaskElement(task , handleDelete , handleToggle);
    taskList.appendChild(li);
});*/

addButton.addEventListener('click' , addTask);