import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { feedback } from './feedback.model';
import { FeedbackService } from './feedback.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,FormsModule,CommonModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [FeedbackService]
})
export class AppComponent {
  title = 'feedBackForm';
  feedbacks: feedback[] = [];
  feedbackForm: feedback = {
    name: '',
    course: 'Angular',
    comment: 'Excellent'
  };
  
  constructor(private feedbackService: FeedbackService) {}
  ngOnInit() {
    this.feedbackService.getTasks(this.feedbacks).subscribe(fb => 
        this.feedbacks = fb);
  }
ondelete(id:Number) {
  if(!id){
      return;
    }
    this.feedbackService.deleteTask(id).subscribe(() => {
      this.feedbacks = this.feedbacks.filter((f) => f.id !== id);
  });
  this.resetForm();
}
onedit(feedback:feedback) {
  this.feedbackForm = {...feedback};
}

submitOrUpdateFeedback() {
  if(this.feedbackForm.id) {
      this.feedbackService.editTask(this.feedbackForm.id, this.feedbackForm).subscribe((updated) => {
        const index = this.feedbacks.findIndex((feedback) => feedback.id === updated.id);
        if(index !== -1) {
          this.feedbacks[index] = updated;
          this.resetForm();
        }
      })
    }
    else {
      this.feedbackService.addTask(this.feedbackForm).subscribe((newFeedback: feedback) => {
      this.feedbacks.push(newFeedback);
      this.resetForm();
    })
    }
}
  resetForm() {
    this.feedbackForm = {
        name: '',
        course: 'Angular',
        comment: 'Excellent'
    }
  }
}