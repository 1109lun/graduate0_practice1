import Task from "./Task";

export function saveTasks(taskListEl) {
    const tasks = [];
    taskListEl.querySelectorAll('li').forEach(li => {
        const checkbox = li.querySelector('.task-checkbox');
        const title = li.querySelector('span').textContent;

        const task = new Task(title, '', '', 'normal');
        task.completed = checkbox.checked;
        tasks.push(task);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("目前的任務列表：");
    console.table(JSON.parse(localStorage.getItem("tasks")));
}

export function loadTasks() {
    const saved = JSON.parse(localStorage.getItem('tasks')) || [];
    return saved.map(
        (t) => new Task(t.title, t.description, t.dueDate, t.priority, t.completed)
    );
}