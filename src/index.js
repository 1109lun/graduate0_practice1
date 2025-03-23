import './style.css';

document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task');
    const addButton = document.getElementById('add');
    const taskList = document.getElementById('taskList');
    const clearButton = document.getElementById('clearall');

    loadTasks();

    function createTaskElement(task , completed){
        let li = document.createElement('li') ;

        let checkbox = document.createElement('input') ;
        checkbox.type = 'checkbox';
        checkbox.classList.add('task-checkbox');
        checkbox.checked = completed;
        if (completed) {
            li.classList.add('done');
        }

        let taskLabel = document.createElement('span') ;
        taskLabel.textContent = task;

        let deleteButton = document.createElement('button');
        deleteButton.textContent = '刪除' ;

        let finishButton = document.createElement('button');
        finishButton.textContent = completed ? '未完成' : '已完成' ;

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

        let li = createTaskElement(taskText , false);
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
            let checkbox = li.querySelector('.task-checkbox');
            let textLabel = li.querySelector('span');

            tasks.push({
                text : textLabel.textContent,
                completed : checkbox.checked
            }) ;
        });

        localStorage.setItem("tasks" , JSON.stringify(tasks));
    }

    function loadTasks(){
        let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [] ;

        savedTasks.forEach(task => {
            let li = createTaskElement(task.text , task.completed);
            taskList.appendChild(li);
        });
    }
}) ;