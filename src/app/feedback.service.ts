import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { feedback } from './feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:3000/feedback';

  getTasks(task : feedback[]) : Observable<feedback[]> {
    return this.http.get<feedback[]>(this.apiUrl);
  }
  addTask(task: feedback): Observable<feedback> {
    return this.http.post<feedback>(this.apiUrl, task);
  }
  editTask(id:Number,task: feedback): Observable<feedback> {
    return this.http.put<feedback>(`${this.apiUrl}/${task.id}`, task);
  }
  deleteTask(id:Number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
