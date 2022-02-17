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

//Afficher les menus au clic sur le lien ou l'icone
//Menu ingrédients
const linkAndIconIngredientsHideMenu = document.querySelector("#link-icon-ingredients--hide");
const linkAndIconIngredientsDisplayMenu = document.querySelector("#link-icon-ingredients--display");
const linkSortMenuIngredientsHide = document.querySelector("#link-ingredients--hide");
const linkSortMenuIngredientsDisplay = document.querySelector("#link-ingredients--display");
const iconSortMenuIngredientsHide = document.querySelector("#icon-ingredients--hide");
const iconSortMenuIngredientsDisplay = document.querySelector("#icon-ingredients--display");
const ingredientsMenu = document.querySelector("#ingredients-menu-items");

linkSortMenuIngredientsHide.addEventListener("click", fctOpenMenuIngredients);
iconSortMenuIngredientsHide.addEventListener("click", fctOpenMenuIngredients);
linkSortMenuIngredientsDisplay.addEventListener("click", fctCloseMenuIngredients);
iconSortMenuIngredientsDisplay.addEventListener("click", fctCloseMenuIngredients);

function fctOpenMenuIngredients(){
    ingredientsMenu.classList.replace("display-none", "display-block");
    linkAndIconIngredientsHideMenu.classList.replace("display-flex", "display-none");
    linkAndIconIngredientsDisplayMenu.classList.replace("display-none", "display-block");
    linkSortMenuIngredientsHide.classList.replace("display-block", "display-none");
    linkSortMenuIngredientsDisplay.classList.replace("display-none", "display-block");
}

function fctCloseMenuIngredients(){
    ingredientsMenu.classList.replace("display-block", "display-none");
    linkAndIconIngredientsHideMenu.classList.replace("display-none", "display-flex");
    linkAndIconIngredientsDisplayMenu.classList.replace("display-block", "display-none");
    linkSortMenuIngredientsHide.classList.replace("display-none", "display-block");
    linkSortMenuIngredientsDisplay.classList.replace("display-block", "display-none");
}

//Menu appareils
const linkAndIconMachinesHideMenu = document.querySelector("#link-icon-machines--hide");
const linkAndIconMachinesDisplayMenu = document.querySelector("#link-icon-machines--display");
const linkSortMenuMachinesHide = document.querySelector("#link-machines--hide");
const linkSortMenuMachinesDisplay = document.querySelector("#link-machines--display");
const iconSortMenuMachinesHide = document.querySelector("#icon-machines--hide");
const iconSortMenuMachinesDisplay = document.querySelector("#icon-machines--display");
const machinesMenu = document.querySelector("#machines-menu-items");

linkSortMenuMachinesHide.addEventListener("click", fctOpenMenuMachines);
iconSortMenuMachinesHide.addEventListener("click", fctOpenMenuMachines);
linkSortMenuMachinesDisplay.addEventListener("click", fctCloseMenuMachines);
iconSortMenuMachinesDisplay.addEventListener("click", fctCloseMenuMachines);

function fctOpenMenuMachines(){
    machinesMenu.classList.replace("display-none", "display-block");
    linkAndIconMachinesHideMenu.classList.replace("display-flex", "display-none");
    linkAndIconMachinesDisplayMenu.classList.replace("display-none", "display-block");
    linkSortMenuMachinesHide.classList.replace("display-block", "display-none");
    linkSortMenuMachinesDisplay.classList.replace("display-none", "display-block");
}

function fctCloseMenuMachines(){
    machinesMenu.classList.replace("display-block", "display-none");
    linkAndIconMachinesHideMenu.classList.replace("display-none", "display-flex");
    linkAndIconMachinesDisplayMenu.classList.replace("display-block", "display-none");
    linkSortMenuMachinesHide.classList.replace("display-none", "display-block");
    linkSortMenuMachinesDisplay.classList.replace("display-block", "display-none");
}

//Menu ustentils
const linkAndIconUtensilsHideMenu = document.querySelector("#link-icon-utensils--hide");
const linkAndIconUtensilsDisplayMenu = document.querySelector("#link-icon-utensils--display");
const linkSortMenuUtensilsHide = document.querySelector("#link-utensils--hide");
const linkSortMenuUtensilsDisplay = document.querySelector("#link-utensils--display");
const iconSortMenuUtensilsHide = document.querySelector("#icon-utensils--hide");
const iconSortMenuUtensilsDisplay = document.querySelector("#icon-utensils--display");
const utensilsMenu = document.querySelector("#utensils-menu-items");

linkSortMenuUtensilsHide.addEventListener("click", fctOpenMenuUtensils);
iconSortMenuUtensilsHide.addEventListener("click", fctOpenMenuUtensils);
linkSortMenuUtensilsDisplay.addEventListener("click", fctCloseMenuUtensils);
iconSortMenuUtensilsDisplay.addEventListener("click", fctCloseMenuUtensils);

function fctOpenMenuUtensils(){
    utensilsMenu.classList.replace("display-none", "display-block");
    linkAndIconUtensilsHideMenu.classList.replace("display-flex", "display-none");
    linkAndIconUtensilsDisplayMenu.classList.replace("display-none", "display-block");
    linkSortMenuUtensilsHide.classList.replace("display-block", "display-none");
    linkSortMenuUtensilsDisplay.classList.replace("display-none", "display-block");
}

function fctCloseMenuUtensils(){
    utensilsMenu.classList.replace("display-block", "display-none");
    linkAndIconUtensilsHideMenu.classList.replace("display-none", "display-flex");
    linkAndIconUtensilsDisplayMenu.classList.replace("display-block", "display-none");
    linkSortMenuUtensilsHide.classList.replace("display-none", "display-block");
    linkSortMenuUtensilsDisplay.classList.replace("display-block", "display-none");
}



