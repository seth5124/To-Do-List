export class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
  }

  get tasks() {
    return this._tasks;
  }

  /**
   * returns all tasks in its project arranged in individual objects by date
   * @returns An object containing individual objects containing each date's tasks
   */
  tasksByDate() {
    if (this.tasks == []) return {};

    //Sorts tasks into individual object arrays
    let byDate = this.tasks.reduce((dayEntries, task) => {
      let dueDate = task.dueDate;
      if (dayEntries[dueDate] == null) dayEntries[dueDate] = [];
      dayEntries[dueDate].push(task);
      return dayEntries;
    }, {});

    //Sorts collections of object by dueDate
    let sortedKeys = Object.keys(byDate);
    sortedKeys = sortedKeys.sort((a, b) => {
      a = new Date(a);
      b = new Date(b);
      return a - b;
    });
    let sortedByDate = {};
    sortedKeys.forEach((key) => {
      sortedByDate[key] = byDate[key];
    });
    return sortedByDate;
  }

  set tasks(tasks) {
    this._tasks = tasks;
  }

  /**
   * Adds task to project
   * @param {Task} task
   */
  addTask(task) {
    this.tasks.push(task);
  }
  /**
   * Removes task given the task's index
   * @param {Index} taskIndex
   */
  removeTask(taskIndex) {
    this.tasks.splice(taskIndex, 1);
  }

  getTaskIndex(task) {
    return this.tasks.indexOf(task);
  }

  get name() {
    return this._name;
  }
  set name(name) {
    this._name = name;
  }
}
