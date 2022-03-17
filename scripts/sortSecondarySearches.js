import { recipes } from "../ressources/data/recipes.js";
import { selectedIngredients } from "./app.js";
import { selectedMachines } from "./app.js";
import { selectedUtensils } from "./app.js";
import { tagsIngredientsSpan } from "./app.js";
import { tagsMachinesSpan } from "./app.js";
import { tagsUtensilsSpan } from "./app.js";
import { ingredientsItemsLinks } from "./app.js";
import { machinesItemsLinks } from "./app.js";
import { utensilsItemsLinks } from "./app.js";
import { displayGoodRecipe } from "./mainSearchSort.js";

/**
 * Fonction qui affiche les ajoute les évènements d'ouverture et de fermeture des 3 menus secondaires
 * @param { any } nameOfMenu
 */
 export function addEventDisplayCloseSecondaryMenu(nameOfMenu) {
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

/**
 * Cette fonction permet d'afficher les items qui correspondent à ce qui a été saisi dans les champs de recherche secondaires
 * @param { any } e
 * @param { any } typeOfItem
 */
 export function fctSecondarySearchSort(e, typeOfItem) {
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
  
let collectionIngredientsPrimarySearchRecipe = new Set();
let collectionMachinesPrimarySearchRecipe = new Set();
let collectionUtensilsPrimarySearchRecipe = new Set();

let ingredientsItems = document.querySelectorAll(".ingredient");
let machinesItems = document.querySelectorAll(".machine");
let utensilsItems = document.querySelectorAll(".utensil");

/**
 * Ajout des items des recettes actives
 * @param { any } indexOfGoodRecipes
 */
 export function addItemsSecondaryMenus(indexOfGoodRecipes) {
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
  
  const tagsIngredientsDiv = document.querySelectorAll(".ingredient-tag");
  const tagsMachinesDiv = document.querySelectorAll(".machine-tag");
  const tagsUtensilsDiv = document.querySelectorAll(".utensil-tag");

  /**
   * Fonction qui lance la fonction de filtrage 3 fois (pour chaque type d'items)
   * @param { any } activeRecipes 
   */
  export function filterForIngredientsMachinesUtensils(activeRecipes) {
  
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

/**
 * Permet la suppression d'un filtre, sert aux évènement click sur les icones de fermeture des filtres
 * @param { any } e
 * @param { any } index
 * @param {Set } collectionOfElements
 * @param { NodeList } elementsTagsSpan
 */
 export function deleteFilter(e, index, collectionOfElements, elementsTagsSpan, inputUser) {
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