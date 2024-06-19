import PasswordDAO from '../DAO/passwordDAO';
import TokenDAO from '../DAO/tokenDAO';
import UserDAO from '../DAO/userDAO';
import applicationException from '../service/applicationException';
import sha1 from 'sha1';

function create(context) {
  function hashString(password) {
    return sha1(password);
  }

  async function authenticate(name, password) {
    let userData;
    const user = await UserDAO.getByEmailOrName(name);
    if (!user) {
      throw applicationException.new(applicationException.UNAUTHORIZED, 'User with that email does not exist');
    }
    userData = await user;
    await PasswordDAO.authorize(user.id, hashString(password));
    const tokenObj = await TokenDAO.create(userData);
    const token = getToken(tokenObj);
    return {
      token: token.token,
      isAdmin: userData.isAdmin
    };
  }

  function getToken(token) {
    return { token: token.value };
  }

  async function createNewOrUpdate(userData) {
    if (!userData.hasOwnProperty('role')) {
      userData.role = 'user';
    }
    if (!userData.hasOwnProperty('isAdmin')) {
      userData.isAdmin = false;
    }

    const user = await UserDAO.createNewOrUpdate(userData);
    if (await userData.password) {
      return await PasswordDAO.createOrUpdate({ userId: user.id, password: hashString(userData.password) });
    } else {
      return user;
    }
  }

  async function removeHashSession(userId) {
    return await TokenDAO.remove(userId);
  }

  return {
    authenticate: authenticate,
    createNewOrUpdate: createNewOrUpdate,
    removeHashSession: removeHashSession
  };
}

export default {
  create: create
};
