const mongoose = require('mongoose');

const connectionDatabase = async () => {
  try {
    // TODO .env
    await mongoose.connect('mongodb+srv://matt:1354223m@cluster0.okegaiv.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connexion à MongoDB réussie !');
  } catch (error) {
    console.log('Connexion à MongoDB échouée !', error);
  }
};

module.exports = connectionDatabase;