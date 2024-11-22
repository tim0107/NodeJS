const express = require('express');
const app = express();
const connectDB = require('./configs/database');
const router = require("./router");

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('./public'));

//để gửi được body json lên
app.use(express.json());

connectDB();
router(app);



app.listen(5000, () => {
  console.log('server run at port 5000');
});
