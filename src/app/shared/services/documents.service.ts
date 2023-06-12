import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  private uid = localStorage.getItem('uid');

  constructor(private http: HttpClient) {}

  callDocumentsEndpoint() {
    return new Promise<any>((resolve, reject) => {
      const subscriptionService: Subscription = this.http
        .get(`${environment.localhost}/documents/${this.uid}`)
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

  createDocumentHandler(documentData: {
    image: string;
    title: string;
    state: string;
  }) {
    return this.http.post(
      `${environment.localhost}/documents/${this.uid}`,
      documentData
    );
  }
}
