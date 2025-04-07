export default class Task {
  constructor(title, description = '', dueDate = '', priority = 'normal', completed = false) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }
}
