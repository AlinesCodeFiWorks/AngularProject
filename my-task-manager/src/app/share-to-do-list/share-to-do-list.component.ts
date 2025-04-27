import { Component, inject } from '@angular/core';
import { TasksService } from '../shared/services/tasks.service';
import { FeedbackService } from '../shared/services/feedback.service';
import { SharedModule } from '../shared/shared.module';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-share-to-do-list',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './share-to-do-list.component.html',
  styleUrl: './share-to-do-list.component.css',
})
export class ShareToDoListComponent {
  constructor(
    private tasksService: TasksService,
    public feedbackService: FeedbackService,
    public dialogRef: MatDialogRef<ShareToDoListComponent>
  ) {}

  getEmailAddress() {
    return this.feedbackService.emailAddress;
  }

  toggleForm() {
    this.feedbackService.toggleShareForm();
  }

  emailMessage() {
    const tasks = this.tasksService.getTasks();
    this.feedbackService.logSharedTasks(tasks());
    this.feedbackService.resetShareForm();
    this.dialogRef.close();
  }
}
