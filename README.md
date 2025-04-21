# AngularProject

Using the README file for brainstorming purposes for now.

Project due: Apr 21

General Requirements

Project Setup:
Use Angular (version 19+) for the front-end. Focus on a MVP(Minimum Viable Product)
Write all logic in TypeScript, and Utilize Signals().
Use Standalone Components, and new @For @If Decorators

Shared Module (SharedModule):
Create a shared module (or file) that bundles common Angular modules, directives, pipes, etc. (e.g., CommonModule, FormsModule, ReactiveFormsModule), so you don’t need to import them repeatedly in every standalone component.

Basic CRUD Operations:
Demonstrate Create, Read, Update, and Delete for a chosen data entity (e.g., “Song,” “Contact,” “Book,” etc.).

Angular Essentials:
Components: At least 3–4 standalone components to organize your UI.
Services: At least one service to handle data logic (add, delete, edit, retrieve).
Templates: Use Angular’s template features (e.g., @For, bindings) to display data and handle user interactions.
Debugging: Use the Angular CLI, console logs, or other debugging tools to ensure your code works as intended.

Layout & Styling:
Incorporate your HTML, CSS, and JS skills within the Angular ecosystem.
You may use any CSS framework (Bootstrap, Material, etc.) or custom styling.

Optional Enhancements:
Routing: Use Angular Router (standalone mode) to create multiple screens (e.g., list view vs. details/edit view).
Validation: Validate user inputs (e.g., required fields, correct formats).
User Experience: Provide feedback (success/error messages) after each CRUD action.

Selected Project Idea

To-Do Task Manager
Entity: “Tasks,” each with title, description, deadline, completed (boolean).
Create: Add a new task.
Read: List all tasks (e.g., in a table or card layout).
Update: Mark tasks as complete or edit task info.
Delete: Remove a task from the list.

Deliverables

Source Code:
A well-structured Angular 19 project with standalone components, a shared module, and at least one service.

README.md:
Setup Instructions: How to install and run (npm install then ng serve, etc.).
Project Overview: Briefly explain the concept (e.g., a music playlist).
CRUD Demonstration: Show how to perform Create, Read, Update, and Delete.
Optional: Add screenshots or a short video link demonstrating the app.

//TODO Reflection / Documentation:
Summarize any challenges you encountered and how you solved them.
Mention any notable features or design decisions.
//Main focus was to create a clean and basic application with advanced features (or as advanced as I could make them lol)
//General challenges:
//1. turning envisioned features into actionable steps, visualizing it as blocks of code. AI helped greatly with scoping and mapping out this part.
//2. confusing Angular syntax. Practicing and getting caught in all the mistakes seems to be the way to go.
//More specific features
//1. Problem: restructuring subtasks format and input. It was initially part of the task submission form but only took a string while the intention was to acommodate multiple subtasks per tasks (as set in the interface) as an array. Solution: had the input dynamically displayed under and bound to each task. Instead of parsing inputs and separating them by commas, this allowed for multiple input boxes while keeping the UI clean!
//2. Problem: updating entries. Instead of adding a new form or feature to update existing entries, the the UI would be much cleaner with inline editing instead. Solution: created signal to track which task is being edited as well as 'start/stop editing' functions and ran the 'update' function once editing was done at 'keydown.enter' event! Used @if to keep the UI updated accordingly - to just display the existing entry when not editing (editing signal empty), and to display a form when the signal is used at the click of the existing task/subtask!
//Honorable mentions: the (blur) event allowed for super clean and dynamic actions (fired when input loses focus - like when user clicks away or changes tabs)!
//Next steps: 1. add task and subtask IDs for more accurate input handling. 2. extend inline editing features to due date and task descriptions as well.
