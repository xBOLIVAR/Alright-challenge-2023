import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PreviewComponent } from "src/app/components/modals/preview/preview.component";

interface document {
  image: string;
  title: string;
  state: string;
}

@Component({
  selector: 'app-myDocuments',
  templateUrl: './myDocuments.component.html',
  styleUrls: ['./myDocuments.component.scss'],
})
export class MyDocumentsComponent implements OnInit {
  @ViewChild(PreviewComponent, { static: true })
  preview!: PreviewComponent;

  documents = [
    {
      image:
        'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg',
      title: 'TypeScript',
      state: 'Sin Revisar',
    },
    {
      image:
        'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg',
      title: 'TypeScript',
      state: 'Sin Revisar',
    },
    {
      image:
        'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg',
      title: 'TypeScript',
      state: 'Sin Revisar',
    },
    {
      image:
        'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg',
      title: 'TypeScript',
      state: 'Sin Revisar',
    },
    {
      image:
        'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg',
      title: 'TypeScript',
      state: 'Sin Revisar',
    },
    {
      image:
        'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg',
      title: 'TypeScript',
      state: 'Sin Revisar',
    },
  ];

  constructor() {}

  ngOnInit() {}

  public form: FormGroup = new FormGroup({
    title: new FormControl(''),
  });

  submit() {
    this.form.get('title')?.reset();
  }

  handleFileUpload(event: any) {
    const file = event.target.files[0];
    const maxSize = 5 * 1024 * 1024; // 5 MB
    if (file && file.size > maxSize) {
      alert('El archivo excede el tamaño máximo permitido de 5MB.');
      event.target.value = '';
      if (file) this.submit();
      return;
    }

    console.log('Archivo seleccionado:', file);
    if (file) this.submit();
  }

  async documentPreview() {
    console.log('entra');
    await this.preview.open()
  }
}
