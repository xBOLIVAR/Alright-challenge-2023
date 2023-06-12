import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public choose = true;

  constructor(private router: Router) {}

  closeSession() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
