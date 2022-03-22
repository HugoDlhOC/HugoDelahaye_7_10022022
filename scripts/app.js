import { recipes } from "../ressources/data/recipes.js";
import { displayMessageRecipeNoFound } from "./messageRecipeEmpty.js";
import { hideMessageRecipeNoFound } from "./messageRecipeEmpty.js";

//Fonctionalitée de tri des recettes via le champs de recherche principale
//Récupérer ce qui est tapé dans le champs de saisi
const mainSearchInput = document.querySelector("#main-search-field");

mainSearchInput.addEventListener("input", fctSearchSortRecipes);
let inputUser = undefined;

/**
 * Fonction pour l'évènement input de la recherche principale qui va stocker ce que l'utilisateur saisie et lance la fonction de tri principale => displayGoodRecipes()
 * @param { any } e
 */
function fctSearchSortRecipes(e) {
  inputUser = e.target.value;
  displayGoodRecipe(inputUser.trim().toLowerCase(), recipes);
}

let collectionIngredientsPrimarySearchRecipe = new Set();
let collectionMachinesPrimarySearchRecipe = new Set();
let collectionUtensilsPrimarySearchRecipe = new Set();

let ingredientsItems = document.querySelectorAll(".ingredient");
let machinesItems = document.querySelectorAll(".machine");
let utensilsItems = document.querySelectorAll(".utensil");
let ingredientsItemsLinks = document.querySelectorAll(".ingredient a");
let machinesItemsLinks = document.querySelectorAll(".machine a");
let utensilsItemsLinks = document.querySelectorAll(".utensil a");


/**
 * Cette fonction controle si la valeur tapée dans le champs de recherche principal correspond à une ou * plusieurs recette par le controle de son nom, de sa description et de ses ingrédients.
 * @param { any } valueInput
 * @param { any } recipes
 * @return {number[]} 
 */
function displayGoodRecipe(valueInput, recipes) {
  let tabResults = [];

  if (valueInput !== undefined && valueInput.length > 2) {
    for (let i = 0; i < recipes.length; i++) {
      let ifValueFind = false; //Permet d'éviter les doublons
      //Controle nom - description
      if (ifValueFind === false) {
        if (recipes[i].name.toLowerCase().includes(valueInput) || recipes[i].description.toLowerCase().includes(valueInput)) {
          tabResults.push(i);
          ifValueFind = true;
        }
      }

      //Controle ingredients
      if (ifValueFind === false) {
        for (let j = 0; j < recipes[i].ingredients.length; j++) {
          if (
            recipes[i].ingredients[j].ingredient
              .toLowerCase()
              .includes(valueInput)
          ) {
            tabResults.push(i);
            ifValueFind = true;
          }
        }
      }
    }

    let articlesRecipes = document.querySelectorAll(".recipe-card article");
    //Affichage des bonnes recettes
    //Tous les articles passent en display none

    for (let i = 0; i < articlesRecipes.length; i++) {
      articlesRecipes[i].classList.remove("display-block");
      articlesRecipes[i].classList.add("class", "display-none");
    }

    //Seules les bonnes recettes sont affichées
    for (let i = 0; i < tabResults.length; i++) {
      articlesRecipes[tabResults[i]].classList.replace(
        "display-none",
        "display-block"
      );
    }

    //Ajouts des items aux 3 menus
    addItemsSecondaryMenus(tabResults);
  } else {
    for (let i = 0; i < recipes.length; i++) {
      tabResults.push(i);
    }
    for(let i = 0; i < document.querySelectorAll(".recipe-card article").length; i++){
      document.querySelectorAll(".recipe-card article")[i].classList.remove("display-none");
      document.querySelectorAll(".recipe-card article")[i].classList.add("display-block");
    }
  }
  if (tabResults.length === 0) {
    displayMessageRecipeNoFound();
  } else {
    hideMessageRecipeNoFound();
  }

  filterForIngredientsMachinesUtensils(tabResults);

  return tabResults;
}

//Fonctionalitée de tri des recettes pour le champs de recherche secondaire Ingrédients
const inputSortMenuIngredientsDisplay = document.querySelector(
  "#input-ingredients--display"
);
const inputSortMenuMachinesDisplay = document.querySelector(
  "#input-machines--display"
);
const inputSortMenuUtensilsDisplay = document.querySelector(
  "#input-utensils--display"
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

//Cette fonction permet d'afficher les items qui correspondent à ce qui a été saisi dans les champs de recherche secondaires
/**
 * Cette fonction permet d'afficher les items qui correspondent à ce qui a été saisi dans les champs de recherche secondaires
 * @param { any } e
 * @param { any } typeOfItem
 */
function fctSecondarySearchSort(e, typeOfItem) {
  //Récupérer les éléments a masquer (qui ne correspondent pas à ce qui est saisi)
  const itemsDisplay = document.getElementsByClassName(
    `${typeOfItem} display-block`
  );
  let inputUser = e.target.value.trim();

  //Masquer tous les autres éléments
  for (let i = 0; i < itemsDisplay.length; i++) {
    itemsDisplay[i].classList.add("display-none");
  }

  //Le but maintenant est de masquer les éléments qui ne correspondent pas a ce qui a été recherché
  for (let i = 0; i < itemsDisplay.length; i++) {
    if (
      itemsDisplay[i].children[0].innerHTML.toLowerCase().includes(inputUser)
    ) {
      itemsDisplay[i].classList.remove("display-none");
    }
  }
}

//Ajouter un évènement click sur chacun des liens contenus dans les menus secondaires
//Menu ingrédients
let selectedIngredients = new Set();
const tagsIngredientsSpan = document.querySelectorAll(".ingredient-tag span");
const tagsIngredientsDiv = document.querySelectorAll(".ingredient-tag");
ingredientsItemsLinks.forEach((link) => {
  link.addEventListener("click", () => {
    fctEventLinkItemIngredient(link);
    inputSortMenuIngredientsDisplay.value = "";
  });

  function fctEventLinkItemIngredient(link) {
    //Ajout de l'item dans le tableau
    selectedIngredients.add(link.innerHTML);

    displayGoodRecipe(inputUser, recipes);
  }
  removeEventListener("click", fctEventLinkItemIngredient);
});

//Menu appareils
let selectedMachines = new Set();
const tagsMachinesSpan = document.querySelectorAll(".machine-tag span");
const tagsMachinesDiv = document.querySelectorAll(".machine-tag");
machinesItemsLinks.forEach((link) => {
  link.addEventListener("click", () => {
    fctEventLinkItemMachine(link);
    inputSortMenuMachinesDisplay.value = "";
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
let selectedUtensils = new Set();
const tagsUtensilsSpan = document.querySelectorAll(".utensil-tag span");
const tagsUtensilsDiv = document.querySelectorAll(".utensil-tag");
utensilsItemsLinks.forEach((link) => {
  link.addEventListener("click", () => {
    fctEventLinkItemUtensil(link);
    inputSortMenuUtensilsDisplay.value = "";
  });

  function fctEventLinkItemUtensil(link) {
    //Ajout de l'item dans le tableau
    selectedUtensils.add(link.innerHTML);
    //Appel fonction de filtrage
    displayGoodRecipe(inputUser, recipes);
  }
  removeEventListener("click", fctEventLinkItemUtensil);
});

/**
 * Ajout des items des recettes actives
 * @param { any } indexOfGoodRecipes
 */
function addItemsSecondaryMenus(indexOfGoodRecipes) {
  //Récupération de tous les ingrédients
  collectionIngredientsPrimarySearchRecipe.clear(); //SUPPRIME tous les éléments du SET
  indexOfGoodRecipes.forEach((value) => {
    recipes[value].ingredients.forEach((ingredients) => {
      collectionIngredientsPrimarySearchRecipe.add(ingredients.ingredient);
    });
  });

  //Ne plus afficher les ingrédients/machines/ustentils qui ne sont pas contenu dans les recettes recherchées au champs de recherche principal
  //Ingrédients
  ingredientsItems.forEach((ingredientItem) => {
    ingredientItem.classList.replace("display-block", "display-none");
  });

  Array.from(collectionIngredientsPrimarySearchRecipe).forEach((ingredient) => {
    ingredientsItems.forEach((ingredientItem, index) => {
      if (ingredientsItemsLinks[index].innerHTML === ingredient) {
        //Afficher les ingrédients concernés
        ingredientItem.classList.replace("display-none", "display-block");
      }
    });
  });

  //Récupération de tous les appareils
  collectionMachinesPrimarySearchRecipe.clear();
  indexOfGoodRecipes.forEach((value) => {
    collectionMachinesPrimarySearchRecipe.add(recipes[value].appliance);
  });

  //Ne plus afficher les ingrédients/machines/ustentils qui ne sont pas contenu dans les recettes recherchées au champs de recherche principal
  //Appareils
  machinesItems.forEach((machineItem) => {
    machineItem.classList.replace("display-block", "display-none");
  });

  Array.from(collectionMachinesPrimarySearchRecipe).forEach((machine) => {
    machinesItems.forEach((machineItem, index) => {
      if (machinesItemsLinks[index].innerHTML === machine) {
        //Afficher les ingrédients concernés
        machineItem.classList.replace("display-none", "display-block");
      }
    });
  });

  //Récupération de tous les ustensils
  collectionUtensilsPrimarySearchRecipe.clear();
  indexOfGoodRecipes.forEach((value) => {
    for (let i = 0; i < recipes[value].ustensils.length; i++) {
      collectionUtensilsPrimarySearchRecipe.add(recipes[value].ustensils[i]);
    }
  });
  
  //Ne plus afficher les ingrédients/machines/ustentils qui ne sont pas contenu dans les recettes recherchées au champs de recherche principal
  //Ustensiles
  utensilsItems.forEach((utensilItem) => {
    utensilItem.classList.replace("display-block", "display-none");
  });

  Array.from(collectionUtensilsPrimarySearchRecipe).forEach((utensil) => {
    utensilsItems.forEach((utensilItem, index) => {
      if (utensilsItemsLinks[index].innerHTML === utensil) {
        //Afficher les ingrédients concernés
        utensilItem.classList.replace("display-none", "display-block");
      }
    });
  });
}

/**
 * Fonction de filtrage qui peut s'appliquer au 3 types d'items (ingrédients - appareils - ustensils)
 * @param { any } activeRecipes
 * @param { string } typeOfFilter "ingredient" ou "machine" ou "utensil"
 * @param { Set } selectedTypeOfItem
 * @param { NodeList } tagsTypeOfItemSpan
 * @param { NodeList } tagTypeOfItemDiv
 * @return { any }
 */
 function filterForItems(
  activeRecipes,
  typeOfFilter,
  selectedTypeOfItem,
  tagsTypeOfItemSpan,
  tagTypeOfItemDiv
) {
  //Controle de présence d'un tag actif de type MACHINE/APPAREILS, si oui agir en conséquence
  if (selectedTypeOfItem.size !== 0) {
    let badRecipes = [];
    //Pour toutes les recettes actives
    activeRecipes.forEach(activeRecipe => {
      const recipe = recipes[activeRecipe];
      let control = true;
      let activeFilter = "";

      //Pour tous les tags d'ingrédients actifs
      Array.from(selectedTypeOfItem).forEach(selectedItem => {
        const selectedActiveItem = selectedItem; //Récupération machine active

        tagsTypeOfItemSpan.forEach((tagTypeOfItemSpan, index) => {
          if (tagTypeOfItemSpan.innerHTML === selectedActiveItem) {
            tagTypeOfItemDiv[index].classList.replace(
              "display-none",
              "display-flex"
            );
          }
        });

        if (typeOfFilter === "ingredient") {
          //Ajout des ingrédients
          activeFilter = recipe.ingredients.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.ingredient + " ";
          }, "");
        } else if (typeOfFilter === "machine") {
          //Ajout des appareils
          activeFilter += recipe.appliance;
        } else if (typeOfFilter === "utensil") {
          //Ajout des ustensils
          recipe.ustensils.forEach(ustensils => {
            activeFilter += ustensils + " ";
          });
        }
        else{
          console.log("The tag type is not known.");
        }

        if (!activeFilter.includes(selectedActiveItem)) {
          //Si le tag n'est pas inclu dans les machines, alors le control passe a false
          control = false;
        }
        activeFilter = "";
      });

      if (control === false) {
        //Recette a masquer
        document.getElementById(recipe.id).classList.remove("display-block");
        document.getElementById(recipe.id).classList.add("display-none");
        badRecipes.push(recipe.id - 1);
      }
    });
    //Suppression des mauvaises recettes du tableau
    for (let i = 0; i < activeRecipes.length; i++) {
      for (let z = 0; z < badRecipes.length; z++) {
        if (activeRecipes[i] === badRecipes[z]) {
          activeRecipes.splice(i, 1);
        }
      }
    }
  }
  if (activeRecipes.length === 0) {
    displayMessageRecipeNoFound();
  } else {
    hideMessageRecipeNoFound();
  }
  return activeRecipes;
}

/**
 * Fonction qui lance la fonction de filtrage 3 fois (pour chaque type d'items)
 * @param { any } activeRecipes 
 */
function filterForIngredientsMachinesUtensils(activeRecipes) {

  activeRecipes = filterForItems(
    activeRecipes,
    "ingredient",
    selectedIngredients,
    tagsIngredientsSpan,
    tagsIngredientsDiv
  );
  activeRecipes = filterForItems(
    activeRecipes,
    "machine",
    selectedMachines,
    tagsMachinesSpan,
    tagsMachinesDiv
  );
  activeRecipes = filterForItems(
    activeRecipes,
    "utensil",
    selectedUtensils,
    tagsUtensilsSpan,
    tagsUtensilsDiv
  );

  addItemsSecondaryMenus(activeRecipes); //Mise à jour des items disponibles dans les menus secondaires
}

//SUPPRESSION DES TAGS
//Ajouter un évènement sur tous les boutons de fermeture de tags ingrédients
const tagsDeleteIngredientsBtn = document.querySelectorAll(
  ".ingredient-tag .delete-tag-btn"
);

tagsDeleteIngredientsBtn.forEach((tagDeleteBtn, index) => {
  tagDeleteBtn.addEventListener("click", (e) => {
    deleteFilter(e, index, selectedIngredients, tagsIngredientsSpan);
  });
});

//Ajouter un évènement sur tous les boutons de fermeture de tags appareils
const tagsDeleteMachinesBtn = document.querySelectorAll(
  ".machine-tag .delete-tag-btn"
);

tagsDeleteMachinesBtn.forEach((tagDeleteBtn, index) => {
  tagDeleteBtn.addEventListener("click", (e) => {
    deleteFilter(e, index, selectedMachines, tagsMachinesSpan);
  });
});

//Ajouter un évènement sur tous les boutons de fermeture de tags ustensils
const tagsDeleteUtensilsBtn = document.querySelectorAll(
  ".utensil-tag .delete-tag-btn"
);

tagsDeleteUtensilsBtn.forEach((tagDeleteBtn, index) => {
  tagDeleteBtn.addEventListener("click", (e) => {
    deleteFilter(e, index, selectedUtensils, tagsUtensilsSpan);
  });
});

/**
 * Permet la suppression d'un filtre, sert aux évènement click sur les icones de fermeture des filtres
 * @param { any } e
 * @param { any } index
 * @param {Set } collectionOfElements
 * @param { NodeList } elementsTagsSpan
 */
function deleteFilter(e, index, collectionOfElements, elementsTagsSpan) {
  e.target.parentElement.parentElement.classList.replace(
    "display-flex",
    "display-none"
  );
  collectionOfElements.forEach((selectElement) => {

    //Si l'élément séléctionné est égal à la valeur HTML du tag affiché, alors on supprime l'élément du Set.
    if (selectElement === elementsTagsSpan[index].innerHTML) {
      collectionOfElements.delete(elementsTagsSpan[index].innerHTML);

      if (inputUser === undefined) {
        document.querySelectorAll(".recipe-card article").forEach((article) => {
          article.classList.remove("display-none");
          article.classList.add("display-block");
        });
      }
      displayGoodRecipe(inputUser, recipes);
    }
  });
}