import { format } from 'date-fns';

export function createTaskElement(task , onDelete , onToggle) {
    const li = document.createElement('li') ;

    const checkbox = document.createElement('input') ;
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');
    checkbox.checked = task.completed;

    const taskTextContainer = document.createElement('div') ;
    taskTextContainer.classList.add('task-text');

    const title = document.createElement('div') ;
    title.classList.add('task-title');
    title.textContent = task.title ;

    const description = document.createElement('div') ;
    description.textContent = task.description ;
    description.classList.add('task-description');

    const formattedDate = format(new Date(task.dueDate), 'yyyy/MM/dd');
    const dueDate = document.createElement('div') ;
    dueDate.textContent = `到期日：${formattedDate}`;
    dueDate.classList.add('task-dueDate');

    const priority = document.createElement('div') ;
    priority.textContent = `優先度：${task.priority}`;
    priority.classList.add('task-priority');

    if (task.priority === 'High') {
        priority.classList.add('high');
    } else if (task.priority === 'Medium') {
        priority.classList.add('medium');
    } else if (task.priority === 'Low') {
        priority.classList.add('low');
    }

    taskTextContainer.appendChild(title);
    taskTextContainer.appendChild(description);
    taskTextContainer.appendChild(dueDate);
    taskTextContainer.appendChild(priority);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '刪除' ;

    const finishButton = document.createElement('button');
    finishButton.textContent = task.completed ? '未完成' : '已完成' ;

    checkbox.addEventListener('change' , () => {
        onToggle(task) ;
    });

    finishButton.addEventListener('click' , () => {
        onToggle(task);
    });

    deleteButton.addEventListener('click' , function(){
        if (confirm('確定要刪除嗎？') ){
            onDelete(task); ;
        }
    }); 

    if (task.completed) {
        li.classList.add('done');
    };

    li.appendChild(checkbox);
    li.appendChild(taskTextContainer);
    li.appendChild(deleteButton);
    li.appendChild(finishButton);

    return li;
} 