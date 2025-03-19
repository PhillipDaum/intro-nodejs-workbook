import express from 'express'; //external module for using express
import pg from 'pg';
const { Client } = pg;  //external module for using postgres with node
import config from './config.js'; // internal module for connecting to our config file

const app = express();
const port = 3000;

app.use(express.json());

const client = new Client(config); //creating our database Client with our config values
 
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// Helper Functions
const getAllLanguages = async () => {
    await client.connect(); //connecting to our database
    let result = await client.query("SELECT * FROM programming_languages"); 
    await client.end(); //ending the connection to our database
    return result.rows;
}

const getOneLanguage = async (id) => {
  await client.connect(); //connecting to our database
  let result = await client.query(`SELECT ${id} FROM programming_languages`); 
  await client.end(); //ending the connection to our database
  return result.rows;
}


// API ENDPOINTS
// Get All languages
app.get("/get-all-languages", async (req, res) => {
    let languages = await getAllLanguages();
    let JSONLanguages = JSON.stringify(languages);
    res.send(JSONLanguages);
})

// Get one language
app.get("/get-one-language/:id", async (req, res) => {
  let languages = await getOneLanguage(req.params.id);
  let JSONLanguages = JSON.stringify(languages);
  res.send(JSONLanguages);
})
