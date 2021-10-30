export class Task {
  constructor(name, description, dueDate) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.tags = [];
    this.priority = 5; //Priority is ranked from 5 to 1. 1 being the highest
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
  isDueToday() {
    let today = new Date();
    return (
      this.dueDate.getDate() == today.getDate() &&
      this.dueDate.getMonth() == today.getMonth() &&
      this.dueDate.getFullYear() == today.getFullYear()
    );
  }
  isDueTomorrow() {
    let today = new Date();
    return (
      this.dueDate.getDate() == today.getDate() + 1 &&
      this.dueDate.getMonth() == today.getMonth() &&
      this.dueDate.getFullYear() == today.getFullYear()
    );
  }
  get tags() {
    return this._tags;
  }
  set tags(tags) {
    this._tags = tags;
  }
  addTag(tag) {
    this._tags.push(tag);
  }
  removeTag(tagIndex) {
    this.tags.splice(tagIndex, 1);
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
