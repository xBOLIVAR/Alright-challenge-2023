import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PreviewComponent } from 'src/app/components/modals/preview/preview.component';
import { DocumentsService } from 'src/app/shared/services/documents.service';
import * as pdfjsLib from 'pdfjs-dist';
import { AlertComponent } from 'src/app/components/modals/alert/alert.component';

@Component({
  selector: 'app-myDocuments',
  templateUrl: './myDocuments.component.html',
  styleUrls: ['./myDocuments.component.scss'],
})
export class MyDocumentsComponent implements OnInit, OnDestroy {
  @ViewChild(PreviewComponent, { static: true })
  preview!: PreviewComponent;
  @ViewChild(AlertComponent, { static: true })
  alert!: AlertComponent;
  @ViewChild('fileInput') fileInput: any;
  documents: any = [];
  private thumbnail!: string;
  private documentKeys: any = [];
  private dataDocument!: any;
  private uid = localStorage.getItem('uid');

  constructor(private documentsService: DocumentsService) {}

  async ngOnInit() {
    const allDocuments = await this.documentsService.callDocumentsEndpoint(
      this.uid
    );
    this.documents = Object.values(allDocuments);
    this.documentKeys = Object.keys(allDocuments);
  }

  ngOnDestroy(): void {
    this.dataDocument = [];
    this.documentKeys = [];
    this.uid = '';
  }

  public form: FormGroup = new FormGroup({
    title: new FormControl(''),
  });

  submit() {
    this.documentsService
      .createDocumentHandler(
        {
          image: this.thumbnail,
          title: this.form.get('title')?.value,
          state: 'Sin revisar',
          file: this.dataDocument,
        },
        this.uid
      )
      .subscribe({
        next: (document: any) => {
          this.documents.push(document.document);
          this.documentKeys.push(document.documentId);
          this.form.get('title')?.reset();
          this.fileInput.nativeElement.value = '';
        },
        error: (error) => {},
      });
  }

  handleFileUpload(event: any) {
    const file = event.target.files[0];
    this.dataDocument = file;
    const maxSize = 5 * 1024 * 1024; // 5 MB

    if (file && file.size > maxSize) {
      alert('El archivo excede el tamaño máximo permitido de 5MB.');
      event.target.value = '';
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      const typedArray = new Uint8Array(e.target.result as ArrayBuffer);

      pdfjsLib.getDocument(typedArray).promise.then((pdf: any) => {
        pdf.getPage(1).then((page: any) => {
          const viewport = page.getViewport({ scale: 0.5 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');

          canvas.width = viewport.width;
          canvas.height = viewport.height;

          // Renderizar la página del PDF en el lienzo
          page.render({ canvasContext: context, viewport }).promise.then(() => {
            // Obtener la miniatura como una URL de datos (data URL)
            this.thumbnail = canvas.toDataURL();
            this.submit();
          });
        });
      });
    };
    if (file) {
      fileReader.readAsArrayBuffer(file);
    }
  }

  async documentPreview(title: string, docIndex: number, state: string) {
    const answerModal = await this.preview.open(
      title,
      this.documentKeys[docIndex],
      state,
      this.uid
    );
    if (answerModal) {
      this.documents[docIndex].state = answerModal;
    }
  }

  async deleteDocument(docIndex: number) {
    const answerModal = await this.alert.open();
    if (answerModal) {
      await this.documentsService.deleteDocumentHandler(
        this.documentKeys[docIndex],
        this.uid
      );
      this.documentKeys.splice(docIndex, 1);
      this.documents.splice(docIndex, 1);
    }
  }
}
