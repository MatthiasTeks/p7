const mongoose = require('mongoose');

const connectionDatabase = async () => {
  try {
    await mongoose.connect(process.env.API, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connexion à MongoDB réussie !');
  } catch (error) {
    console.log('Connexion à MongoDB échouée !', error);
  }
};

module.exports = connectionDatabase;