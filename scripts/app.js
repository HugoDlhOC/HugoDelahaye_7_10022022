import { recipes } from "../ressources/data/recipes.js";
import { Recipe } from "./classes/Recipe.js";

let recipeCard = document.querySelector(".recipe-card");

//Première étape : affichage de toutes les recettes
console.log(recipes);
console.log(recipes[0]);
console.log(recipes.length);

//Pour toutes les recettes, ajout de l'HTML
recipes.forEach(recipe => {
    //Création objet recette avec la recette actuelle passée au constructeur
    const objRecipe = new Recipe(recipe);
    objRecipe.addHtmlOfRecipes();
});

//Afficher les menus au clic sur le lien ou l'icone
//Menu ingrédients
const linkAndIconIngredientsHideMenu = document.querySelector("#input-icon-ingredients--hide");
const linkAndIconIngredientsDisplayMenu = document.querySelector("#input-icon-ingredients--display");
const inputSortMenuIngredientsHide = document.querySelector("#input-ingredients--hide");
const inputSortMenuIngredientsDisplay = document.querySelector("#input-ingredients--display");
const iconSortMenuIngredientsHide = document.querySelector("#icon-ingredients--hide");
const iconSortMenuIngredientsDisplay = document.querySelector("#icon-ingredients--display");
const ingredientsMenu = document.querySelector("#ingredients-menu-items");

inputSortMenuIngredientsHide.addEventListener("click", fctOpenMenuIngredients);
iconSortMenuIngredientsHide.addEventListener("click", fctOpenMenuIngredients);
inputSortMenuIngredientsDisplay.addEventListener("click", fctCloseMenuIngredients);
iconSortMenuIngredientsDisplay.addEventListener("click", fctCloseMenuIngredients);

function fctOpenMenuIngredients(){
    ingredientsMenu.classList.replace("display-none", "display-block");
    linkAndIconIngredientsHideMenu.classList.replace("display-flex", "display-none");
    linkAndIconIngredientsDisplayMenu.classList.replace("display-none", "display-block");
    inputSortMenuIngredientsHide.classList.replace("display-block", "display-none");
    inputSortMenuIngredientsDisplay.classList.replace("display-none", "display-block");
    inputSortMenuIngredientsDisplay.focus();
}

function fctCloseMenuIngredients(){
    ingredientsMenu.classList.replace("display-block", "display-none");
    linkAndIconIngredientsHideMenu.classList.replace("display-none", "display-flex");
    linkAndIconIngredientsDisplayMenu.classList.replace("display-block", "display-none");
    inputSortMenuIngredientsHide.classList.replace("display-none", "display-block");
    inputSortMenuIngredientsDisplay.classList.replace("display-block", "display-none");
}

//Menu appareils
const linkAndIconMachinesHideMenu = document.querySelector("#input-icon-machines--hide");
const linkAndIconMachinesDisplayMenu = document.querySelector("#input-icon-machines--display");
const inputSortMenuMachinesHide = document.querySelector("#input-machines--hide");
const inputSortMenuMachinesDisplay = document.querySelector("#input-machines--display");
const iconSortMenuMachinesHide = document.querySelector("#icon-machines--hide");
const iconSortMenuMachinesDisplay = document.querySelector("#icon-machines--display");
const machinesMenu = document.querySelector("#machines-menu-items");

inputSortMenuMachinesHide.addEventListener("click", fctOpenMenuMachines);
iconSortMenuMachinesHide.addEventListener("click", fctOpenMenuMachines);
inputSortMenuMachinesDisplay.addEventListener("click", fctCloseMenuMachines);
iconSortMenuMachinesDisplay.addEventListener("click", fctCloseMenuMachines);

function fctOpenMenuMachines(){
    machinesMenu.classList.replace("display-none", "display-block");
    linkAndIconMachinesHideMenu.classList.replace("display-flex", "display-none");
    linkAndIconMachinesDisplayMenu.classList.replace("display-none", "display-block");
    inputSortMenuMachinesHide.classList.replace("display-block", "display-none");
    inputSortMenuMachinesDisplay.classList.replace("display-none", "display-block");
    inputSortMenuMachinesDisplay.focus();
}

function fctCloseMenuMachines(){
    machinesMenu.classList.replace("display-block", "display-none");
    linkAndIconMachinesHideMenu.classList.replace("display-none", "display-flex");
    linkAndIconMachinesDisplayMenu.classList.replace("display-block", "display-none");
    inputSortMenuMachinesHide.classList.replace("display-none", "display-block");
    inputSortMenuMachinesDisplay.classList.replace("display-block", "display-none");
}

//Menu ustentils
const linkAndIconUtensilsHideMenu = document.querySelector("#input-icon-utensils--hide");
const linkAndIconUtensilsDisplayMenu = document.querySelector("#input-icon-utensils--display");
const inputSortMenuUtensilsHide = document.querySelector("#input-utensils--hide");
const inputSortMenuUtensilsDisplay = document.querySelector("#input-utensils--display");
const iconSortMenuUtensilsHide = document.querySelector("#icon-utensils--hide");
const iconSortMenuUtensilsDisplay = document.querySelector("#icon-utensils--display");
const utensilsMenu = document.querySelector("#utensils-menu-items");

inputSortMenuUtensilsHide.addEventListener("click", fctOpenMenuUtensils);
iconSortMenuUtensilsHide.addEventListener("click", fctOpenMenuUtensils);
inputSortMenuUtensilsDisplay.addEventListener("click", fctCloseMenuUtensils);
iconSortMenuUtensilsDisplay.addEventListener("click", fctCloseMenuUtensils);

function fctOpenMenuUtensils(){
    utensilsMenu.classList.replace("display-none", "display-block");
    linkAndIconUtensilsHideMenu.classList.replace("display-flex", "display-none");
    linkAndIconUtensilsDisplayMenu.classList.replace("display-none", "display-block");
    inputSortMenuUtensilsHide.classList.replace("display-block", "display-none");
    inputSortMenuUtensilsDisplay.classList.replace("display-none", "display-block");
    inputSortMenuUtensilsDisplay.focus();
}

function fctCloseMenuUtensils(){
    utensilsMenu.classList.replace("display-block", "display-none");
    linkAndIconUtensilsHideMenu.classList.replace("display-none", "display-flex");
    linkAndIconUtensilsDisplayMenu.classList.replace("display-block", "display-none");
    inputSortMenuUtensilsHide.classList.replace("display-none", "display-block");
    inputSortMenuUtensilsDisplay.classList.replace("display-block", "display-none");
}

//Fonctionalitée de tri des recettes via le champs de recherche principale 
//Récupérer ce qui est tapé dans le champs de saisi
const mainSearchInput = document.querySelector("#main-search-field");

mainSearchInput.addEventListener("input", fctSearchSortRecipes);

//Déclancher la recherche uniquement quand le nombre de caractère tapé par l'utilisateur est supérieur a 2
function fctSearchSortRecipes(e){
    if(e.target.value.length > 2){
        console.log(e.target.value);
        //FCT a exécuter
        displayGoodRecipe(e.target.value);
    }
    else{
        //Sinon, toutes les recettes sont affichées
        recipeCard.innerHTML = "";
        for(let a = 0; a < recipes.length; a++){
            const objRecipe = new Recipe(recipes[a]);
            objRecipe.addHtmlOfRecipes();
        }
    }
}

function displayGoodRecipe(valueInput){
    let tabResults = [];
    for(let i = 0; i < recipes.length; i++){
        //console.log(recipes[i].ingredients);
    
        //Controle noms
        if(recipes[i].name.includes(valueInput)){
            console.log(`NOM INCLU valeur : --${i}--` + recipes[i].name);
            tabResults.push(i);
            console.log(tabResults);
        }

        //Controle ingredients
        for(let j = 0; j < recipes[i].ingredients.length; j++){
            //console.log(recipes[i].ingredients[j]);
            if(recipes[i].ingredients[j].ingredient.includes(valueInput)){
                console.log(`INGREDIENT INCLU valeur : --${i}--` + recipes[i].ingredients[j].ingredient);
                tabResults.push(i);
                console.log(tabResults);
            }
        }

        //Controle description
        if(recipes[i].description.includes(valueInput)){
            console.log(`DESCRIPTION INCLUE valeur : --${i}--` + recipes[i].name);
            tabResults.push(i);
            console.log(tabResults);
        }
    }

    //Affichage des bonnes recettes
    recipeCard.innerHTML = "";
    for(let v = 0; v < tabResults.length; v++){
        const objRecipe = new Recipe(recipes[tabResults[v]]);
        //console.log(recipes[tabResults[v]]);
        objRecipe.addHtmlOfRecipes();
    }
}