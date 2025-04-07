import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-share-to-do-list',
  imports: [FormsModule],
  templateUrl: './share-to-do-list.component.html',
  styleUrl: './share-to-do-list.component.css',
})
export class ShareToDoListComponent {
  tasksService = inject(TasksService);
  shareLink: string = '';
}
