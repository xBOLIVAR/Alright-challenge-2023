import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environment/environment';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  private uid = localStorage.getItem('uid');

  constructor(private http: HttpClient, private db: AngularFireDatabase) {}

  callDocumentsEndpoint() {
    return new Promise<any>((resolve, reject) => {
      const subscriptionService: Subscription = this.http
        .get(`${environment.localhost}/documents/${this.uid}`)
        .subscribe({
          next: (data: any) => {
            subscriptionService.unsubscribe();
            resolve(data);
          },
        });
    });
  }

  getDocuments() {
    return this.db.object(`documents/${this.uid}`).valueChanges();
  }

  createDocumentHandler(documentData: {
    image: string;
    title: string;
    state: string;
    file: File;
  }) {
    const fileData = new Blob([documentData.file], {
      type: documentData.file.type,
    });

    const requestData = {
      image: documentData.image,
      title: documentData.title,
      state: documentData.state,
      file: fileData,
    };

    return this.http.post(
      `${environment.localhost}/documents/${this.uid}`,
      requestData
    );
  }

  setStateDocument(idDocument: string) {
    return new Promise<any>((resolve, reject) => {
      const subscriptionService: Subscription = this.http
        .patch(
          `${environment.localhost}/documents/${this.uid}/${idDocument}`,
          null
        )
        .subscribe({
          next: (data: any) => {
            subscriptionService.unsubscribe();
            resolve(data?.data || data);
          },
          error: (error) => {
            subscriptionService.unsubscribe();
            reject(error);
          },
        });
    });
  }

  deleteDocumentHandler(idDocument: string) {
    return new Promise<any>((resolve, reject) => {
      const subscriptionService: Subscription = this.http
        .delete(`${environment.localhost}/documents/${this.uid}/${idDocument}`)
        .subscribe({
          next: (data: any) => {
            subscriptionService.unsubscribe();
            resolve(data?.data || data);
          },
          error: (error) => {
            subscriptionService.unsubscribe();
            reject(error);
          },
        });
    });
  }
}
