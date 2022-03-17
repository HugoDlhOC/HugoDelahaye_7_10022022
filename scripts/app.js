import { recipes } from "../ressources/data/recipes.js";
import { Recipe } from "./classes/Recipe.js";
import { addEventDisplayCloseSecondaryMenu } from "./sortSecondarySearches.js";
import { fctSearchSortRecipes } from "./mainSearchSort.js";
import { fctSecondarySearchSort } from "./sortSecondarySearches.js";
import { displayGoodRecipe } from "./mainSearchSort.js";
import { deleteFilter } from "./sortSecondarySearches.js";

  //Afficher les menus au clic sur le lien ou l'icone
  //Menu ingrédients
  addEventDisplayCloseSecondaryMenu("ingredients");
  
  //Menu appareils
  addEventDisplayCloseSecondaryMenu("machines");
  
  //Menu ustentils
  addEventDisplayCloseSecondaryMenu("utensils");

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
const ingredientsMenu = document.querySelector(`#ingredients-menu-items`);
Recipe.addHtmlSecondaryMenuElements(
  ingredientsMenu,
  tabOfIngredients,
  "ingredient"
);

//Ajout des appareils dans le menu secondaire
const machinesMenu = document.querySelector(`#machines-menu-items`);
Recipe.addHtmlSecondaryMenuElements(machinesMenu, tabOfMachines, "machine");

//Ajout des ustensils dans le menu secondaire
const utensilsMenu = document.querySelector(`#utensils-menu-items`);
Recipe.addHtmlSecondaryMenuElements(utensilsMenu, tabOfUtensils, "utensil");

//Ajouter tous l'HTML des tags
const tagsContainer = document.querySelector(".tags-container");
//Menu ingrédients
Recipe.addHtmlOfTags(tagsContainer, tabOfIngredients, "ingredient-tag");
//Menu appareils
Recipe.addHtmlOfTags(tagsContainer, tabOfMachines, "machine-tag");
//Menu appareils
Recipe.addHtmlOfTags(tagsContainer, tabOfUtensils, "utensil-tag");

//Fonctionalitée de tri des recettes via le champs de recherche principale
//Récupérer ce qui est tapé dans le champs de saisi
const mainSearchInput = document.querySelector("#main-search-field");

mainSearchInput.addEventListener("input", (e) => {
  fctSearchSortRecipes(e, inputUser);
});
let inputUser = undefined;

export let ingredientsItemsLinks = document.querySelectorAll(".ingredient a");
export let machinesItemsLinks = document.querySelectorAll(".machine a");
export let utensilsItemsLinks = document.querySelectorAll(".utensil a");



//Fonctionalitée de tri des recettes pour le champs de recherche secondaire Ingrédients
const inputSortMenuIngredientsDisplay = document.querySelector(
  `#input-ingredients--display`
);
const inputSortMenuMachinesDisplay = document.querySelector(
  `#input-machines--display`
);
const inputSortMenuUtensilsDisplay = document.querySelector(
  `#input-utensils--display`
);
inputSortMenuIngredientsDisplay.addEventListener("input", (e) => {
  fctSecondarySearchSort(e, "ingredient");
});
inputSortMenuMachinesDisplay.addEventListener("input", (e) => {
  fctSecondarySearchSort(e, "machine");
});
inputSortMenuUtensilsDisplay.addEventListener("input", (e) => {
  fctSecondarySearchSort(e, "utensil");
});


//Ajouter un évènement click sur chacun des liens contenus dans les menus secondaires
//Menu ingrédients
export let selectedIngredients = new Set();
export const tagsIngredientsSpan = document.querySelectorAll(".ingredient-tag span");

ingredientsItemsLinks.forEach((link) => {
  link.addEventListener("click", () => {
    fctEventLinkItemIngredient(link);
  });

  function fctEventLinkItemIngredient(link) {
    //Ajout de l'item dans le tableau
    selectedIngredients.add(link.innerHTML);

    displayGoodRecipe(inputUser, recipes);
  }
  removeEventListener("click", fctEventLinkItemIngredient);
});

//Menu appareils
export let selectedMachines = new Set();
export const tagsMachinesSpan = document.querySelectorAll(".machine-tag span");

machinesItemsLinks.forEach((link) => {
  link.addEventListener("click", () => {
    fctEventLinkItemMachine(link);
  });

  function fctEventLinkItemMachine(link) {
    //Ajout de l'item dans le tableau
    selectedMachines.add(link.innerHTML);
    //Appel fonction de filtrage
    displayGoodRecipe(inputUser, recipes);
  }
  removeEventListener("click", fctEventLinkItemMachine);
});

//Menu ustensils
export let selectedUtensils = new Set();
export const tagsUtensilsSpan = document.querySelectorAll(".utensil-tag span");

utensilsItemsLinks.forEach((link) => {
  link.addEventListener("click", () => {
    fctEventLinkItemUtensil(link);
  });

  function fctEventLinkItemUtensil(link) {
    //Ajout de l'item dans le tableau
    selectedUtensils.add(link.innerHTML);
    //Appel fonction de filtrage
    displayGoodRecipe(inputUser, recipes);
  }
  removeEventListener("click", fctEventLinkItemUtensil);
});

//SUPPRESSION DES TAGS
//Ajouter un évènement sur tous les boutons de fermeture de tags ingrédients
const tagsDeleteIngredientsBtn = document.querySelectorAll(
  ".ingredient-tag .delete-tag-btn"
);

tagsDeleteIngredientsBtn.forEach((tagDeleteBtn, index) => {
  tagDeleteBtn.addEventListener("click", (e) => {
    deleteFilter(e, index, selectedIngredients, tagsIngredientsSpan, inputUser);
  });
});

//Ajouter un évènement sur tous les boutons de fermeture de tags appareils
const tagsDeleteMachinesBtn = document.querySelectorAll(
  ".machine-tag .delete-tag-btn"
);

tagsDeleteMachinesBtn.forEach((tagDeleteBtn, index) => {
  tagDeleteBtn.addEventListener("click", (e) => {
    deleteFilter(e, index, selectedMachines, tagsMachinesSpan, inputUser);
  });
});

//Ajouter un évènement sur tous les boutons de fermeture de tags ustensils
const tagsDeleteUtensilsBtn = document.querySelectorAll(
  ".utensil-tag .delete-tag-btn"
);

tagsDeleteUtensilsBtn.forEach((tagDeleteBtn, index) => {
  tagDeleteBtn.addEventListener("click", (e) => {
    deleteFilter(e, index, selectedUtensils, tagsUtensilsSpan, inputUser);
  });
});

