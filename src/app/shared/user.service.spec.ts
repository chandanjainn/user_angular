import { UserService } from './user.service';
import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { transformedUsers, users } from '../../assets/mock.data';

describe('UserService', () => {
  let injector: TestBed;
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    injector = getTestBed();
    service = injector.get(UserService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should fetch specific user', () => {
    expect(
      service
        .getUserByName('Leanne Graham')
        .subscribe(res => expect(res).toEqual(transformedUsers))
    );
    const req = httpMock.expectOne(environment.apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(users);
  });

  it('should return transformed users', () => {
    expect(
      service.getUsers().subscribe(res => expect(res).toEqual(transformedUsers))
    );
    const req = httpMock.expectOne(environment.apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(users);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
