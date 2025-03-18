const express = require('express');
const fs = require('fs').promises;

const app = express();
const port = 3000;
app.use(express.json());

app.listen( port , () => {
    console.log(`server is listening on port: ${port}`)
});


// HELPER FUNCTIONS
const returnAllRecipes = async () => {
    const recipes = await fs.readFile("../data/recipe-data.json", "utf8");
    const parsedRecipes = JSON.parse(recipes);
    return parsedRecipes;
}

const returnOneRecipe = async (id) => {
    const recipes = await fs.readFile("../data/recipe-data.json", "utf8");
    const parsedRecipe = JSON.parse(recipes)[id];
    return parsedRecipe;
}

const deleteRecipe = async (id) => {
    const recipes = await fs.readFile("../data/recipe-data.json", "utf8");
    const parsedRecipes = JSON.parse(recipes);
    parsedRecipes.splice(id, 1);
    const stringRecipes = JSON.stringify(parsedRecipes);
    fs.writeFile("../data/recipe-data.json", stringRecipes, "utf8")
}

const updateRecipe = async (id, name) => {
    const recipes = await fs.readFile("../data/recipe-data.json", "utf8");
    const parsedRecipes = JSON.parse(recipes);
    console.log(parsedRecipes[id].name)
    parsedRecipes[id].name = name;
    const stringRecipes = JSON.stringify(parsedRecipes);
    fs.writeFile("../data/recipe-data.json", stringRecipes, "utf8")
}

// API ENDPOINTS
// find all recipes
app.get("/recipes", async (req, res) => {
   const recipes = await returnAllRecipes();
   res.send(JSON.stringify(recipes))
})


// find one recipe
app.get("/recipe/:id", async (req, res) => {
    const recipe = await returnOneRecipe(req.params.id);
    res.send(JSON.stringify(recipe))
 })
 

// delete one recipe
app.get("/delete-recipe/:id", async (req, res) => {
    await deleteRecipe(req.params.id);
    res.send("bye bye recipe") 
})

// update one recipe name
app.get("/update-recipe/:id/:newname", async (req, res) => {
    await updateRecipe(req.params.id, req.params.newname);
    res.send("recipe name is different") 
})