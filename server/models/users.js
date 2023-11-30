// @ts-check

const { ObjectId, connect } = require('./mongo');







/**
 * @typedef {Object} Bank
 * @property {string} cardExpire
 * @property {string} cardNumber
 * @property {string} cardType
 * @property {string} currency
 * @property {string} iban
 */

/**
 * @typedef {Object} Coordinates
 * @property {number} lat
 * @property {number} lng
 */

/**
 * @typedef {Object} Address
 * @property {string} address
 * @property {string} [city]
 * @property {Coordinates} coordinates
 * @property {string} postalCode
 * @property {string} state
 */

/**
 * @typedef {Object} Company
 * @property {Address} address
 * @property {string} department
 * @property {string} name
 * @property {string} title
 */


/**
 * @typedef {Object} workout
 * @property {String} latitude
 * @property {String} longitude
 * @property {number} distance
 * @property {number} speed
 * @property {String} date 
 * @property {String} time
 */

/**
 * @typedef {Object} BaseUser
 * @property {string} email
 * @property {string} password
 * @property {Object[]} workouts
 * @property {User[]} friends
 * @property {boolean} isAdmin
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} token
 * 
 * 
 * 
 * 
 */

/**
 * @typedef {Object} HasId
 * @property {number} id
 */

/**
 * @typedef {BaseUser & HasId} User
 */

/**
 * @type { {users: User[]} }
 */


/**
 * @returns {User[]} An array of products.
 */

const COLLECTION_NAME = 'users';
const WORKOUT_COLLECTION = 'workouts'
const {create : createWorkout} = require ('./workouts')



async function getAll() {
  const col = await getCollection();
  return col.find({}).toArray();
}

async function getCollection() {
  const db = await connect();
  return db.collection(COLLECTION_NAME);
}






async function AddWorkout(user) {
 
  const col = await getCollection();
  const result = await col.findOneAndUpdate(
    { _id: new ObjectId(user.id) },
    { $set: user },
    { returnDocument: 'after' },
  );
  return result;
}

async function update(user) {

  const col = await getCollection();
  const result = await col.findOneAndUpdate(
    { _id: new ObjectId(user.id) },
    { $set: user },
    { returnDocument: 'after' },
  );
  return result;
}



async function remove(id) {
  const col = await getCollection();
  const result = await col.deleteOne({ _id: new ObjectId(id) });
  if(result.deletedCount === 0) {
    throw new Error('User not found');
  }
}



async function search(query) {
  const col = await getCollection();
  const products = await col.find({
    $or: [
      { title: { $regex: query, $options: 'i' } },
      { description: { $regex: query, $options: 'i' } },
    ],
  }).toArray();

  return products;
}


async function get(id) {
  const col = await getCollection();
  const myUser =  await col.findOne({ _id: new ObjectId(id) });
  
  return myUser.workouts;

}



async function create(user) {
  
  const col = await getCollection();
  const result = await col.insertOne(user);
  user._id = result.insertedId;

  return user;
}

async function login(user) {
  const col = await getCollection();
  const myUser = await col.findOne({email: user.email})
  if(myUser){
    const result = user.password === myUser.password;
    if(result){
      return result;
    } else {
      throw new Error('Email or password does not match');
    }
  }
  }





module.exports = {
  getAll, update, AddWorkout, remove, search, get, create, login
};