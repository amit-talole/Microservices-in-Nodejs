import mongoose from 'mongoose';

class DbConnection {
  constructor() {}

  mongodbConnection = async () => {
    try {
      await mongoose.connect(
        `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@cluster0.boijg.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`,
      );
      console.log(`🚀 db connect 🚀 `);
    } catch (error) {
      console.log('error', error);
    }
  };
}

export default DbConnection;
