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

let sortPrincipalSearchStatus = false;
let tabResultsFirstSearch = undefined;

//Déclancher la recherche uniquement quand le nombre de caractère tapé par l'utilisateur est supérieur a 2
function fctSearchSortRecipes(e){
    let inputUser = e.target.value;

    if(inputUser.trim().toLowerCase().length > 2){
        //FCT a exécuter
        tabResultsFirstSearch = displayGoodRecipe(inputUser.trim().toLowerCase());
        sortPrincipalSearchStatus = true;
    }
    else {//if(document.querySelectorAll(".tags-container .display-flex").length === 0){
        sortPrincipalSearchStatus = false;
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
    //let recipesCopy = [];
    //Controle de tags actifs ou non
    /*
    if(document.querySelectorAll(".tags-container .display-flex").length !== 0){
        //il faut modifier les recettes actives
        let activeRecipes = document.querySelectorAll(".recipe-card .display-block");
        let nomp = document.querySelectorAll(".recipe-card article");
        console.log(nomp[1].classList);
        recipesCopy = activeRecipes;
        console.log(recipes); 
        console.log(recipesCopy);
        console.log(recipesCopy[0].classList);
    }
    else{
        recipesCopy = recipes;
    }*/
    
    for(let i = 0; i < recipes.length; i++){
        console.log(recipes.length);
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
    collectionIngredientsPrimarySearchRecipe.clear(); //SUPPRIME tous les éléments du SET
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

    return tabResults;
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
let selectedIngredients = new Set();
const tagsIngredientsSpan = document.querySelectorAll(".ingredient-tag span");
const tagsIngredientsDiv = document.querySelectorAll(".ingredient-tag");
ingredientsItemsLinks.forEach(link => {
    link.addEventListener("click", () => {
        fctEventLinkItemIngredient(link);
    });

    function fctEventLinkItemIngredient(link){
        //Ajout de l'item dans le tableau
        selectedIngredients.add(link.innerHTML);
        console.log(selectedIngredients);
        //Appel fonction de filtrage
        filterForIngredients();
    }
    removeEventListener("click", fctEventLinkItemIngredient);
});

//Menu appareils
let selectedMachines = new Set();
const tagsMachinesSpan = document.querySelectorAll(".machine-tag span");
const tagsMachinesDiv = document.querySelectorAll(".machine-tag");
machinesItemsLinks.forEach(link => {
    link.addEventListener("click", () => {
        fctEventLinkItemMachine(link);
    });

    function fctEventLinkItemMachine(link){
        //Ajout de l'item dans le tableau
        selectedMachines.add(link.innerHTML);
        console.log(selectedMachines);
        //Appel fonction de filtrage
        filterForMachines();
    }
    removeEventListener("click", fctEventLinkItemMachine);
});

//Menu ustensils
let selectedUtensils = new Set();
const tagsUtensilsSpan = document.querySelectorAll(".utensil-tag span");
const tagsUtensilsDiv = document.querySelectorAll(".utensil-tag");
utensilsItemsLinks.forEach(link => {
    link.addEventListener("click", () => {
        fctEventLinkItemUtensil(link);
    });

    function fctEventLinkItemUtensil(link){
        //Ajout de l'item dans le tableau
        selectedUtensils.add(link.innerHTML);
        console.log(selectedUtensils);
        //Appel fonction de filtrage
        filterForUtensils();
    }
    removeEventListener("click", fctEventLinkItemUtensil);
});



let indexSortRecipesByIngredientsTags = [];
let indexSortRecipesByMachinesTags = [];
let indexSortRecipesByUtensilsTags = [];

let sortRecipesByIngredientsTags = [];
let sortRecipesByMachinesTags = [];
let sortRecipesByUtensilsTags = [];


function addItemsSecondaryMenus(indexOfGoodRecipes){

        //Récupération de tous les ingrédients 
        collectionIngredientsPrimarySearchRecipe.clear(); //SUPPRIME tous les éléments du SET
        indexOfGoodRecipes.forEach(value => {
            for(let i = 0; i < recipes[value].ingredients.length; i++){
                collectionIngredientsPrimarySearchRecipe.add(recipes[value].ingredients[i].ingredient);
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


        //Récupération de tous les appareils
        collectionMachinesPrimarySearchRecipe.clear();
        indexOfGoodRecipes.forEach(value => {
            collectionMachinesPrimarySearchRecipe.add(recipes[value].appliance);
        });

        //Ne plus afficher les ingrédients/machines/ustentils qui ne sont pas contenu dans les recettes recherchées au champs de recherche principal
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


        //Récupération de tous les ustensils
        collectionUtensilsPrimarySearchRecipe.clear();
        indexOfGoodRecipes.forEach(value => {
            for(let i = 0; i < recipes[value].ustensils.length; i++){
                collectionUtensilsPrimarySearchRecipe.add(recipes[value].ustensils[i]);
            }
        });
        //Ne plus afficher les ingrédients/machines/ustentils qui ne sont pas contenu dans les recettes recherchées au champs de recherche principal
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



function filterForIngredients(){
    //let sortRecipesByIngredientTags = [];
    //console.clear();
    //Code existant qui fait le tri par apport au champs de recherche principal - si recettes triées
    //Récupération des recettes déja filtrées via la première recherche
    //const activeRecipes = document.querySelectorAll(".recipe-card .display-block");
    let activeRecipes = document.querySelectorAll(".recipe-card article");
    console.log(sortPrincipalSearchStatus);
    if(sortPrincipalSearchStatus === true){
        console.log(tabResultsFirstSearch);//correspond aux indices des articles, retour de displayGoodRecipe(input)
        activeRecipes = [];
        tabResultsFirstSearch.forEach(recipe => {
            activeRecipes.push(document.getElementById("recipe_" + parseInt(recipe + 1)));
        });

        console.log(activeRecipes);
    }

    //Controle si autres types de tag actifs
    //Tags machines
    if(selectedMachines.size !== 0){
        alert("un tag ou plusieurs tags machines actifs");
        console.log(sortRecipesByMachinesTags);
        activeRecipes = sortRecipesByMachinesTags;
    }
    //Tags ustensils
    else if(selectedUtensils.size !== 0){
        alert("un tag ou plusieurs tags ustensils actifs");
        console.log(sortRecipesByUtensilsTags);
        activeRecipes = sortRecipesByUtensilsTags;
    }

    console.log(Array(selectedIngredients).length);
    //Controle de présence d'un tag actif, si oui agir en conséquence
    if(selectedIngredients.size !== 0){
        indexSortRecipesByIngredientsTags = []; ////reset car quand l'on passe en else, les anciens items s'additionnent aux nouveaux
        console.log("length sup a 0");
        //Pour chaque recette affichée, on verifie la présence du ou des ingrédient(s)
        let tabIdRecipes = []; //Ce tableau contient les id des recettes affichées
        activeRecipes.forEach(activeRecipe => {
            //on récupère tous les id pour obtenir l'id de la recette
            tabIdRecipes.push(activeRecipe.id.split("_"));
            //On masque toutes les recettes pour n'afficher que celles qui respectent le tri
            activeRecipe.classList.replace("display-block", "display-none");
        });
        console.log(activeRecipes);
        let listOfIngredients = [];     //Stocker tous les ingrédients dans une variable pour la parcourir ensuite
        
        tabIdRecipes.forEach(id => {
            let control = true;
            id[1] = parseInt(id[1]);
            id[1] += -1;
            console.log(id[1]);
            console.log(recipes[id[1]]); //les bonnes recettes sont celle-ci
            console.log(recipes[id[1]].ingredients);

            //Stocker les ingrédients dans une variable pour pourvoir les parcourir ensuite
            listOfIngredients = [];
            //Attention a ne pas mélanger les ingrédients des différentes recettes
            recipes[id[1]].ingredients.forEach(ingredient => {
                listOfIngredients += ingredient.ingredient + " ";
            });
            //Controle de la présence des ingrédients dans la recette, retour en booleen
            selectedIngredients.forEach(selectIngredient => {
                console.log(selectIngredient);
                if(control === true){ 
                    if(listOfIngredients.includes(selectIngredient)){
                        console.log("l'ingrédient est inclu");
                        control = true;
                    }
                    else{
                        console.log("l'ingrédient n'est pas inclu");
                        control = false;
                    }
                }
                //Affichage du tag en HTML
                tagsIngredientsSpan.forEach((tagIngredientSpan, index) => {
                    if(tagIngredientSpan.innerHTML === selectIngredient){
                        console.log(tagIngredientSpan.innerHTML + " " + selectIngredient + " " + index);
                        tagsIngredientsDiv[index].classList.replace("display-none", "display-flex");
                    }
                });
            });

            if(control === true){
                console.log(`la recette ${id[1]} est valide`);
                activeRecipes.forEach(activeRecipe => {
                    console.log(activeRecipe.id);
                    console.log(id[1] + 1);

                    if(activeRecipe.id === "recipe_" + parseInt(id[1] + 1)){
                        console.log("recipe_" + parseInt(id[1] + 1));
                        console.log(activeRecipe);
                        activeRecipe.classList.replace("display-none", "display-block");
                        indexSortRecipesByIngredientsTags.push(id[1]);
                        sortRecipesByIngredientsTags.push(activeRecipe);
                    }
                });
            }
            else{
                console.log(`la recette ${id[1]} est invalide`);
            }
            console.log(control);
        });
    }
    else{
        //alert("aucun élément");
        activeRecipes.forEach((activeRecipe, index) => {
            activeRecipe.classList.remove("display-none");
            activeRecipe.classList.add("display-block");
            let idRecipe = activeRecipe.id.split("_");
            console.log(parseInt(idRecipe[1] - 1));
            indexSortRecipesByIngredientsTags.push(parseInt(idRecipe[1] - 1));
        });
    }

    //Ajouts/maj items 
    addItemsSecondaryMenus(indexSortRecipesByIngredientsTags);
}



function filterForMachines(){
    //let sortRecipesByIngredientTags = [];
    //console.clear();
    //Code existant qui fait le tri par apport au champs de recherche principal - si recettes triées
    //Récupération des recettes déja filtrées via la première recherche
    //const activeRecipes = document.querySelectorAll(".recipe-card .display-block");
    let activeRecipes = document.querySelectorAll(".recipe-card article");
    console.log(sortPrincipalSearchStatus);
    if(sortPrincipalSearchStatus === true){
        indexSortRecipesByIngredientsTags = []; 
        console.log(tabResultsFirstSearch);//correspond aux indices des articles, retour de displayGoodRecipe(input)
        activeRecipes = [];
        tabResultsFirstSearch.forEach(recipe => {
            activeRecipes.push(document.getElementById("recipe_" + parseInt(recipe + 1)));
        });

        console.log(activeRecipes);
    }

    //Controle si autres types de tag actifs
    //Tags ingrédients
    if(selectedIngredients.size !== 0){
        alert("un tag ou plusieurs tags ingrédients actifs");
        console.log(sortRecipesByIngredientsTags);
        activeRecipes = sortRecipesByIngredientsTags;
    }
    //Tags ustensils
    else if(selectedUtensils.size !== 0){
        alert("un tag ou plusieurs tags ustensils actifs");
        console.log(sortRecipesByUtensilsTags);
        activeRecipes = sortRecipesByUtensilsTags;
    }

    console.log(Array(selectedMachines).length);
    //Controle de présence d'un tag actif, si oui agir en conséquence
    if(selectedMachines.size !== 0){
        console.log("length sup a 0");
        //Pour chaque recette affichée, on verifie la présence du ou des ingrédient(s)
        let tabIdRecipes = []; //Ce tableau contient les id des recettes affichées
        activeRecipes.forEach(activeRecipe => {
            //on récupère tous les id pour obtenir l'id de la recette
            tabIdRecipes.push(activeRecipe.id.split("_"));
            //On masque toutes les recettes pour n'afficher que celles qui respectent le tri
            activeRecipe.classList.replace("display-block", "display-none");
        });
        console.log(activeRecipes);
        let listOfMachines = [];     //Stocker tous les ingrédients dans une variable pour la parcourir ensuite
        
        tabIdRecipes.forEach(id => {
            let control = true;
            id[1] = parseInt(id[1]);
            id[1] += -1;
            console.log(id[1]);
            console.log(recipes[id[1]]); //les bonnes recettes sont celle-ci
            console.log(recipes[id[1]].appliance);

            //Stocker les ingrédients dans une variable pour pourvoir les parcourir ensuite
            listOfMachines = [];
            //Attention a ne pas mélanger les ingrédients des différentes recettes
            listOfMachines += recipes[id[1]].appliance + " ";
            //Controle de la présence des ingrédients dans la recette, retour en booleen
            selectedMachines.forEach(selectMachine => {
                console.log(selectMachine);
                if(control === true){ 
                    if(listOfMachines.includes(selectMachine)){
                        console.log("l'appareil est inclu");
                        control = true;
                    }
                    else{
                        console.log("l'appareil n'est pas inclu");
                        control = false;
                    }
                }
                //Affichage du tag en HTML
                tagsMachinesSpan.forEach((tagMachineSpan, index) => {
                    if(tagMachineSpan.innerHTML === selectMachine){
                        console.log(tagMachineSpan.innerHTML + " " + selectMachine + " " + index);
                        tagsMachinesDiv[index].classList.replace("display-none", "display-flex");
                    }
                });
            });

            if(control === true){
                console.log(`la recette ${id[1]} est valide`);
                activeRecipes.forEach(activeRecipe => {
                    console.log(activeRecipe.id);
                    console.log(id[1] + 1);

                    if(activeRecipe.id === "recipe_" + parseInt(id[1] + 1)){
                        console.log("recipe_" + parseInt(id[1] + 1));
                        console.log(activeRecipe);
                        activeRecipe.classList.replace("display-none", "display-block");
                        indexSortRecipesByMachinesTags.push(id[1]);
                        sortRecipesByMachinesTags.push(activeRecipe);
                    }
                });
            }
            else{
                console.log(`la recette ${id[1]} est invalide`);
            }
            console.log(control);
        });
    }
    else{
        //alert("aucun élément");
        activeRecipes.forEach(activeRecipe => {
            activeRecipe.classList.remove("display-none");
            activeRecipe.classList.add("display-block");
            let idRecipe = activeRecipe.id.split("_");
            console.log(parseInt(idRecipe[1] - 1));
            indexSortRecipesByIngredientsTags.push(parseInt(idRecipe[1] - 1));
        });
    }

    //Ajouts/maj items 
    addItemsSecondaryMenus(indexSortRecipesByMachinesTags);
}
        
    



function filterForUtensils(){
    //let sortRecipesByIngredientTags = [];
    //console.clear();
    //Code existant qui fait le tri par apport au champs de recherche principal - si recettes triées
    //Récupération des recettes déja filtrées via la première recherche
    //const activeRecipes = document.querySelectorAll(".recipe-card .display-block");
    let activeRecipes = document.querySelectorAll(".recipe-card article");
    console.log(sortPrincipalSearchStatus);
    if(sortPrincipalSearchStatus === true){
        console.log(tabResultsFirstSearch);//correspond aux indices des articles, retour de displayGoodRecipe(input)
        activeRecipes = [];
        tabResultsFirstSearch.forEach(recipe => {
            activeRecipes.push(document.getElementById("recipe_" + parseInt(recipe + 1)));
        });

        console.log(activeRecipes);
    }

    //Controle si autres types de tag actifs
    //Tags ingrédients
    if(selectedIngredients.size !== 0){
        indexSortRecipesByUtensilsTags = [];
        alert("un tag ou plusieurs tags ingrédients actifs");
        console.log(sortRecipesByIngredientsTags);
        activeRecipes = sortRecipesByIngredientsTags;
    }
    //Tags machines
    else if(selectedMachines.size !== 0){
        alert("un tag ou plusieurs tags machines actifs");
        console.log(sortRecipesByMachinesTags);
        activeRecipes = sortRecipesByMachinesTags;
    }

    console.log(Array(selectedUtensils).length);
    //Controle de présence d'un tag actif, si oui agir en conséquence
    if(selectedUtensils.size !== 0){
        console.log("length sup a 0");
        //Pour chaque recette affichée, on verifie la présence du ou des ingrédient(s)
        let tabIdRecipes = []; //Ce tableau contient les id des recettes affichées
        activeRecipes.forEach(activeRecipe => {
            //on récupère tous les id pour obtenir l'id de la recette
            tabIdRecipes.push(activeRecipe.id.split("_"));
            //On masque toutes les recettes pour n'afficher que celles qui respectent le tri
            activeRecipe.classList.replace("display-block", "display-none");
        });
        console.log(activeRecipes);
        let listOfUtensils = [];     //Stocker tous les ustensils dans une variable pour la parcourir ensuite
        
        tabIdRecipes.forEach(id => {
            let control = true;
            id[1] = parseInt(id[1]);
            id[1] += -1;
            console.log(id[1]);
            console.log(recipes[id[1]]); //les bonnes recettes sont celle-ci
            console.log(recipes[id[1]].ustensils);

            //Stocker les ustensils dans une variable pour pourvoir les parcourir ensuite
            listOfUtensils = [];
            //Attention a ne pas mélanger les ustensils des différentes recettes
            recipes[id[1]].ustensils.forEach(utensil => {
                listOfUtensils += utensil + " ";
            });
            //Controle de la présence des ustensils dans la recette, retour en booleen
            selectedUtensils.forEach(selectUtensil => {
                console.log(selectUtensil);
                if(control === true){ 
                    if(listOfUtensils.includes(selectUtensil)){
                        console.log("l'ustensil est inclu");
                        control = true;
                    }
                    else{
                        console.log("l'ustensil n'est pas inclu");
                        control = false;
                    }
                }
                //Affichage du tag en HTML
                tagsUtensilsSpan.forEach((tagUtensilSpan, index) => {
                    if(tagUtensilSpan.innerHTML === selectUtensil){
                        console.log(tagUtensilSpan.innerHTML + " " + selectUtensil + " " + index);
                        tagsUtensilsDiv[index].classList.replace("display-none", "display-flex");
                    }
                });
            });

            if(control === true){
                console.log(`la recette ${id[1]} est valide`);
                activeRecipes.forEach(activeRecipe => {
                    console.log(activeRecipe.id);
                    console.log(id[1] + 1);

                    if(activeRecipe.id === "recipe_" + parseInt(id[1] + 1)){
                        console.log("recipe_" + parseInt(id[1] + 1));
                        console.log(activeRecipe);
                        activeRecipe.classList.replace("display-none", "display-block");
                        indexSortRecipesByUtensilsTags.push(id[1]);
                        sortRecipesByUtensilsTags.push(activeRecipe);
                    }
                });
            }
            else{
                console.log(`la recette ${id[1]} est invalide`);
            }
            console.log(control);
        });
    }
    else{
        //alert("aucun élément");
        activeRecipes.forEach(activeRecipe => {
            activeRecipe.classList.remove("display-none");
            activeRecipe.classList.add("display-block");
            let idRecipe = activeRecipe.id.split("_");
            console.log(parseInt(idRecipe[1] - 1));
            indexSortRecipesByIngredientsTags.push(parseInt(idRecipe[1] - 1));
        });
    }
    
    //Ajouts/maj items 
    addItemsSecondaryMenus(indexSortRecipesByUtensilsTags);
}
    

    


//Ajouter un évènement sur tous les boutons de fermeture de tags ingrédients
const tagsDeleteIngredientsBtn = document.querySelectorAll(".ingredient-tag .delete-tag-btn");

tagsDeleteIngredientsBtn.forEach((tagDeleteBtn, index) => {
    tagDeleteBtn.addEventListener("click", (e) => {
        deleteFilterIngredient(e, index)
    });
});

function deleteFilterIngredient(e, index){
    console.log(e.target.parentElement.parentElement);
    e.target.parentElement.parentElement.classList.replace("display-flex", "display-none");
    console.log(selectedIngredients);
    selectedIngredients.forEach(selectElement => {
        console.log(selectElement);
        console.log(tagsIngredientsSpan[index].innerHTML);

        //Si l'élément séléctionné est égal à la valeur HTML du tag affiché, alors on supprime l'élément du Set.
        if(selectElement === tagsIngredientsSpan[index].innerHTML){
            selectedIngredients.delete(tagsIngredientsSpan[index].innerHTML);
            console.log(selectedIngredients);
            filterForIngredients();
        }
    });
}


//Ajouter un évènement sur tous les boutons de fermeture de tags appareils
const tagsDeleteMachinesBtn = document.querySelectorAll(".machine-tag .delete-tag-btn");

tagsDeleteMachinesBtn.forEach((tagDeleteBtn, index) => {
    tagDeleteBtn.addEventListener("click", (e) => {
        deleteFilterMachine(e, index)
    });
});

function deleteFilterMachine(e, index){
    console.log(e.target.parentElement.parentElement);
    e.target.parentElement.parentElement.classList.replace("display-flex", "display-none");
    console.log(selectedMachines);
    selectedMachines.forEach(selectElement => {
        console.log(selectElement);
        console.log(tagsMachinesSpan[index].innerHTML);

        //Si l'élément séléctionné est égal à la valeur HTML du tag affiché, alors on supprime l'élément du Set.
        if(selectElement === tagsMachinesSpan[index].innerHTML){
            selectedMachines.delete(tagsMachinesSpan[index].innerHTML);
            console.log(selectedMachines);
            filterForMachines();
        }
    });
}



//Ajouter un évènement sur tous les boutons de fermeture de tags ustensils
const tagsDeleteUtensilsBtn = document.querySelectorAll(".utensil-tag .delete-tag-btn");

tagsDeleteUtensilsBtn.forEach((tagDeleteBtn, index) => {
    tagDeleteBtn.addEventListener("click", (e) => {
        deleteFilterUtensil(e, index)
    });
});

function deleteFilterUtensil(e, index){
    console.log(e.target.parentElement.parentElement);
    e.target.parentElement.parentElement.classList.replace("display-flex", "display-none");
    console.log(selectedUtensils);
    selectedUtensils.forEach(selectElement => {
        console.log(selectElement);
        console.log(tagsUtensilsSpan[index].innerHTML);

        //Si l'élément séléctionné est égal à la valeur HTML du tag affiché, alors on supprime l'élément du Set.
        if(selectElement === tagsUtensilsSpan[index].innerHTML){
            selectedUtensils.delete(tagsUtensilsSpan[index].innerHTML);
            console.log(selectedUtensils);
            filterForUtensils();
        }
    });
}
