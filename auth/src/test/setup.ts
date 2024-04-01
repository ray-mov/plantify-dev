import { MongoMemoryServer} from "mongodb-memory-server"
import mongoose from "mongoose";

let mongod: MongoMemoryServer | null = null;

//hook functions

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
  
})


//hook that will run before each test

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for( let collection of collections){
    await collection.deleteMany({});
  }
})

//hook that will run after all of our test complete

afterAll( async () =>{
  await mongoose.connection.close();
    if (mongod !== null) {
        await mongod.stop();
    }
})








