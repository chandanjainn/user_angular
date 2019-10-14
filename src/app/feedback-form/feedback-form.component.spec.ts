import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackFormComponent } from './feedback-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RouterTestingModule } from '@angular/router/testing';
import {
  RouterModule,
  ActivatedRoute,
  convertToParamMap
} from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { transformedUsers } from 'src/assets/mock.data';
import { UserService } from '../shared/user.service';

describe('FeedbackFormComponent', () => {
  let component: FeedbackFormComponent;
  let getUsersSpy: jasmine.Spy;
  let fixture: ComponentFixture<FeedbackFormComponent>;

  beforeEach(async(() => {
    const userService = jasmine.createSpyObj('UserService', ['fetchedUser']);
    getUsersSpy = userService.fetchedUser.and.returnValue(transformedUsers);
    TestBed.configureTestingModule({
      declarations: [FeedbackFormComponent],
      imports: [
        RouterModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatSidenavModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonToggleModule,
        MatSelectModule,
        MatSnackBarModule,
        MatButtonModule,
        MatAutocompleteModule,
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(
              convertToParamMap({
                name: 'Leanne Graham'
              })
            )
          }
        },
        { provide: UserService, useValue: userService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should populate cities dropdown', () => {
    let state = 'Maharashtra';
    component.populateCityDropdown(state);
    expect(component.cities).toBeTruthy(component.options[state]);
  });

  it('should not populate cities dropdown', () => {
    let state = 'Assam';
    component.populateCityDropdown(state);
    expect(component.cities).toEqual([]);
  });
});
