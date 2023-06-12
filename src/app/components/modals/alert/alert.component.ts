import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @ViewChild('alert', { static: true }) modalRef!: ElementRef;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {}

  open() {
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
}
