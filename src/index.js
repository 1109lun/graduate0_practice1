import './style.css';
import Task from './modules/Task.js';
import Project from './modules/Project.js';
import { createTaskElement } from './modules/dom.js';
import { saveProjects , loadProjects} from './modules/storage.js';


const taskInput = document.getElementById('task');
const addButton = document.getElementById('add');
const taskList = document.getElementById('taskList');
const clearButton = document.getElementById('clearall');

let projects = loadProjects();
let currentProject = projects.find(p => p.name === 'Inbox') || new Project('Inbox');

if (!projects.find(p => p.name === 'Inbox')){
    projects.push(currentProject);
    saveProjects(projects);
}

document.getElementById('addProject').addEventListener('click' , () => {
    const ProjectName = prompt('請輸入專案名稱');
    if (ProjectName === null || ProjectName.trim() === ''){
        return ;
    }
    if (projects.find(p => p.name === ProjectName)){
        alert('專案已存在');
        return ;
    }

    const newProject = new Project(ProjectName);
    projects.push(newProject);
    saveProjects(projects);
    renderProjectList(projects);
});     

function renderProjectList(projects){
    const projectList = document.getElementById('ProjectList');
    projectList.innerHTML = '';
    projects.forEach(project => {
        const li = document.createElement('li');
        li.textContent = project.name;
        li.classList.add('project');
        if (project === currentProject){
            li.classList.add('active');
        }
        li.addEventListener('click' , () => {
            currentProject = project;
            console.log("切換專案為：", currentProject.name);
            document.getElementById('currentProject').textContent = currentProject.name;
            renderTaskList(currentProject.tasks);
            renderProjectList(projects);
        });
        projectList.appendChild(li);
    });
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
    console.log("目前任務數：", tasks.length); 
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

addButton.addEventListener('click' , addTask);

renderProjectList(projects);