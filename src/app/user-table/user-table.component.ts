import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { user } from '../shared/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  rows: user[];
  temp = [];
  columns = [
    { prop: 'name' },
    { name: 'Username' },
    { name: 'Email' },
    { name: 'Company Name' },
    { name: 'Address' },
    { name: 'Phone' },
    { name: 'Website' }
  ];

  constructor(private userService: UserService, private router: Router) {}
  ngOnInit() {
    this.getUsers();
  }

  private getUsers() {
    this.userService.getUsers().subscribe((res: user[]) => {
      this.rows = res;
      this.temp = [...res];
    });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(
      data => data.name.toLowerCase().indexOf(val) !== -1 || !val
    );
    this.rows = temp;
  }

  goToNavbar(event) {
    if (event.type == 'click') {
      this.router.navigate(['/navbar', { name: event.row.name }]);
    }
  }
}
