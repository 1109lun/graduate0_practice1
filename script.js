document.addEventListener('DOMContentLoaded' , function() {
    const taskinput = document.getElementById('task');
    const addButton = document.getElementById('add') ;
    const tasklist = document.getElementById('taskList') ;

    function addTask() {
        let taskText = taskinput.value.trim();

        if (taskText === '') {
            alert('請輸入任務');
            return ;
        }

        let li = document.createElement('li') ;
        li.textContent = taskText;

    }
});