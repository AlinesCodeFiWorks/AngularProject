# My Task Manager App

## Project Overview

This project consisted of developing a simple task management app using Angular 19. Users can add, edit, delete, and organize tasks with subtasks. Each task may include a description, due date, and subtasks. The app also includes a share feature with visual feedback through which users may share their to-do list to the provided email address.

## Setup Instructions

1. Clone this repository,
2. Run `npm install`,
3. Run `ng serve`,
4. Open `http://localhost:4200` in your browser.

## CRUD Demonstration

- Create tasks (with optional description and due date)
- Read the full to-do list with subtasks
- Update tasks and subtasks via inline editing
- Delete tasks and individual subtasks
- Bonus: share the list via a dialog form (console-simulated, to be expanded upon back-end implementation)

## Reflection

The main focus of this project was to create a clean and basic application with advanced features (or as advanced as I could make them at the moment).

Some of the main takeaways include:

- How to use Angular tools to build a working application.
- Practiced turning envisioned features into actionable steps for the development process.
- How to structure Angular apps with signals and services.
- How to implement Angular materials to achieve a clean and modern UI.
- Best practices for separating logic into services.

Notable design choices include:

- Using Angular Materials for featurres such as the to-do list check boxes, the share dialog, and subsequent snack bar notification.
- Implementing more complex UI features such as nested checkboxes, and inline editing with real-time updates.
- Toggling stacked information for a sleek design.

Main challenges include:

1. Turning envisioned features into actionable steps and visualizing it as blocks of code. AI helped greatly with scoping and mapping out the project at its inception, but also when introducing new features and iterating through the design process.
2. Confusion with Angular syntax. Due to only recently learning Angular, a lot of very simple mistakes were made along the way. Practicing and getting caught in every single one of them seems to be the way to go.

3. Restructuring subtasks format and input. Subtasks were initially part of the task submission form, however, this input only took a string whereas the intention was to acommodate multiple subtasks per tasks (as set in the interface) in the form of an array. The developed solution was to have said input dynamically displayed under and bound to each task. Instead of parsing inputs and separating them by commas, this allowed for multiple input boxes while keeping the UI clean and intuitive.

4. Updating entries. Instead of adding a new form or feature to update existing entries, inline editing instead would allow for a sleek, better-organized interface. In order to acoomplish this, a signal was created to track which task is being edited as well as 'start/stop editing' functions. The 'update' function is then run once editing is completed and the 'eneter' key activated. The UI was kept updated accordingly through the use of @if to display the existing entry when idle (editing signal empty), and to display the appropriate input when the signal is used at the click of the targeted entry.

Honorable mention:

- The (blur) event allowed for clean and dynamic interactions (fired when input loses focus - like when user clicks away or changes tabs).
- Date comparisons for signaling overdue tasks.

Next steps:

1. Add task and subtask IDs for more accurate input handling.
2. Extend inline editing features to include due date and task descriptions as well.
3. Better organize code for improved readability.
4. Implement new features: user validation, login page with authentication, implement backend and activate email-sharing feature.
