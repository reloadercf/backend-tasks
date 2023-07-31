import mongoose from 'mongoose';

const conectDB = async () => {
  try {
    const conetion = await mongoose.connect('mongodb+srv://reloadercf:administrator1@tasks.i2quhj6.mongodb.net/', {
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
