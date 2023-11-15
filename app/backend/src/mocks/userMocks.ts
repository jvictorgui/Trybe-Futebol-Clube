const validUser = {
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: 'secret_user',
};

const invalidEmailUser = {
  email: 'user@user',
  password: 'secret_user',
};

const invalidPasswordUser = {
  email: 'valid@gmail.com',
  password: '1234',
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
  loginBodyRequest,
  invalidEmailUser,
  invalidPasswordUser };
