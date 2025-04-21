import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  showShareForm = signal(false);
  emailAddress = signal('');

  toggleShareForm() {
    this.showShareForm.set(!this.showShareForm());
  }

  resetShareForm() {
    this.emailAddress.set('');
    this.showShareForm.set(false);
  }

  logSharedTasks(tasks: any[]) {
    console.log(`Sharing to-do list with: ${this.emailAddress()}`);
    console.log(JSON.stringify(tasks, null, 2));
  }
}
