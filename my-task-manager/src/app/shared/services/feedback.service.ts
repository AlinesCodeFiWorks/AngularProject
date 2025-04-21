import { Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  constructor(private snackBar: MatSnackBar) {}
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
    this.snackBar.open('To-do list shared!', 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}
