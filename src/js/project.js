
import { v4 as uuidv4 } from "uuid";

/**
 * Projects hold and arrange tasks and their due dates
 * @param {String} name - Name of the project
 */
export class Project {
  constructor({name, tasks = [], id = uuidv4(), isHomeProject = false, isTemp = false}) {
    this.name = name;
    this.id = id;
    this.tasks = tasks;
    this.isHomeProject = isHomeProject;
    this.isTemp = isTemp;
  }

  get tasks() {
    return this._tasks;
  }

  set tasks(tasks) {
    this._tasks = tasks;
  }
  get isHomeProject(){
    return this._isHomeProject;
  }
  set isHomeProject(val){
    this._isHomeProject = val;
  }

  /**
   * returns all tasks in its project arranged in individual objects by date
   * @returns {Object} Object - containing entries for each date with tasks
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
  removeTask(task) {
    let taskIndex = this.tasks.indexOf(task);
    this.tasks.splice(taskIndex, 1);
  }
  
  get name() {
    if(this.isHomeProject){
      return "Home";
    }
    else{
    return this._name;
    }
  }
  set name(name) {
    this._name = name;
  }

  get id() {
    return this._id;
  }
  set id(id){
    this._id=id;
  }
  
  /**
   * Sorts each date entry's tasks by their priority
   * @returns Task list sorted by date then by priority
   */
  getTasksSorted(){
    let dates = this.tasksByDate();
    for(let date in dates){
      dates[date] = dates[date].sort((a,b)=>{
        return a.priority - b.priority;
      })
    }
    return dates;
  }
}
