import Project from './Project';
import Task from './Task';

export function saveProjects(projects) {
  localStorage.setItem('projects', JSON.stringify(projects));
  console.log('目前的專案列表：');
  console.table(JSON.parse(localStorage.getItem('projects')));
}

export function loadProjects() {
  const raw = JSON.parse(localStorage.getItem('projects')) || [];

  return raw.map((p) => {
    const tasks = (p.tasks || []).map(
      (t) => new Task(t.title, t.description, t.dueDate, t.priority, t.completed)
    );
    return new Project(p.name, tasks);
  });
}
