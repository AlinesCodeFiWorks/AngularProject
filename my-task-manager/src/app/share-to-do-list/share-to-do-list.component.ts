import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../shared/services/tasks.service';

@Component({
  selector: 'app-share-to-do-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './share-to-do-list.component.html',
  styleUrl: './share-to-do-list.component.css',
})
export class ShareToDoListComponent {
  tasksService = inject(TasksService);

  emailAddress: string = '';

  //TODO Move the functions below to the service once properly working

  getEmailAddress() {
    return this.emailAddress;
  }

  emailMessage() {
    // this.getEmailAddress();
    // if (this.emailAddress) {
    // this.shareLink = `mailto:${this.emailAddress}?subject=To-Do List&body=${this.tasksService.getTasks()}`;
    this.getEmailAddress();
    console.log(
      `mailto:${this.emailAddress} To-do: ${this.tasksService.getTasks()}`
    );
    // }
  }
  ngOnSubmit() {
    this.emailMessage();
  }
}
