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
  }

  ngOnDestroy(): void {
    this.uid = '';
  }
}
