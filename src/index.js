import './style.css';
import Task from './modules/Task.js';
import Project from './modules/Project.js';
import { createTaskElement } from './modules/dom.js';
import { saveProjects, loadProjects } from './modules/storage.js';

const addButton = document.getElementById('add');
const taskList = document.getElementById('taskList');
const clearButton = document.getElementById('clearall');
const taskDialog = document.getElementById('taskDialog');
const cancelDialog = document.getElementById('cancelDialog');
const taskForm = document.getElementById('taskForm');

addButton.addEventListener('click', () => {
  taskDialog.showModal();
});

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('taskTitle').value.trim();
  const description = document.getElementById('taskDescription').value.trim();
  const dueDate = document.getElementById('taskDueDate').value.trim();
  const priority = document.getElementById('taskPriority').value.trim();

  if (title === '' || description === '' || dueDate === '' || priority === '') {
    alert('請填寫所有欄位');
    return;
  }

  const existing = currentProject.tasks.find((t) => t.title === title);
  if (existing) {
    alert('已經有相同標題的任務囉！請使用不同的名稱。');
    return;
  }

  const task = new Task(title, description, dueDate, priority);
  currentProject.addTask(task);
  renderTaskList(currentProject.tasks);
  saveProjects(projects);

  taskDialog.close();
  taskForm.reset();
});

cancelDialog.addEventListener('click', () => {
  taskDialog.close();
});

let projects = loadProjects();
let currentProject;

if (projects.length === 0) {
  const defaultProject = new Project('Inbox');
  projects.push(defaultProject);
  currentProject = defaultProject;
  saveProjects(projects);
} else {
  currentProject = projects[0];
}

renderProjectList(projects);
renderTaskList(currentProject ? currentProject.tasks : []);

document.getElementById('addProject').addEventListener('click', () => {
  const ProjectName = prompt('請輸入專案名稱');
  if (ProjectName === null || ProjectName.trim() === '') {
    return;
  }
  if (projects.find((p) => p.name === ProjectName)) {
    alert('專案已存在');
    return;
  }

  const newProject = new Project(ProjectName);
  projects.push(newProject);
  saveProjects(projects);
  renderProjectList(projects);
});

document.getElementById('deleteProject').addEventListener('click', () => {
  if (confirm('確定要刪除專案嗎？')) {
    const deleted = currentProject;
    projects = projects.filter((p) => p !== deleted);

    if (currentProject === deleted) {
      currentProject = projects[0] || null;
    }

    renderTaskList(currentProject ? currentProject.tasks : []);
    saveProjects(projects);
    renderProjectList(projects);
  }
});

function renderProjectList(projects) {
  const projectList = document.getElementById('ProjectList');
  projectList.innerHTML = '';
  projects.forEach((project) => {
    const li = document.createElement('li');
    li.textContent = project.name;
    li.classList.add('project');
    if (project === currentProject) {
      li.classList.add('active');
    }
    li.addEventListener('click', () => {
      currentProject = project;
      console.log('切換專案為：', currentProject.name);
      document.getElementById('currentProject').textContent = currentProject.name;
      renderTaskList(currentProject.tasks);
      renderProjectList(projects);
    });
    projectList.appendChild(li);
  });
}

function handleDelete(task) {
  console.log('刪除任務：', task.title);
  currentProject.removeTask(task);
  renderTaskList(currentProject.tasks);
  saveProjects(projects);
}

function handleToggle(task) {
  task.toggleCompleted();
  renderTaskList(currentProject.tasks);
  saveProjects(projects);
}

function renderTaskList(tasks) {
  taskList.innerHTML = '';
  console.log('目前任務數：', tasks.length);

  const header = document.getElementById('currentProject');

  if (!currentProject) {
    header.textContent = '尚未選擇專案';
    return;
  }

  header.textContent = currentProject.name;

  const priorityOrder = { High: 3, Medium: 2, Low: 1 };
  const sortedTasks = [...tasks].sort((a, b) => {
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  sortedTasks.forEach((task) => {
    const li = createTaskElement(task, handleDelete, handleToggle);
    taskList.appendChild(li);
  });
}

clearButton.addEventListener('click', function () {
  if (confirm('確定要刪除所有任務嗎？')) {
    currentProject.tasks = [];
    renderTaskList(currentProject.tasks);
    saveProjects(projects);
  }
});
