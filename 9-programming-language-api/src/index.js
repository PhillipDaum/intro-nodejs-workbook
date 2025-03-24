import express from "express"; //external module for using express
import pg from "pg";
const { Client } = pg; //external module for using postgres with node
import config from "./config.js"; // internal module for connecting to our config file

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// Helper Functions
const getAllLanguages = async () => {
  const client = new Client(config); //creating our database Client with our config values
  await client.connect(); //connecting to our database
  let result = await client.query("SELECT * FROM programming_languages");
  await client.end(); //ending the connection to our database
  return result.rows;
};

const getAllLanguagesSortByYear = async () => {
  const client = new Client(config); //creating our database Client with our config values
  await client.connect(); //connecting to our database
  let result = await client.query(
    "SELECT * FROM programming_languages ORDER BY released_year"
  );
  await client.end(); //ending the connection to our database
  return result.rows;
};

const getAllLanguagesSortByCol = async (colId) => {
  const client = new Client(config); //creating our database Client with our config values
  await client.connect(); //connecting to our database
  // change
  let result = await client.query(
    `SELECT * FROM programming_languages ORDER BY ${colId}`
  );
  await client.end(); //ending the connection to our database
  return result.rows;
};

const getAllLanguagesSearchByTerm = async (term) => {
  const client = new Client(config); //creating our database Client with our config values
  await client.connect(); //connecting to our database
  // change
  let result = await client.query(
    `SELECT * FROM programming_languages WHERE LOWER(name) LIKE LOWER('%${term}%')`
  );
  await client.end(); //ending the connection to our database
  return result.rows;
};

const getOneLanguage = async (id) => {
  const client = new Client(config); //creating our database Client with our config values
  await client.connect(); //connecting to our database
  let result = await client.query(
    `SELECT * FROM programming_languages WHERE id = '${id}'`
  );
  await client.end(); //ending the connection to our database
  return result.rows;
};

const addOneLanguage = async (obj) => {
  console.log(obj);
  const client = new Client(config); //creating our database Client with our config values
  await client.connect(); //connecting to our database
  await client.query(
    `INSERT INTO programming_languages (id, name, released_year, githut_rank, pypl_rank, tiobe_rank) VALUEs ('17', '${obj.name}', ${obj.releasedYear}, ${obj.githutRank}, ${obj.pyplRank}, ${obj.tiobeRank});`
  );
};

// API ENDPOINTS
// Get All languages
app.get("/get-all-languages", async (req, res) => {
  let languages = await getAllLanguages();
  let JSONLanguages = JSON.stringify(languages);
  res.send(JSONLanguages);
});
// Get all languages - sort by year
app.get("/get-all-languages/sort-by-year", async (req, res) => {
  let languages = await getAllLanguagesSortByYear();
  let JSONLanguages = JSON.stringify(languages);
  res.send(JSONLanguages);
});

// Get all languages - sort by column
app.get("/get-all-languages/sort-by/:col", async (req, res) => {
  let languages = await getAllLanguagesSortByCol(req.params.col);
  let JSONLanguages = JSON.stringify(languages);
  res.send(JSONLanguages);
});

// Get all languages - name contains a certain term
app.get("/get-all-languages/search-languages-by-name/:term", async (req, res) => {
  let languages = await getAllLanguagesSearchByTerm(req.params.term);
  let JSONLanguages = JSON.stringify(languages);
  res.send(JSONLanguages);
});

// Get one language
app.get("/get-one-language/:id", async (req, res) => {
  let language = await getOneLanguage(req.params.id);
  let JSONLanguage = JSON.stringify(language);
  res.send(JSONLanguage);
});

// Add one language
app.post("/add-one-language", async (req, res) => {
  await addOneLanguage(req.body);
  res.send("Success! You added a language.");
});

