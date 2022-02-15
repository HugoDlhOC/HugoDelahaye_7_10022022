import { recipes } from "../ressources/data/recipes.js";
import { Recipe } from "./classes/Recipe.js";

//Première étape : affichage de toutes les recettes
console.log(recipes);

//Pour toutes les recettes, ajout de l'HTML
recipes.forEach(recipe => {
    //Création objet recette avec la recette actuelle passée au constructeur
    const objRecipe = new Recipe(recipe);
    objRecipe.addHtmlOfRecipes();
});