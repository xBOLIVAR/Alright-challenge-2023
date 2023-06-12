import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PreviewComponent } from 'src/app/components/modals/preview/preview.component';
import { DocumentsService } from 'src/app/shared/services/documents.service';
import * as pdfjsLib from 'pdfjs-dist';

@Component({
  selector: 'app-myDocuments',
  templateUrl: './myDocuments.component.html',
  styleUrls: ['./myDocuments.component.scss'],
})
export class MyDocumentsComponent implements OnInit {
  @ViewChild(PreviewComponent, { static: true })
  preview!: PreviewComponent;
  documents: any = [];
  private thumbnail!: string;
  private documentKeys:any = []

  constructor(private documentsService: DocumentsService) {}

  async ngOnInit() {
    const allDocuments = await this.documentsService.callDocumentsEndpoint()
     this.documents = Object.values(allDocuments)
     this.documentKeys = Object.keys(allDocuments)
  }

  public form: FormGroup = new FormGroup({
    title: new FormControl(''),
  });

  submit() {
    this.documentsService
      .createDocumentHandler({
        image: this.thumbnail,
        title: this.form.get('title')?.value,
        state: 'Sin revisar',
      })
      .subscribe({
        next: () => {
          this.form.get('title')?.reset();
        },
        error: (error) => {},
      });
  }

  handleFileUpload(event: any) {
    const file = event.target.files[0];
    const maxSize = 5 * 1024 * 1024; // 5 MB

    if (file && file.size > maxSize) {
      alert('El archivo excede el tamaño máximo permitido de 5MB.');
      event.target.value = '';
      return;
    }

    console.log('Archivo seleccionado:', file);

    const fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      const typedArray = new Uint8Array(e.target.result as ArrayBuffer);

      // Cargar el documento PDF utilizando pdf.js
      pdfjsLib.getDocument(typedArray).promise.then((pdf: any) => {
        // Obtener la página del PDF para generar la miniatura (en este caso, la primera página)
        pdf.getPage(1).then((page: any) => {
          const viewport = page.getViewport({ scale: 0.5 }); // Escala de la miniatura (ajústala según tus necesidades)
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

  async documentPreview(title:string, docIndex:number) {
    console.log("🚀 ~ file: myDocuments.component.ts:88 ~ MyDocumentsComponent ~ documentPreview ~ docIndex:", docIndex);
    console.log("🚀 ~ file: myDocuments.component.ts:90 ~ MyDocumentsComponent ~ documentPreview ~ this.documentKeys:", this.documentKeys);
    this.preview.open(title, this.documentKeys[docIndex]);
  }
}
