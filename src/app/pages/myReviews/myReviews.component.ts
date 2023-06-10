import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myReviews',
  templateUrl: './myReviews.component.html',
  styleUrls: ['./myReviews.component.scss'],
})
export class MyReviewsComponent implements OnInit {
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
      state: 'En revision',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
