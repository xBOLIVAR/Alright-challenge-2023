import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  userRegister(user: { email: string; password: string }): Observable<object> {
    return this.http.post(`${environment.localhost}/register`, user);
  }

  userLogin(user: { email: string; password: string }): Observable<object> {
    return this.http.post(`${environment.localhost}/login`, user);
  }

  getReviewers() {
    return new Promise<any>((resolve, reject) => {
      const subscriptionService: Subscription = this.http
        .get(`${environment.localhost}/users/reviewers`)
        .subscribe({
          next: (data: any) => {
            subscriptionService.unsubscribe();
            resolve(data);
          },
          error: (error) => {
            subscriptionService.unsubscribe();
            reject(error);
          },
        });
    });
  }

  setReviewDocuments(
    idUser: string,
    datoDocument: { idDocument: string; title: string; owner: string | null }
  ) {
    return new Promise<any>((resolve, reject) => {
      const subscriptionService: Subscription = this.http
        .post(
          `${environment.localhost}/users/${idUser}/reviewDocuments`,
          datoDocument
        )
        .subscribe({
          next: (data: any) => {
            subscriptionService.unsubscribe();
            resolve(data);
          },
          error: (error) => {
            subscriptionService.unsubscribe();
            reject(error);
          },
        });
    });
  }
}
