
const { ObjectId, connect } = require('./mongo');
const data = require("../data/products.json");

/**
 * @typedef {Object} workout
 * @property {String} latitude
 * @property {String} longitude
 * @property {number} distance
 * @property {number} speed
 * @property {String} date 
 * @property {String} time
 */
const COLLECTION_NAME = 'workouts';
async function getCollection() {
  const db = await connect();
  return db.collection(COLLECTION_NAME);
}


/**
 * @returns {Promise<Exercises[]>} An array of products.
 */
async function getAll() {
  const col = await getCollection();
  return col.find({}).toArray();
}

/**
 * @param {string} id - The product's ID.
 */
async function get(id) {
  const col = await getCollection();
  return await col.findOne({ _id: ObjectId(id) });
}

async function getByCategory(category) {
  const col = await getCollection();
  return await col.findOne({ category });

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

/**
 * @param {Product} product - The product to create.
 * @returns {Promise<workout>} The created product.
 */

async function create(workout) {
 
  const col = await getCollection();
  const result = await col.insertOne(newWorkout);
  newWorkout._id = result.insertedId;

  return newWorkout;
}




/**
 * @param {Product} product - The product's data.
 * @returns {Product} The updated product.
 */
async function update(workout) {

  const col = await getCollection();
  const result = await col.findOneAndUpdate(
    { _id: new ObjectId(workout.id) },
    { $set: workout },
    { returnDocument: 'after' },
  );
  return result;
}

/**
 * @param {string} id - The workout's ID.
 */
async function remove(id) {
  const col = await getCollection();
  const result = await col.deleteOne({ _id: ObjectId(id) });
  if(result.deletedCount === 0) {
    throw new Error('Product not found');
  }
}


module.exports = {
  getAll, get, getByCategory, search, create, update, remove, getCollection, COLLECTION_NAME
};