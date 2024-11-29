const express = require('express');
const app = express();
const connectDB = require('./configs/data base');
const router = require('./routers')



app.use(express.json()) // gửi json lên 
app.use(express.urlencoded({extended:true})) // format để HTML gửi data tới server


connectDB();
router(app);

app.listen(5000, () => {
  console.log('server running at port 5000');
});
