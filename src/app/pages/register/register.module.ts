import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from "@angular/forms";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const materials = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule
];

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    materials,
    ReactiveFormsModule
  ]
})
export class RegisterModule { }
