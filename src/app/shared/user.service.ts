import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { user } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  fetchedUser: user;
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users').pipe(
      map((users: any[]) =>
        users.map(user => {
          return this.populateUser(user);
        })
      )
    );
  }

  getUserByName(name) {
    return this.http.get('https://jsonplaceholder.typicode.com/users').pipe(
      map((users: any[]) =>
        users
          .filter(user => {
            return user.name === name;
          })
          .map(user => {
            this.fetchedUser = this.populateUser(user);
            return this.fetchedUser;
          })
      )
    );
  }

  populateUser(user): user {
    return {
      name: user.name,
      username: user.username,
      email: user.email,
      companyName: user.company.name,
      address:
        user.address.street +
        ', ' +
        user.address.suite +
        ', ' +
        user.address.city +
        ', ' +
        user.address.zipcode,
      phone: user.phone,
      website: user.website
    };
  }
}
