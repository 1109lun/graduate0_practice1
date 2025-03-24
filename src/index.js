import './style.css';
import Task from './modules/Task.js';

document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task');
    const addButton = document.getElementById('add');
    const taskList = document.getElementById('taskList');
    const clearButton = document.getElementById('clearall');

    loadTasks();

    function createTaskElement(task){
        let li = document.createElement('li') ;

        const checkbox = document.createElement('input') ;
        checkbox.type = 'checkbox';
        checkbox.classList.add('task-checkbox');
        checkbox.checked = task.completed;
        if (task.completed) {
            li.classList.add('done');
        }

        const taskLabel = document.createElement('span') ;
        taskLabel.textContent = task.title;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '刪除' ;

        const finishButton = document.createElement('button');
        finishButton.textContent = task.completed ? '未完成' : '已完成' ;

        checkbox.addEventListener('change' , function(){
            li.classList.toggle('done' , checkbox.checked);
            finishButton.textContent = checkbox.checked ? '未完成' : '已完成';
            saveTasks();
        });

        finishButton.addEventListener('click' , function(){
            checkbox.checked = !checkbox.checked;
            li.classList.toggle('done' , checkbox.checked);
            finishButton.textContent = checkbox.checked ? '未完成' : '已完成';
            saveTasks();
        })

        deleteButton.addEventListener('click' , function(){
            if (confirm('確定要刪除嗎？') ){
                li.remove();
                saveTasks();
            }
        }); 

        li.appendChild(checkbox);
        li.appendChild(taskLabel);
        li.appendChild(deleteButton);
        li.appendChild(finishButton);
        //taskList.appendChild(li);

        return li;
        
    }

    function addTask(){
        let taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('請輸入任務')
            return ;
        }

        const task = new Task(taskText);
        let li = createTaskElement(task);
        taskList.appendChild(li);
        taskInput.value = '';

        saveTasks();

        console.log("目前的任務列表：", localStorage.getItem("tasks"));

    }
    
    addButton.addEventListener('click' , addTask);

    taskInput.addEventListener('keypress' , function(event){
        if (event.key === 'Enter'){
            addTask();
        }
    })

    clearButton.addEventListener('click' , function(){
        if (confirm('確定要刪除所有任務嗎？')){
            taskList.innerHTML = '';
            localStorage.removeItem('tasks');
        }
    });
    
    function saveTasks(){
        let tasks = [];
        document.querySelectorAll('#taskList li').forEach(function(li){
            const checkbox = li.querySelector('.task-checkbox');
            const textLabel = li.querySelector('span');

            const task = new Task(
                textLabel.textContent,
                '',
                '',
                'normal',
            ) ;

            task.completed = checkbox.checked;
            tasks.push(task);
        });

        localStorage.setItem("tasks" , JSON.stringify(tasks));
    }

    function loadTasks(){
        let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [] ;

        savedTasks.forEach(task => {
            task = new Task(task.title , task.description , task.dueDate , task.priority);
            let li = createTaskElement(task);
            taskList.appendChild(li);
        });
    }
}) ;