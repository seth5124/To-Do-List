import { Project } from "./project.js";
import { Task } from "./task.js";
import { v4 as uuidv4 } from "uuid";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { doc, setDoc,getFirestore,collection,query, getDocs, where} from "firebase/firestore";
import * as firebaseConfig from "../keys/firestore.json";

const configData = firebaseConfig;

const firebaseConfigData = {
  apiKey: configData.apiKey,

  authDomain: configData.authDomain,

  projectId: configData.projectId,

  storageBucket: configData.storageBucket,

  messagingSenderId: configData.messagingSenderId,

  appId: configData.appId,

  measurementId: configData.measurementId,
};



const app = initializeApp(firebaseConfigData);
const analytics = getAnalytics(app);
const db = getFirestore();



//This is a project object containing all the tasks under Home
let homeProject = new Project({ name: 'Home', isHomeProject: true });

//Project List service as the "database". This will at some point be replaced by an actual database
let projects = {};

/**
 * Checks for existence of Home project and adds the project if it doesn't exist
 */
async function initHome(){
  // let homeExists = false;
    
  //   const docSnap = await getDocs(collection(db,'projects'))
  //   docSnap.forEach((doc)=>{
  //     if(doc.data().isHomeProject){
  //       homeExists = true;
  //     }
  //   }
  //   )
  //   if(!homeExists){
  //     addProject(homeProject);
  //   }
  
  
  let projectQuery = query(collection(db, 'projects'), where('isHomeProject', '==', 'true'));
  let projects = await getDocs(projectQuery);
  console.log(projects);
  if((await getDocs(projectQuery)).empty){
    console.log('No home project');
    addProject(homeProject);
  }
  else{
    console.log('found a project');
  }

}
initHome(); 



/**
 * Adds a project to the database
 * @param {Project} project - Project object to add to the database
 */
export async function addProject(project) {
  if (!(project instanceof Project)) {
    console.log(`Not a project`);
    return;
  }
  projects[project.id] = project;

  await setDoc(doc(db,'projects',project.id),{
    name:project.name,
    tasks:project.tasks,
    isHomeProject:project.isHomeProject
  }).then(()=>{
    console.log('Added project');
  })

}

/**
 * Iterates through each project's tasks and returns a set of all tags that exist
 * @returns List of tags that exist across all tasks across all projects
 */
export function getExistingTags() {
  let existingTags = [];
  let projects = getProjects();
  for (let project in projects) {
    let tasks = projects[project].tasks;
    for (let task in tasks) {
      let tags = tasks[task].tags;
      for (let tag in tags) {
        if (!existingTags.includes(tags[tag])) {
          existingTags.push(tags[tag]);
        }
      }
    }
  }

  return existingTags;
}
/**
 * Gets projects from the database
 * @returns {Object} Object containing project list
 */
export function getProjects() {
  return projects;
}

/**
 * Gets the Home project
 * @returns {Project} Project - Home project
 */
export function getHomeProject() {
  return homeProject;
}

/**
 * Deletes a project from the database
 * @param {Project} project - Project to delete
 */
export function deleteProject(project) {
  delete projects[project.id];
}
/**
 * Adds a task to a given project
 * @param {Project} project - Project to add the task to
 * @param {Task} task - Task to add to the project
 */
export function addTaskToProject(project, task) {
  project.addTask(task);
}

/**
 * Removes a task from a given project
 * @param {Project} project - Project to remove task from
 * @param {Task} task - task to remove
 */
export function removeTaskFromProject(project, task) {
  project.removeTask(task);
}

/**
 * Deletes given task
 * @param {Task} taskToDelete Specifies task being deleted
 */
export function deleteTask(taskToDelete) {
  let projects = getProjects();
  for (let project in projects) {
    project = projects[project];
    let tasks = project.tasks;
    for (let task in tasks) {
      task = tasks[task];
      if (task.id == taskToDelete.id) {
        project.removeTask(task);
      }
    }
  }
}

/**
 * Gets a list of tasks across all projects that have the specififed tag
 * @param {Tag} tag Tag to check for
 * @returns List of tasks with given tag
 */
export function tasksWithTag(tag) {
  let tasksWithTag = [];
  let projects = getProjects();
  for (let project in projects) {
    let tasks = projects[project].tasks;
    for (let task in tasks) {
      if (tasks[task].tags.includes(tag)) {
        tasksWithTag.push(tasks[task]);
      }
    }
  }
  return tasksWithTag;
}
