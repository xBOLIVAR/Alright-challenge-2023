import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environment/environment';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  constructor(private http: HttpClient, private db: AngularFireDatabase) {}

  callDocumentsEndpoint(uid: string | null) {
    return new Promise<any>((resolve, reject) => {
      const subscriptionService: Subscription = this.http
        .get(`${environment.localhost}/documents/${uid}`)
        .subscribe({
          next: (data: any) => {
            subscriptionService.unsubscribe();
            resolve(data);
          },
        });
    });
  }

  getDocuments(uid: string) {
    return this.db.object(`documents/${uid}`).valueChanges();
  }

  createDocumentHandler(
    documentData: {
      image: string;
      title: string;
      state: string;
      file: File;
    },
    uid: string | null
  ) {
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
      `${environment.localhost}/documents/${uid}`,
      requestData
    );
  }

  setStateDocument(idDocument: string, uid: string | null) {
    return new Promise<any>((resolve, reject) => {
      const subscriptionService: Subscription = this.http
        .patch(`${environment.localhost}/documents/${uid}/${idDocument}`, null)
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

  deleteDocumentHandler(idDocument: string, uid: string | null) {
    return new Promise<any>((resolve, reject) => {
      const subscriptionService: Subscription = this.http
        .delete(`${environment.localhost}/documents/${uid}/${idDocument}`)
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

  async getMyReviews(uid: string | null) {
    return await new Promise<any>((resolve) => {
      const subscriptionService: Subscription = this.http
        .get(`${environment.localhost}/users/${uid}/reviewers`)
        .subscribe({
          next: (data: any) => {
            console.log("🚀 ~ file: documents.service.ts:96 ~ DocumentsService ~ getMyReviews ~ data:", data);
            subscriptionService.unsubscribe();
            resolve(data);
          },
        });
    });
  }
}
