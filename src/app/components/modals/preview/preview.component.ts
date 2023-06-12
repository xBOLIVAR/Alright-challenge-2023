import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {
  @ViewChild('preview', { static: true }) modalRef!: ElementRef;
  closeResult = '';
  title = '';
  selectedValue: any;
  reviewers: any = [];
  private keys: any = [];
  private idDocument = '';

  constructor(
    private modalService: NgbModal,
    private userService: UserService
  ) {}

  async ngOnInit() {
    const allReviewers = await this.userService.getReviewers();
    this.reviewers = Object.values(allReviewers);
    this.keys = Object.keys(allReviewers);
    console.log(
      '🚀 ~ file: preview.component.ts:21 ~ PreviewComponent ~ ngOnInit ~ this.reviewers:',
      this.reviewers
    );
  }

  open(title: string, idDocument: string) {
    console.log(
      '🚀 ~ file: preview.component.ts:35 ~ PreviewComponent ~ open ~ idDocument:',
      idDocument
    );
    this.idDocument = idDocument;
    this.title = title;
    this.modalService
      .open(this.modalRef, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          return;
        },
        (reason) => {
          return;
        }
      );
  }

  selectReviewer() {
    const reviewerIndex = this.reviewers.findIndex(
      (reviewer: any) => reviewer.email === this.selectedValue
    );
    this.userService.setReviewDocuments(this.keys[reviewerIndex], {
      idDocument: this.idDocument,
      title: this.title,
    });
    console.log(this.selectedValue);
  }
}
