import { ObjectId } from 'mongodb';
import { getUsers } from '../database/database.js';

export async function findByUserName(username) {
  return getUsers()
    .findOne({ username })
    .then((data) => {
      return { ...data, id: data._id.toString() };
    });
}

export const createUser = async (user) => {
  return getUsers()
    .insertOne(user)
    .then((data) => data.insertedId.toString());
};

export const findByUserId = async (userId) => {
  let id = new ObjectId(userId);
  return getUsers()
    .findOne({ _id: id })
    .then((data) => {
      return { ...data, id: data._id.toString() };
    });
};
