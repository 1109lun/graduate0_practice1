document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task');
    const addButton = document.getElementById('add');
    const taskList = document.getElementById('taskList');

    loadTasks();

    function addTask(){
        let taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('請輸入任務')
            return ;
        }

        let li = document.createElement('li') ;

        let deleteButton = document.createElement('button');
        deleteButton.textContent = '刪除任務' ;

        deleteButton.addEventListener('click' , function() {
            li.remove();
        })

        let finishButton = document.createElement('button');
        finishButton.textContent = '已完成' ;

        finishButton.addEventListener('click' , function(){
            li.classList.toggle('done');
            checkbox.checked = !checkbox.checked;
        })

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('task-checkbox');

        checkbox.addEventListener('change', function(){
            li.classList.toggle('done' , checkbox.checked);
        })

        let textLabel = document.createElement('span');
        textLabel.textContent = taskText;

        li.appendChild(checkbox);
        li.appendChild(textLabel);
        li.appendChild(deleteButton);
        li.appendChild(finishButton);
        taskList.appendChild(li);
        taskInput.value = '';
    }
    
    addButton.addEventListener('click' , addTask);

    taskInput.addEventListener('keypress' , function(event){
        if (event.key === 'Enter'){
            addTask();
        }
    })

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
            let li = document.createElement('li') ;

            let checkbox = document.createElement('input') ;
            checkbox.type = 'checkbox';
            checkbox.classList.add('task-checkbox');
            checkbox.checked = task.completed;
            if (task.completed) {
                li.classList.add('done');
            }

            checkbox.addEventListener('change' , function(){
                li.classList.toggle('completed' , checkbox.checked);
                saveTasks();
            }) ;

            let taskLabel = document.createElement('span') ;
            taskLabel.textContent = task.text;

            let deleteButton = document.createElement('button');
            deleteButton.textContent = '刪除' ;
            deleteButton.addEventListener('click' , function(event){
                event.stopPropagation();
                li.remove();
                saveTasks();
            });

            li.appendChild(checkbox);
            li.appendChild(taskLabel);
            li.appendChild(deleteButton);
            taskList.appendChild(li);
        }) ;
    }
}) ;