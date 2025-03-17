document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task');
    const addButton = document.getElementById('add');
    const taskList = document.getElementById('taskList');

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
        taskList.appendChild(li);
        taskInput.value = '';
    }
    
    addButton.addEventListener('click' , addTask);

    taskInput.addEventListener('keypress' , function(event){
        if (event.key === 'Enter'){
            addTask();
        }
    })


})