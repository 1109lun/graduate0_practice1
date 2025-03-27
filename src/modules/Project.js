export default class Project {
    constructor(name , tasks = []){
        this.name = name;
        this.tasks = tasks;
    }

    addTask(task){
        this.tasks.push(task);
    }

    removeTask(task){
        this.tasks = this.tasks.filter(t => t.title !== task.title);
    }

    getTasks(){
        return this.tasks;
    }
}