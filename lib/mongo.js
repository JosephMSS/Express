const { MongoClient, ObjectId } = require("mongodb");
const { config } = require("../config");
const DB_USER = encodeURIComponent(config.db_connection.user);
const DB_PASSWORD = encodeURIComponent(config.db_connection.password);
const DB_HOST = config.db_connection.host;
const DB_NAME = config.db_connection.name;
const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

// async function connect() {
//   try {
//     await db.connect(MONGO_URI, {
//       useNewUrlParser: true,
//     });
//     console.log("[db] Conectada con exito");
//   } catch (error) {
//     return error;
//   }
// }
class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.dbName = DB_NAME;
  }
  async connect() {
    if (!MongoLib.connection) {
      try {
        await this.client.connect();
        console.log("Connected successfully to mongo");
        MongoLib.connection = this.client.db(this.dbName);
      } catch (error) {
        console.error(error);
      }
    }
    return MongoClient.connection
  }
  async getAll(collection, query) {
    try {
        console.log('JMMS_collection',collection)
      const db = await this.connect();
      return db.collection(collection).find(query).toArray();
    } catch (e) {
      console.error(e);
    }
  }
  async get(collection, id) {
    try {
      const db = await this.connect();
      return db.collection(collection).findOne({ _id: ObjectId(id) });
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = MongoLib;
