
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const app = express();
const PORT = process.env.PORT || 5000
const postRoutes = require('./routes/posts');
const CONNECTION_URL = 'mongodb+srv://spsingh:spsingh123@cluster0.1puqu.mongodb.net/test2?retryWrites=true&w=majority'
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/posts', postRoutes);
const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}
mongoose.connect(CONNECTION_URL, connectionParams)
  .then(() => {
    console.log('Connected to database ')
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  })
mongoose.set('useFindAndModify', false);

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}`);
});