import { Component, OnDestroy, OnInit } from '@angular/core';
import { DocumentsService } from 'src/app/shared/services/documents.service';

@Component({
  selector: 'app-myReviews',
  templateUrl: './myReviews.component.html',
  styleUrls: ['./myReviews.component.scss'],
})
export class MyReviewsComponent implements OnInit, OnDestroy {
  documents: any = [];
  private uid = localStorage.getItem('uid');

  constructor(private documentService: DocumentsService) {}

  async ngOnInit() {
    this.documents = Object.values(
      await this.documentService.getMyReviews(this.uid)
    );
    this.documents.push({
      image:
        'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg',
      title: 'TypeScript',
      state: 'En revision',
    });
    console.log(
      '🚀 ~ file: myReviews.component.ts:17 ~ MyReviewsComponent ~ ngOnInit ~ this.documents:',
      this.documents
    );
  }

  ngOnDestroy(): void {
    this.uid = '';
  }
}
