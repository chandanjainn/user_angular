import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { UserService } from '../shared/user.service';
import {
  ActivatedRoute,
  convertToParamMap,
  RouterModule,
  Router
} from '@angular/router';
import { of } from 'rxjs';
import { transformedUsers } from 'src/assets/mock.data';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let getUsersSpy: jasmine.Spy;
  let getUserSpy: jasmine.Spy;
  let router: Router;

  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(() => {
    const userService = jasmine.createSpyObj('UserService', [
      'getUsers',
      'getUserByName'
    ]);
    getUsersSpy = userService.getUsers.and.returnValue(of(transformedUsers));
    getUserSpy = userService.getUserByName.and.returnValue(
      of(transformedUsers)
    );

    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [
        BrowserAnimationsModule,
        MatSidenavModule,
        MatCardModule,
        MatButtonModule,
        RouterModule,
        HttpClientTestingModule,
        RouterTestingModule
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

    fixture = TestBed.createComponent(NavbarComponent);
    router = fixture.debugElement.injector.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should fetch users list', () => {
    expect(getUsersSpy.calls.any()).toBe(true, 'getUsersSpy called');
  });

  it('should selected users ', () => {
    expect(getUserSpy.calls.any()).toBe(true, 'getUserSpy called');
  });

  it('should navigate to forms page ', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.goToForm();
    const name = component.selectedUser.name;
    expect(navigateSpy).toHaveBeenCalledWith(['/feedback-form', { name }]);
  });

  it('should show selected user ', () => {
    component.users = transformedUsers;
    component.showData('Leanne Graham');

    expect(component.selectedUser).toBe(transformedUsers[0]);
  });
});
