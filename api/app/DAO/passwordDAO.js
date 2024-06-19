import mongoose from 'mongoose';
import * as _ from 'lodash';
import applicationException from '../service/applicationException';
import mongoConverter from '../service/mongoConverter';

const passwordSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, unique: true },
    password: { type: String, required: true }
  }, {
    collection: 'password'
  });

const PasswordModel = mongoose.model('password', passwordSchema);

async function createOrUpdate(data) {
  const existingUser = await PasswordModel.findOne({ userId: data.userId });
  if (existingUser) {
    throw applicationException.new(applicationException.BAD_REQUEST, 'User with that ID already exists');
  }
  const result = await new PasswordModel({ userId: data.userId, password: data.password }).save();
  if (result) {
    return mongoConverter(result);
  }
  return result;
}

async function authorize(userId, password) {
  const result = await PasswordModel.findOne({ userId: userId, password: password });
  if (result && mongoConverter(result)) {
    return true;
  }
  throw applicationException.new(applicationException.UNAUTHORIZED, 'User and password does not match');
}

export default {
  createOrUpdate: createOrUpdate,
  authorize: authorize,

  model: PasswordModel
};