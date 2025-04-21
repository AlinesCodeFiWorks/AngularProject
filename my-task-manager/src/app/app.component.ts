import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { CommonModule } from '@angular/common';
import { ShareToDoListComponent } from './share-to-do-list/share-to-do-list.component';

@Component({
  selector: 'app-root',
  imports: [
    FooterComponent,
    HeaderComponent,
    TaskFormComponent,
    ToDoListComponent,
    CommonModule,
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'my-task-manager';
}
