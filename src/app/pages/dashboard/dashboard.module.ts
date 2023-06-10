import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MyDocumentsComponent } from '../myDocuments/myDocuments.component';
import { MyReviewsComponent } from '../myReviews/myReviews.component';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PreviewComponent } from 'src/app/components/modals/preview/preview.component';

const materials = [
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatToolbarModule,
  MatDividerModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
];

@NgModule({
  declarations: [
    DashboardComponent,
    MyDocumentsComponent,
    MyReviewsComponent,
    PreviewComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    materials,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}
