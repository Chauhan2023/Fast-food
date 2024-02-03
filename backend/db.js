const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://rohitchauhan19780:Rohit%402001@cluster0.abcw6i8.mongodb.net/Fast_food_MERN';

const connectToMongoDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true, 
    });

    console.log('Connected to MongoDB');

    // Fetch data from 'Food_items' collection
    const foodItemsCollection = await mongoose.connection.db.collection('Food_items');
    const foodItemsData = await foodItemsCollection.find({}).toArray();
    global.food_items = foodItemsData;

    // Fetch data from 'Food category' collection
    const foodCategoryCollection = await mongoose.connection.db.collection('Food category');
    const foodCategoryData = await foodCategoryCollection.find({}).toArray();
    global.food_category = foodCategoryData;

  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    // Handle the error appropriately, e.g., throw an error or exit the application
  }
};

// Export the function if needed
module.exports = connectToMongoDB;
