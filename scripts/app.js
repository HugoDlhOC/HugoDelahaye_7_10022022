import { recipes } from "../ressources/data/recipes.js";
import { Recipe } from "./classes/Recipe.js";

/**
 * Fonction qui affiche le message indiquant qu'il n'y a pas de recette trouvée
 */
function displayMessageRecipeNoFound() {
  document
    .querySelector("#message")
    .classList.replace("display-none", "display-flex");
}

/**
 * Fonction qui cache le message indiquant qu'il n'y a pas de recette trouvée
 */
function hideMessageRecipeNoFound() {
  document
    .querySelector("#message")
    .classList.replace("display-flex", "display-none");
}

/**
 * Fonction qui affiche les ajoute les évènements d'ouverture et de fermeture des 3 menus secondaires
 * @param { any } nameOfMenu
 */
function addEventDisplayCloseSecondaryMenu(nameOfMenu) {
  const linkAndIconHideMenu = document.querySelector(
    `#input-icon-${nameOfMenu}--hide`
  );
  const linkAndIconDisplayMenu = document.querySelector(
    `#input-icon-${nameOfMenu}--display`
  );
  const inputSortMenuHide = document.querySelector(
    `#input-${nameOfMenu}--hide`
  );
  const inputSortMenuDisplay = document.querySelector(
    `#input-${nameOfMenu}--display`
  );
  const iconSortMenuHide = document.querySelector(`#icon-${nameOfMenu}--hide`);
  const iconSortMenuDisplay = document.querySelector(
    `#icon-${nameOfMenu}--display`
  );
  const menu = document.querySelector(`#${nameOfMenu}-menu-items`);

  inputSortMenuHide.addEventListener("click", fctOpenMenu);
  iconSortMenuHide.addEventListener("click", fctOpenMenu);
  inputSortMenuDisplay.addEventListener("click", fctCloseMenu);
  iconSortMenuDisplay.addEventListener("click", fctCloseMenu);

  function fctOpenMenu() {
    menu.classList.replace("display-none", "display-grid");
    menu.classList.add("mr-4");
    linkAndIconHideMenu.classList.replace("display-flex", "display-none");
    linkAndIconDisplayMenu.classList.replace("display-none", "display-flex");
    linkAndIconDisplayMenu.classList.add("mr-4");
    inputSortMenuHide.classList.replace("display-block", "display-none");
    inputSortMenuDisplay.classList.replace("display-none", "display-block");
    inputSortMenuDisplay.focus();
  }

  function fctCloseMenu() {
    menu.classList.replace("display-grid", "display-none");
    menu.classList.remove("mr-4");
    linkAndIconHideMenu.classList.replace("display-none", "display-flex");
    linkAndIconDisplayMenu.classList.replace("display-flex", "display-none");
    linkAndIconDisplayMenu.classList.remove("mr-4");
    inputSortMenuHide.classList.replace("display-none", "display-block");
    inputSortMenuDisplay.classList.replace("display-block", "display-none");
  }
}
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
console.log(ingredientsItems);

/**
 * Cette fonction controle si la valeur tapée dans le champs de recherche principal correspond à une ou * plusieurs recette par le controle de son nom, de sa description et de ses ingrédients.
 * @param { any } valueInput
 * @param { any } recipes
 * @return {number[]} 
 */
function displayGoodRecipe(valueInput, recipes) {
  let tabResults = [];

  if (valueInput !== undefined && valueInput.length > 2) {
    recipes.forEach((recipe, index) => {
      let ifValueFind = false; //Permet d'éviter les doublons

      //Controle nom - description
      if (ifValueFind === false) {
        if(String(Array(recipe).filter(recipe => recipe.name.toLowerCase().includes(valueInput) || recipe.description.toLowerCase().includes(valueInput))) !== ""){ //Si le résultat n'est pas vide, alors recette valide
          tabResults.push(index);
          ifValueFind = true;
        }
      }

      //Controle ingredients -- some a utiliser 
      if (ifValueFind === false) {
        if(ifValueFind = recipe.ingredients.some(ingredients => ingredients.ingredient.toLowerCase().includes(valueInput))){
          tabResults.push(index);
        };
      }
    });


    let articlesRecipes = document.querySelectorAll(".recipe-card article");
    //Affichage des bonnes recettes
    //Tous les articles passent en display none
    articlesRecipes.forEach(articleRecipe => {
      articleRecipe.classList.remove("display-block");
      articleRecipe.classList.add("class", "display-none");
    });

    //Seules les bonnes recettes sont affichées
    tabResults.forEach(result => {
      articlesRecipes[result].classList.replace(
        "display-none",
        "display-block"
      );
    });

    //Ajouts des items aux 3 menus
    addItemsSecondaryMenus(tabResults);
  } else {
    recipes.forEach((recipe, index) => {
      tabResults.push(index);
    });
    document.querySelectorAll(".recipe-card article").forEach((article) => {
      article.classList.remove("display-none");
      article.classList.add("display-block");
    });
  }
  if (tabResults.length === 0) {
    displayMessageRecipeNoFound();
  } else {
    hideMessageRecipeNoFound();
  }
  console.log(tabResults);

  filterForIngredientsMachinesUtensils(tabResults);

  return tabResults;
}

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
      console.log("ça correspond");
      console.log(itemsDisplay);
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
  });

  function fctEventLinkItemIngredient(link) {
    //Ajout de l'item dans le tableau
    selectedIngredients.add(link.innerHTML);
    console.log(selectedIngredients);

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
  });

  function fctEventLinkItemMachine(link) {
    //Ajout de l'item dans le tableau
    selectedMachines.add(link.innerHTML);
    console.log(selectedMachines);
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
  });

  function fctEventLinkItemUtensil(link) {
    //Ajout de l'item dans le tableau
    selectedUtensils.add(link.innerHTML);
    console.log(selectedUtensils);
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
    for (let i = 0; i < activeRecipes.length; i++) {
      const recipe = recipes[activeRecipes[i]];
      let control = true;
      let activeFilter = "";

      //Pour tous les tags d'ingrédients actifs
      for (let j = 0; j < selectedTypeOfItem.size; j++) {
        const selectedActiveItem = Array.from(selectedTypeOfItem)[j]; //Récupération machine active

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
          for (let k = 0; k < recipe.ingredients.length; k++) {
            activeFilter += recipe.ingredients[k].ingredient + " ";
          }
        } else if (typeOfFilter === "machine") {
          //Ajout des appareils
          activeFilter += recipe.appliance;
        } else if (typeOfFilter === "utensil") {
          //Ajout des ustensils
          for (let k = 0; k < recipe.ustensils.length; k++) {
            activeFilter += recipe.ustensils[k] + " ";
          }
        }

        if (!activeFilter.includes(selectedActiveItem)) {
          //Si le tag n'est pas inclu dans les machines, alors le control passe a false
          control = false;
        }
        activeFilter = "";
      }

      if (control === false) {
        //Recette a masquer
        document.getElementById(recipe.id).classList.remove("display-block");
        document.getElementById(recipe.id).classList.add("display-none");
        badRecipes.push(recipe.id - 1);
      }
    }
    //Suppression du tableau des mauvaises recettes
    for (let i = 0; i < activeRecipes.length; i++) {
      for (let z = 0; z < badRecipes.length; z++) {
        if (activeRecipes[i] === badRecipes[z]) {
          activeRecipes.splice(i, 1);
        }
      }
    }
  }
  return activeRecipes;
}

/**
 * Fonction qui lance la fonction de filtrage 3 fois (pour chaque type d'items)
 * @param { any } activeRecipes 
 */
function filterForIngredientsMachinesUtensils(activeRecipes) {
  console.log(activeRecipes);

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
  console.log(e.target.parentElement.parentElement);
  e.target.parentElement.parentElement.classList.replace(
    "display-flex",
    "display-none"
  );
  console.log(collectionOfElements);
  collectionOfElements.forEach((selectElement) => {
    console.log(selectElement);
    console.log(elementsTagsSpan[index].innerHTML);

    //Si l'élément séléctionné est égal à la valeur HTML du tag affiché, alors on supprime l'élément du Set.
    if (selectElement === elementsTagsSpan[index].innerHTML) {
      collectionOfElements.delete(elementsTagsSpan[index].innerHTML);
      console.log(collectionOfElements);

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
