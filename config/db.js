import mongoose from 'mongoose';

const conectDB = async () => {
  try {
    const conetion = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const url = `${conetion.connection.host}:${conetion.connection.port}`;
    console.log('you are connected in', url);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

export default conectDB;
