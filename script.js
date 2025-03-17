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
        li.textContent = taskText;

        let deleteButton = document.createElement('button');
        deleteButton.textContent = '刪除任務' ;

        deleteButton.addEventListener('click' , function() {
            li.remove();
        })

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