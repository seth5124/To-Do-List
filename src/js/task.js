
/**
 * tasks hold a name, description and notes as well as
 * a priority from 5 to 1 and a list of tags
 */
export class Task {
 
  /**
   * 
   * @param {String} name - Name of the task 
   * @param {String} description - Description of the task
   * @param {Date} dueDate - Date the task is due
   */
  constructor(name, description, dueDate,priority = 5) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.tags = [];
    this.priority = priority;
    this.isDone = false;
    this.notes = [];
  }

  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
  }
  get description() {
    return this._description;
  }
  set description(description) {
    this._description = description;
  }

  get dueDate() {
    return this._dueDate;
  }

  set dueDate(date) {
    this._dueDate = date;
  }

  get tags() {
    return this._tags;
  }
  set tags(tags) {
    this._tags = tags;
  }
  /**
   * Adds a new tag to the task
   * @param {String} tag Name of new tag
   */
  addTag(tag) {
    this._tags.push(tag);
    document.dispatchEvent(new CustomEvent('tagsUpdated',{detail:{
      task:this
  }}))
  }
  removeTag(tag) {
    this.tags.splice(this.tags.indexOf(tag), 1);
    document.dispatchEvent(new CustomEvent('tagsUpdated',{detail:{
      task:this
  }}))
  }
  get priority() {
    return this._priority;
  }
  set priority(priority) {
    this._priority = priority;
  }
  get isDone() {
    return this._isDone;
  }
  set isDone(done) {
    this._isDone = done;
  }
  toggleDone() {
    this.isDone = !this.isDone;
  }
  get notes() {
    return this._notes;
  }
  set notes(notes) {
    this._notes = notes;
  }
  addNote(note) {
    this.notes.push(note);
  }
  removeNote(note) {
    let noteIndex = this.notes.indexOf(note);
    this.notes.splice(noteIndex, 1);
  }
}
