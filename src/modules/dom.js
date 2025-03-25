export function createTaskElement(task , onDelete , onToggle) {
    const li = document.createElement('li') ;

    const checkbox = document.createElement('input') ;
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');
    checkbox.checked = task.completed;

    const taskLabel = document.createElement('span') ;
    taskLabel.textContent = task.title;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '刪除' ;

    const finishButton = document.createElement('button');
    finishButton.textContent = task.completed ? '未完成' : '已完成' ;

    checkbox.addEventListener('change' , () => {
        onToggle(task) ;
    });

    finishButton.addEventListener('click' , () => {
        task.completed = !task.completed ;
        checkbox.checked = task.completed ;
        onToggle(task);
    });

    deleteButton.addEventListener('click' , function(){
        if (confirm('確定要刪除嗎？') ){
            onDelete(li) ;
        }
    }); 

    if (task.completed) {
        li.classList.add('done');
    };

    li.appendChild(checkbox);
    li.appendChild(taskLabel);
    li.appendChild(deleteButton);
    li.appendChild(finishButton);

    return li;
} 