import { user } from 'src/app/shared/user.model';

let transformedUsers: user[] = [
  {
    address: 'Kulas Light, Apt. 556, Gwenborough, 92998-3874',
    companyName: 'Romaguera-Crona',
    email: 'Sincere@april.biz',
    name: 'Leanne Graham',
    phone: '1-770-736-8031 x56442',
    username: 'Bret',
    website: 'hildegard.org'
  }
];

let users = [
  {
    address: {
      street: 'Kulas Light',
      suite: 'Apt. 556',
      city: 'Gwenborough',
      zipcode: '92998-3874'
    },
    company: { name: 'Romaguera-Crona' },
    email: 'Sincere@april.biz',
    name: 'Leanne Graham',
    phone: '1-770-736-8031 x56442',
    username: 'Bret',
    website: 'hildegard.org'
  }
];

export { transformedUsers, users };
