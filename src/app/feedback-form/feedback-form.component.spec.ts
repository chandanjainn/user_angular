import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackFormComponent } from './feedback-form.component';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
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
import { transformedUsers, feedbackMock } from 'src/assets/mock.data';
import { UserService } from '../shared/user.service';

export class ActivatedRouteMock1 {
  paramMap = of(
    convertToParamMap({
      name: 'Leanne Graham'
    })
  );
}

export class ActivatedRouteMock2 {
  paramMap = of(
    convertToParamMap({
      name: ''
    })
  );
}

describe('FeedbackFormComponent', () => {
  let component: FeedbackFormComponent;
  let fixture: ComponentFixture<FeedbackFormComponent>;
  let snack: MatSnackBar;

  beforeEach(async(() => {
    const userService = jasmine.createSpyObj('UserService', ['fetchedUser']);
    userService.fetchedUser.and.returnValue(transformedUsers);
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
          useClass: ActivatedRouteMock1
        },
        { provide: UserService, useValue: userService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackFormComponent);
    component = fixture.componentInstance;
    snack = fixture.debugElement.injector.get(MatSnackBar);
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

  it('should open snackbar ', () => {
    let spy = spyOn(snack, 'open');
    component.feedbackForm.setValue(feedbackMock);
    component.showMessage();
    expect(spy).toHaveBeenCalled();
  });
});

describe('FeedbackFormComponent', () => {
  let component: FeedbackFormComponent;
  let fixture: ComponentFixture<FeedbackFormComponent>;

  beforeEach(async(() => {
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
          useClass: ActivatedRouteMock2
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should not popuate form on landing ', () => {
    expect(component.feedbackForm.value.name).toEqual('');
  });
});
