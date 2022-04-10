import { v4 as uuidv4 } from "uuid";
import { updateLocalStorage } from "./Controller";
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
     * @param {UUID} project - ID of the project that the task is associated with
     */
    constructor({
        name,
        description,
        dueDate,
        priority = 2,
        project,
        isDone = false,
        tags = [],
        notes = [],
    }) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.tags = tags;
        this.priority = priority;
        this.isDone = isDone;
        this.notes = notes;
        this.id = uuidv4();
        this.project = project;
    }

    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get project() {
        return this._project;
    }
    set project(project) {
        this._project = project;
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
        document.dispatchEvent(
            new CustomEvent("tagsUpdated", {
                detail: {
                    task: this,
                },
            })
        );
    }
    /**
     * Gets index of tag and splices it from the tag list
     * @param {Tag} tag tag to remove
     */
    removeTag(tag) {
        this.tags.splice(this.tags.indexOf(tag), 1);
        document.dispatchEvent(
            new CustomEvent("tagsUpdated", {
                detail: {
                    task: this,
                },
            })
        );
    }
    get priority() {
        return this._priority;
    }
    /**
     * Maps easily understandable names to integer priority values
     * @returns Name corresponding to the priority value
     */
    get priorityName() {
        switch (this._priority) {
            case "0":
                return "Emergency";
            case "1":
                return "Urgent";
            case "2":
                return "Routine";
        }
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
        updateLocalStorage();
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
