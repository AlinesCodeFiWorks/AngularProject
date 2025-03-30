import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { UserFeedbackComponent } from './user-feedback/user-feedback.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    FooterComponent,
    HeaderComponent,
    TaskFormComponent,
    ToDoListComponent,
    UserFeedbackComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'my-task-manager';
}
