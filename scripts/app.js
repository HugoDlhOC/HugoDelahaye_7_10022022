import { recipes } from "../ressources/data/recipes.js";
import { Recipe } from "./classes/Recipe.js";

let recipeCard = document.querySelector(".recipe-card");

function addEventDisplayCloseSecondaryMenu(nameOfMenu){
    const linkAndIconHideMenu = document.querySelector(`#input-icon-${nameOfMenu}--hide`);
    const linkAndIconDisplayMenu = document.querySelector(`#input-icon-${nameOfMenu}--display`);
    const inputSortMenuHide = document.querySelector(`#input-${nameOfMenu}--hide`);
    const inputSortMenuDisplay = document.querySelector(`#input-${nameOfMenu}--display`);
    const iconSortMenuHide = document.querySelector(`#icon-${nameOfMenu}--hide`);
    const iconSortMenuDisplay = document.querySelector(`#icon-${nameOfMenu}--display`);
    const menu = document.querySelector(`#${nameOfMenu}-menu-items`);  

    inputSortMenuHide.addEventListener("click", fctOpenMenu);
    iconSortMenuHide.addEventListener("click", fctOpenMenu);
    inputSortMenuDisplay.addEventListener("click", fctCloseMenu);
    iconSortMenuDisplay.addEventListener("click", fctCloseMenu);

    function fctOpenMenu(){
        menu.classList.replace("display-none", "display-block");
        linkAndIconHideMenu.classList.replace("display-flex", "display-none");
        linkAndIconDisplayMenu.classList.replace("display-none", "display-block");
        inputSortMenuHide.classList.replace("display-block", "display-none");
        inputSortMenuDisplay.classList.replace("display-none", "display-block");
        inputSortMenuDisplay.focus();
    }

    function fctCloseMenu(){
        menu.classList.replace("display-block", "display-none");
        linkAndIconHideMenu.classList.replace("display-none", "display-flex");
        linkAndIconDisplayMenu.classList.replace("display-block", "display-none");
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

//Affichage de toutes les recettes
console.log(recipes[8].ustensils);
console.log(recipes[0]);
console.log(recipes.length);

//Pour toutes les recettes, ajout de l'HTML des recettes, ainsi que des éléments des menus secondaires
let collectionOfIngredients = new Set();
let tabOfIngredients = [];
let collectionOfMachines = new Set();
let tabOfMachines = [];
let collectionOfUtensils = new Set();
let tabOfUtensils = [];

recipes.forEach(recipe => {
    //Création objet recette avec la recette actuelle passée au constructeur
    const objRecipe = new Recipe(recipe);
    objRecipe.addHtmlOfRecipe();

    //Ajout de tous les ingredients dans la collection de valeur, puis conversion de la collection en tab
    recipe.ingredients.forEach(ingredient => {
        collectionOfIngredients.add(ingredient.ingredient);
    });
    tabOfIngredients = Array.from(collectionOfIngredients);

    //Ajout de tous les appareils dans la collection de valeur, puis conversion de la collection en tab
    collectionOfMachines.add(recipe.appliance);
    tabOfMachines = Array.from(collectionOfMachines);

    //Ajout de tous les ustensils dans la collection de valeur,  puis conversion de la collection en tab
    recipe.ustensils.forEach(ustensil => {
        collectionOfUtensils.add(ustensil);
    });
    tabOfUtensils = Array.from(collectionOfUtensils);
});

//Ajout des ingredients dans le menu secondaire
const ingredientsMenu = document.querySelector(`#ingredients-menu-items`);
Recipe.addHtmlSecondaryMenuElements(ingredientsMenu, tabOfIngredients, "ingredient");

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

//Déclancher la recherche uniquement quand le nombre de caractère tapé par l'utilisateur est supérieur a 2
function fctSearchSortRecipes(e){
    let inputUser = e.target.value;

    if(inputUser.trim().toLowerCase().length > 2){
        //FCT a exécuter
        displayGoodRecipe(inputUser.trim().toLowerCase());
    }
    else{
        //Sinon, toutes les recettes, contenus de menu secondaire sont affichées
        document.querySelectorAll(".recipe-card article").forEach(article => {
            article.classList.replace("display-none", "display-block");
            console.log(article);
        });

        //Ingrédients
        for(let i = 0; i < ingredientsItems.length; i++){
            ingredientsItems[i].classList.remove("display-none");
            ingredientsItems[i].classList.add("display-block");
        }

        //Appareils
        for(let i = 0; i < machinesItems.length; i++){
            machinesItems[i].classList.remove("display-none");
            machinesItems[i].classList.add("display-block");
        }

        //Ustensiles
        for(let i = 0; i < utensilsItems.length; i++){
            utensilsItems[i].classList.remove("display-none");
            utensilsItems[i].classList.add("display-block");
        }
    }
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

function displayGoodRecipe(valueInput){
    let tabResults = [];
    for(let i = 0; i < recipes.length; i++){
    let ifValueFind = false;    //Permet d'éviter les doublons
        //Controle noms
        if(ifValueFind === false){
            if(recipes[i].name.toLowerCase().includes(valueInput)){
                console.log(`NOM INCLU valeur : --${i}--` + recipes[i].name);
                tabResults.push(i);
                console.log(tabResults);
                ifValueFind = true;
            }
        }

        //Controle ingredients
        if(ifValueFind === false){
            for(let j = 0; j < recipes[i].ingredients.length; j++){
                //console.log(recipes[i].ingredients[j]);
                if(recipes[i].ingredients[j].ingredient.toLowerCase().includes(valueInput)){
                    console.log(`INGREDIENT INCLU valeur : --${i}--` + recipes[i].ingredients[j].ingredient);
                    tabResults.push(i);
                    console.log(tabResults);
                    ifValueFind = true;
                }
            }
        }

        //Controle description
        if(ifValueFind === false){
            if(recipes[i].description.toLowerCase().includes(valueInput)){
                console.log(`DESCRIPTION INCLUE valeur : --${i}--` + recipes[i].name);
                tabResults.push(i);
                console.log(tabResults);
                ifValueFind = true;
            }
        }
    }

    //Affichage des bonnes recettes
    //Tous les articles passent en display none
    document.querySelectorAll(".recipe-card article").forEach(article => {
        article.classList.remove("display-block");
        article.classList.add("class", "display-none");
    });
    //Seules les bonnes recettes sont affichées
    tabResults.forEach(value => { //value correspond a la valeur/numéro de l'article a afficher
        document.querySelectorAll(".recipe-card article")[value].classList.replace("display-none", "display-block");
    });

    //Récupération de tous les ingrédients 
    collectionIngredientsPrimarySearchRecipe.clear();
    tabResults.forEach(value => {
        for(let i = 0; i < recipes[value].ingredients.length; i++){
            collectionIngredientsPrimarySearchRecipe.add(recipes[value].ingredients[i].ingredient);
        }
    });

    //Récupération de tous les appareils
    collectionMachinesPrimarySearchRecipe.clear();
    tabResults.forEach(value => {
        collectionMachinesPrimarySearchRecipe.add(recipes[value].appliance);
    });

    //Récupération de tous les ustensils
    collectionUtensilsPrimarySearchRecipe.clear();
    tabResults.forEach(value => {
        for(let i = 0; i < recipes[value].ustensils.length; i++){
            collectionUtensilsPrimarySearchRecipe.add(recipes[value].ustensils[i]);
        }
    });

    //Ne plus afficher les ingrédients/machines/ustentils qui ne sont pas contenu dans les recettes recherchées au champs de recherche principal
    //Ingrédients
    for(let i = 0; i < ingredientsItems.length; i++){
        ingredientsItems[i].classList.replace("display-block", "display-none");
    }
    Array.from(collectionIngredientsPrimarySearchRecipe).forEach(ingredient => {
        for(let i = 0; i < ingredientsItems.length; i++){
            if(ingredientsItemsLinks[i].innerHTML === ingredient){
                //Afficher les ingrédients concernés
                ingredientsItems[i].classList.replace("display-none", "display-block");
            }
        }
    });

    //Appareils
    for(let i = 0; i < machinesItems.length; i++){
        machinesItems[i].classList.replace("display-block", "display-none");
    }
    Array.from(collectionMachinesPrimarySearchRecipe).forEach(machine => {
        for(let i = 0; i < machinesItems.length; i++){
            if(machinesItemsLinks[i].innerHTML === machine){
                //Afficher les ingrédients concernés
                machinesItems[i].classList.replace("display-none", "display-block");
            }
        }
    });

    //Ustensiles
    for(let i = 0; i < utensilsItems.length; i++){
        utensilsItems[i].classList.replace("display-block", "display-none");
    }
    Array.from(collectionUtensilsPrimarySearchRecipe).forEach(utensil => {
        for(let i = 0; i < utensilsItems.length; i++){
            if(utensilsItemsLinks[i].innerHTML === utensil){
                //Afficher les ingrédients concernés
                utensilsItems[i].classList.replace("display-none", "display-block");
            }
        }
    });
}

//Fonctionalitée de tri des recettes pour le champs de recherche secondaire Ingrédients 
const inputSortMenuIngredientsDisplay = document.querySelector(`#input-ingredients--display`);
const inputSortMenuMachinesDisplay = document.querySelector(`#input-machines--display`);
const inputSortMenuUtensilsDisplay = document.querySelector(`#input-utensils--display`);
inputSortMenuIngredientsDisplay.addEventListener("input", fctSecondarySearchSortIngredients);
inputSortMenuMachinesDisplay.addEventListener("input", fctSecondarySearchSortMachines);
inputSortMenuUtensilsDisplay.addEventListener("input", fctSecondarySearchSortUtensils);

function fctSecondarySearchSortIngredients(e){
    //Récupérer les éléments a masquer (qui ne correspondent pas à ce qui est saisi)
    const ingredientsItemsDisplay = document.getElementsByClassName("ingredient display-block");
    console.clear();
    //Masquer tous les autres éléments
    for(let i = 0; i < ingredientsItemsDisplay.length; i++){
        ingredientsItemsDisplay[i].classList.add("display-none");
    }
    console.log(e.target.value.trim());

    for(let i = 0; i < ingredientsItemsDisplay.length; i++){
        if(ingredientsItemsDisplay[i].children[0].innerHTML.toLowerCase().includes(e.target.value.trim())){
            console.log("ça correspond");
            console.log("Valeur : " + i + " " + ingredientsItemsLinks[i].innerHTML.toLowerCase());
            console.log(e.target.value.trim());
            console.log(ingredientsItemsDisplay);
            ingredientsItemsDisplay[i].classList.remove("display-none");
        }
    }
}

function fctSecondarySearchSortMachines(e){
    //Récupérer les éléments a masquer (qui ne correspondent pas à ce qui est saisi)
    const machinesItemsDisplay = document.getElementsByClassName("machine display-block");
    let inputUser = e.target.value.trim();

    //Masquer tous les autres éléments
    for(let i = 0; i < machinesItemsDisplay.length; i++){
        machinesItemsDisplay[i].classList.add("display-none");
    }
    
    //Le but maintenant est de masquer les éléments qui ne correspondent pas a ce qui a été recherché
    for(let i = 0; i < machinesItemsDisplay.length; i++){
        if(machinesItemsDisplay[i].children[0].innerHTML.toLowerCase().includes(inputUser)){
            console.log("ça correspond");
            console.log(machinesItemsDisplay);
            machinesItemsDisplay[i].classList.remove("display-none");
        }
    }
}

function fctSecondarySearchSortUtensils(e){
    //Récupérer les éléments a masquer (qui ne correspondent pas à ce qui est saisi)
    const utensilsItemsDisplay = document.getElementsByClassName("utensil display-block");
    let inputUser = e.target.value.trim();

    //Masquer tous les autres éléments
    for(let i = 0; i < utensilsItemsDisplay.length; i++){
        utensilsItemsDisplay[i].classList.add("display-none");
    }
    
    //Le but maintenant est de masquer les éléments qui ne correspondent pas a ce qui a été recherché
    for(let i = 0; i < utensilsItemsDisplay.length; i++){
        if(utensilsItemsDisplay[i].children[0].innerHTML.toLowerCase().includes(inputUser)){
            console.log("ça correspond");
            console.log(utensilsItemsDisplay);
            utensilsItemsDisplay[i].classList.remove("display-none");
        }
    }
}

//Ajouter un évènement click sur chacun des liens contenus dans les menus secondaires
//Menu ingrédients
const tagsIngredientsDiv = document.querySelectorAll(".ingredient-tag");
const tagsIngredientsSpan = document.querySelectorAll(".ingredient-tag span");
console.log(tagsIngredientsDiv);

ingredientsItemsLinks.forEach(link => {
    link.addEventListener("click", fctCompareIngredientsTags);
});

function fctCompareIngredientsTags(e){
    //Récupération des recettes déja filtrées via la première recherche
    const activeRecipes = document.querySelectorAll(".recipe-card .display-block");
    //Les recettes repassent en display none
    activeRecipes.forEach(recipe => {
        recipe.classList.replace("display-block", "display-none");
    });
    console.log(e.target.innerHTML);
    for(let i = 0; i < tagsIngredientsSpan.length; i++){
        if(e.target.innerHTML === tagsIngredientsSpan[i].innerHTML){
            //Afficher tag correspondant
            tagsIngredientsDiv[i].classList.replace("display-none", "display-flex");
            //Controle pour afficher les/la recette(s) qui ont/a le tag
            //Variable pour stocker les index de recettes avec les recettes ayant les machines voulues
            let tabIndexIngredientsMatch = [];
            recipes.forEach((recipe, index) => {
		        recipe.ingredients.forEach(ingredients => {
			        if(ingredients.ingredient === e.target.innerHTML){
                   		tabIndexIngredientsMatch.push(index + 1);
               	 	}	
		        });
            })

            activeRecipes.forEach(recipe => {
                tabIndexIngredientsMatch.forEach(ingredient => {
                    if(recipe.id === "recipe_" + ingredient){
                        console.log(recipe);
                        //Les bonnes recettes passent en display block
                        recipe.classList.replace("display-none", "display-block");
                    }
                });
            });
        }
        console.log(tagsIngredientsSpan[i].innerHTML);
    }
}

//Menu appareils
const tagsMachinesDiv = document.querySelectorAll(".machine-tag");
const tagsMachinesSpan = document.querySelectorAll(".machine-tag span");
console.log(tagsMachinesDiv);

machinesItemsLinks.forEach(link => {
    link.addEventListener("click", fctCompareMachinesTags);
});

function fctCompareMachinesTags(e){
    //Récupération des recettes déja filtrées via la première recherche
    const activeRecipes = document.querySelectorAll(".recipe-card .display-block");
    //Les recettes repassent en display none
    activeRecipes.forEach(recipe => {
        recipe.classList.replace("display-block", "display-none");
    });
    for(let i = 0; i < tagsMachinesSpan.length; i++){
        if(e.target.innerHTML === tagsMachinesSpan[i].innerHTML){
            //Afficher tag correspondant
            tagsMachinesDiv[i].classList.replace("display-none", "display-flex");

            //Controle pour afficher les/la recette(s) qui ont/a le tag
            //Variable pour stocker les index de recettes avec les recettes ayant les machines voulues
            let tabIndexMachinesMatch = [];
            recipes.forEach((recipe, index) => {
                if(recipe.appliance === e.target.innerHTML){
                    tabIndexMachinesMatch.push(index + 1);
                }
            })

            activeRecipes.forEach(recipe => {
                tabIndexMachinesMatch.forEach(machine => {
                    if(recipe.id === "recipe_" + machine){
                        console.log(recipe);
                        //Les bonnes recettes passent en display block
                        recipe.classList.replace("display-none", "display-block");
                    }
                });
            });
        }
    }
}

//Menu ustensiles
const tagsUtensilsDiv = document.querySelectorAll(".utensil-tag");
const tagsUtensilsSpan = document.querySelectorAll(".utensil-tag span");
console.log(tagsUtensilsDiv);

utensilsItemsLinks.forEach(link => {
    link.addEventListener("click", fctCompareUtensilsTags);
});

function fctCompareUtensilsTags(e){
    //Récupération des recettes déja filtrées via la première recherche
    const activeRecipes = document.querySelectorAll(".recipe-card .display-block");
    //Les recettes repassent en display none
    activeRecipes.forEach(recipe => {
        recipe.classList.replace("display-block", "display-none");
    });
    console.log(e.target.innerHTML);
    for(let i = 0; i < tagsUtensilsSpan.length; i++){
        if(e.target.innerHTML === tagsUtensilsSpan[i].innerHTML){
            //Afficher tag correspondant
            tagsUtensilsDiv[i].classList.replace("display-none", "display-flex");

            //Controle pour afficher les/la recette(s) qui ont/a le tag
            //Variable pour stocker les index de recettes avec les recettes ayant les ustensiles voulus
            let tabIndexUtensilsMatch = [];
            recipes.forEach((recipe, index) => {
		        recipe.ustensils.forEach(utensil => {
			        if(utensil === e.target.innerHTML){
                    	tabIndexUtensilsMatch.push(index + 1);
                	}
		        });
            })

            activeRecipes.forEach(recipe => {
                tabIndexUtensilsMatch.forEach(utensil => {
                    if(recipe.id === "recipe_" + utensil){
                        console.log(recipe);
                        //Les bonnes recettes passent en display block
                        recipe.classList.replace("display-none", "display-block");
                    }
                });
            });
        }
        console.log(tagsUtensilsSpan[i].innerHTML);
    }
}

//Suppression du tag
const tagsDeleteBtn = document.querySelectorAll(".delete-tag-btn");
console.log(tagsDeleteBtn);
tagsDeleteBtn.forEach(btn => {
    btn.addEventListener("click", fctDeleteTag);
});

function fctDeleteTag(e){


    //Accès au parent du parent pour atteidre la balise div à masquer
    e.target.parentElement.parentElement.classList.replace("display-flex", "display-none");
    //Affichage de toutes les recettes de la première recherche
    displayGoodRecipe(document.querySelector("#main-search-field").value);

}