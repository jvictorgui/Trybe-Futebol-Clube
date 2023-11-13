const encryptedPass = '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO';

const validUser = {
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: 'secret_user',
};

const loginBodyRequest = {
  email: 'user@user.com',
  password: 'secret_user',
};

const noEmailUser = {
  email: '',
  password: 'secret_user',
};

const noPasswordUser = {
  email: 'user1@user.com',
  password: '',
};

export default { validUser,
  noEmailUser,
  noPasswordUser,
  encryptedPass,
  loginBodyRequest };
