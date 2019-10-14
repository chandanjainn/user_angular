import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTableComponent } from './user-table.component';
import { Router, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { transformedUsers } from 'src/assets/mock.data';
import { of } from 'rxjs';
import { UserService } from '../shared/user.service';

describe('UserTableComponent', () => {
  let component: UserTableComponent;
  let getUsersSpy: jasmine.Spy;
  let fixture: ComponentFixture<UserTableComponent>;
  let router: Router;

  beforeEach(async(() => {
    const userService = jasmine.createSpyObj('UserService', [
      'getUsers',
      'getUserByName'
    ]);
    getUsersSpy = userService.getUsers.and.returnValue(of(transformedUsers));
    TestBed.configureTestingModule({
      declarations: [UserTableComponent],
      imports: [
        RouterTestingModule,
        RouterModule,
        HttpClientTestingModule,
        NgxDatatableModule
      ],
      providers: [{ provide: UserService, useValue: userService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTableComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get(Router);
    fixture.detectChanges();
  });

  it('should navigate to forms page ', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const event = { type: 'click', row: { name: 'Leanne Graham' } };

    component.goToNavbar(event);
    expect(navigateSpy).toHaveBeenCalledWith([
      '/navbar',
      { name: event.row.name }
    ]);
  });

  it('should not navigate to forms page ', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const event = { type: 'hover', row: { name: 'Leanne Graham' } };

    component.goToNavbar(event);
    expect(navigateSpy).not.toHaveBeenCalledWith([
      '/navbar',
      { name: event.row.name }
    ]);
  });

  it('should fetch users list', () => {
    expect(getUsersSpy.calls.any()).toBe(true, 'getUsersSpy called');
  });

  it('should filter user list ', () => {
    const event = { target: { value: 'Leanne' } };
    component.updateFilter(event);
    expect(event.target.value).not.toBe(null);
  });

  it('should not filter user list ', () => {
    const event = { target: { value: 'abra' } };
    component.updateFilter(event);
    expect(component.temp).toEqual(transformedUsers);
  });
});
