const express = require('express');
const app = express();
const connectDB = require('./configs/connectDataBase');
const router = require('./routers')



app.use(express.json()) // gửi json lên 
app.use(express.urlencoded({extended:true})) // format để HTML gửi data tới server
app.use(express.static('./public'));
app.use(express.static('./uploads'));

connectDB();
router(app);

app.listen(5000, () => {
  console.log('server running at port 5000');
});
