import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent implements OnInit {
  feedbackForm: FormGroup;
  name = '';
  email = '';
  filteredCities: Observable<string[]>;
  cities = [];
  options: {} = {
    Maharashtra: ['Pune', 'Mumbai', 'Nagpur'],
    Karnataka: ['Bengaluru', 'Kadugodi', 'Hoskote'],
    Gujarat: ['Ahemdabad', 'Surat'],
    Haryana: ['Rohtak', 'Faridabad', 'Hissar'],
    Rajasthan: ['Jaipur', 'Udaipur', 'Ajmer']
  };

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.route.paramMap.subscribe(params => {
      if (params.get('name')) {
        this.name = this.userService.fetchedUser['name'];
        this.email = this.userService.fetchedUser['email'];
      }
    });
    this.feedbackForm = new FormGroup({
      name: new FormControl(this.name, Validators.required),
      email: new FormControl(this.email, [
        Validators.required,
        Validators.email
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('[1-9]{1}[0-9]{9}')
      ]),
      comments: new FormControl('', Validators.required),
      address: new FormGroup({
        street: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        state: new FormControl('', Validators.required),
        zipcode: new FormControl('', Validators.required)
      })
    });
    this.filterCities();
  }

  filterCities() {
    this.filteredCities = this.feedbackForm
      .get('address')
      ['controls'].state.valueChanges.pipe(
        startWith(''),
        map((value: string) =>
          Object.keys(this.options).filter(option =>
            option.toLowerCase().includes(value.toLowerCase())
          )
        )
      );
  }

  showMessage() {
    this.snackBar.open(
      'Thank you for your feedback! We will get back to you shortly',
      'X',
      { duration: 2000 }
    );
  }

  populateCityDropdown(state) {
    if (this.options.hasOwnProperty(state)) {
      this.cities = this.options[state];
    }
  }
}
