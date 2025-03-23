export default class Task {
    constructor(title , discription = '' , dueDate = '' , priority = 'normal') {
        this.title = title ;
        this.discription = discription ;
        this.dueDate = dueDate ;
        this.priority = priority ;
        this.completed = false ;
    }

    toggleCompleted() {
        this.completed = !this.completed ;
    }
}    