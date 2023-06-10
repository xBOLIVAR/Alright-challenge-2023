import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent {
  @ViewChild("preview", { static: true }) modalRef!: ElementRef;
  closeResult = '';

	constructor(private modalService: NgbModal) {}

	open() {
		this.modalService.open(this.modalRef, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				return;
			},
			(reason) => {
				return;
			},
		);
	}
}
