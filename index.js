require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const connectDB = require('./db/db');
const User = require('./db/form');


// Establish DataBase Connection
connectDB();



// Middleware to parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})



app.post('/register', (req, res) => {
    const { email, password, username} = req.body;
    console.log(email)
    const newUser = new User({
        username,
        password,
        email,
    });
    newUser.save()
    .then(() => {
      res.send('User registered successfully');
    })
    .catch((error) => {
      res.status(500).send('Error registering user: ' + error.message);
    });
  
  })



  app.get('/users', async (req, res) => {
    // Query data from MongoDB and render the HTML
    console.log('dd');
    try {
      // Use the .find() method without a callback
      const users = await User.find({});
  
      console.log('Users:');
      users.forEach(user => {
        console.log(user);
      });
      console.log(users);
      // mongoose.disconnect(); // Close the MongoDB connection
    } catch (err) {
      console.error('Error querying users:', err);
    }
    // console.log(users)
    res.redirect('./')
  });
  


  app.get('/user/delete', (req,res) => {

    res.sendFile(__dirname + '/delete.html')
  
  
  })
  
  app.post('/delete', async (req,res) =>{
     const { email } =req.body
     try {
      // Define a query to find the user you want to delete
      const query = { email: email }; // Replace with the actual email
  
      // Use findOneAndDelete to find and delete the user
      const deletedUser = await User.findOneAndDelete(query);
  
      if (deletedUser) {
        console.log(`Deleted user: ${deletedUser.email}`);
      } else {
        console.log('User not found.');
      }
         // Close the MongoDB connection
    } catch (err) {
      console.error('Error deleting user:', err);
    }
    console.log("fff")
     res.send("User Successfully Deleted")
  })
  






const port =process.env.PORT || 3000;
app.listen(port, console.log(`Listening on port`));