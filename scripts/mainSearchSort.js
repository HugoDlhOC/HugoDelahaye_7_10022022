import { recipes } from "../ressources/data/recipes.js";
import { addItemsSecondaryMenus } from "./sortSecondarySearches.js";
import { displayMessageRecipeNoFound } from "./messageRecipeEmpty.js";
import { hideMessageRecipeNoFound } from "./messageRecipeEmpty.js";
import { filterForIngredientsMachinesUtensils } from "./sortSecondarySearches.js";


/**
 * Fonction pour l'évènement input de la recherche principale qui va stocker ce que l'utilisateur saisie et lance la fonction de tri principale => displayGoodRecipes()
 * @param { any } e
 */
 export function fctSearchSortRecipes(e, inputUser) {
    inputUser = e.target.value;
    displayGoodRecipe(inputUser.trim().toLowerCase(), recipes);
  }

/**
 * Cette fonction controle si la valeur tapée dans le champs de recherche principal correspond à une ou * plusieurs recette par le controle de son nom, de sa description et de ses ingrédients.
 * @param { any } valueInput
 * @param { any } recipes
 * @return {number[]} 
 */
export function displayGoodRecipe(valueInput, recipes) {
    let tabResults = [];
  
    if (valueInput !== undefined && valueInput.length > 2) {
      for (let i = 0; i < recipes.length; i++) {
        let ifValueFind = false; //Permet d'éviter les doublons
        //Controle noms
        if (ifValueFind === false) {
          if (recipes[i].name.toLowerCase().includes(valueInput)) {
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
  
        //Controle description
        if (ifValueFind === false) {
          if (recipes[i].description.toLowerCase().includes(valueInput)) {
            tabResults.push(i);
            ifValueFind = true;
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