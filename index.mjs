import express from 'express';
import fetch from 'node-fetch';
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', (req, res) => {
   
});

app.listen(3000, () => {
   console.log('server started');
});

