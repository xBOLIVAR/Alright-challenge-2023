import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentsService } from 'src/app/shared/services/documents.service';
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
  state = '';
  private keys: any = [];
  private idDocument = '';

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private documentService: DocumentsService
  ) {}

  async ngOnInit() {
    const allReviewers = await this.userService.getReviewers();
    this.reviewers = Object.values(allReviewers);
    this.keys = Object.keys(allReviewers);

    // const pdfFileURL = URL.createObjectURL();
  }

  open(title: string, idDocument: string, state: string) {
    this.state = state;
    this.idDocument = idDocument;
    this.title = title;
    return this.modalService
      .open(this.modalRef, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          return result;
        },
        (reason) => {
          return reason;
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
    this.documentService.setStateDocument(this.idDocument);
  }
}
