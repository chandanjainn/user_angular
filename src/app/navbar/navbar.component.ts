import { Component, OnInit } from '@angular/core';
import { user } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  users: user[];
  selectedUser: user;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.populateUsers();
  }

  populateUsers() {
    this.route.paramMap.subscribe(params => {
      let name = params.get('name');
      if (name) {
        this.userService
          .getUserByName(name)
          .subscribe(res => (this.selectedUser = res[0]));
      }
    });
    this.userService.getUsers().subscribe((res: user[]) => (this.users = res));
    return this.users;
  }

  showData(name: string) {
    this.selectedUser = this.users.find(item => item.name === name);
    this.userService.fetchedUser = this.selectedUser;
  }

  goToForm() {
    this.router.navigate(['/feedback-form', { name: this.selectedUser.name }]);
  }
}
