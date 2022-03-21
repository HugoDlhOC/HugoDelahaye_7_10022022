import { recipes } from "../ressources/data/recipes.js";
import { Recipe } from "./classes/Recipe.js";


//Pour toutes les recettes, ajout de l'HTML des recettes, ainsi que des éléments des menus secondaires
let collectionOfIngredients = new Set();
let tabOfIngredients = [];
let collectionOfMachines = new Set();
let tabOfMachines = [];
let collectionOfUtensils = new Set();
let tabOfUtensils = [];

recipes.forEach((recipe) => {
  //Création objet recette avec la recette actuelle passée au constructeur
  const objRecipe = new Recipe(recipe);
  objRecipe.addHtmlOfRecipe();

  //Ajout de tous les ingredients dans la collection de valeur, puis conversion de la collection en tab
  recipe.ingredients.forEach((ingredient) => {
    collectionOfIngredients.add(ingredient.ingredient);
  });
  tabOfIngredients = Array.from(collectionOfIngredients);

  //Ajout de tous les appareils dans la collection de valeur, puis conversion de la collection en tab
  collectionOfMachines.add(recipe.appliance);
  tabOfMachines = Array.from(collectionOfMachines);

  //Ajout de tous les ustensils dans la collection de valeur,  puis conversion de la collection en tab
  recipe.ustensils.forEach((ustensil) => {
    collectionOfUtensils.add(ustensil);
  });
  tabOfUtensils = Array.from(collectionOfUtensils);
});

//Ajout des ingredients dans le menu secondaire
const ingredientsMenu = document.querySelector("#ingredients-menu-items");
Recipe.addHtmlSecondaryMenuElements(
  ingredientsMenu,
  tabOfIngredients,
  "ingredient"
);

//Ajout des appareils dans le menu secondaire
const machinesMenu = document.querySelector("#machines-menu-items");
Recipe.addHtmlSecondaryMenuElements(machinesMenu, tabOfMachines, "machine");

//Ajout des ustensils dans le menu secondaire
const utensilsMenu = document.querySelector("#utensils-menu-items");
Recipe.addHtmlSecondaryMenuElements(utensilsMenu, tabOfUtensils, "utensil");

//Ajouter tous l'HTML des tags
const tagsContainer = document.querySelector(".tags-container");
//Menu ingrédients
Recipe.addHtmlOfTags(tagsContainer, tabOfIngredients, "ingredient-tag");
//Menu appareils
Recipe.addHtmlOfTags(tagsContainer, tabOfMachines, "machine-tag");
//Menu appareils
Recipe.addHtmlOfTags(tagsContainer, tabOfUtensils, "utensil-tag");