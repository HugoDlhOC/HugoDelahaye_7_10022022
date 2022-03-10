import { recipes } from "../ressources/data/recipes.js";
import { Recipe } from "./classes/Recipe.js";

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
        menu.classList.replace("display-none", "display-grid");
        menu.classList.add("mr-4");
        linkAndIconHideMenu.classList.replace("display-flex", "display-none");
        linkAndIconDisplayMenu.classList.replace("display-none", "display-flex");
        linkAndIconDisplayMenu.classList.add("mr-4");
        inputSortMenuHide.classList.replace("display-block", "display-none");
        inputSortMenuDisplay.classList.replace("display-none", "display-block");
        inputSortMenuDisplay.focus();
    }

    function fctCloseMenu(){
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
let inputUser = undefined;

//Déclancher la recherche uniquement quand le nombre de caractère tapé par l'utilisateur est supérieur a 2
function fctSearchSortRecipes(e){
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


/*  Cette fonction controle si la valeur tapée dans le champs de recherche principal correspond à une ou plusieurs recette par le 
    controle de son nom, de sa description et de ses ingrédients.
*/
function displayGoodRecipe(valueInput, recipes){
    let tabResults = [];

    if(valueInput !== undefined && valueInput.length > 2)
    {

        for(let i = 0; i < recipes.length; i++){

            let ifValueFind = false;    //Permet d'éviter les doublons
            //Controle noms
            if(ifValueFind === false){
                console.log(recipes[i]);
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

        let articlesRecipes =  document.querySelectorAll(".recipe-card article");
        //Affichage des bonnes recettes
        //Tous les articles passent en display none

        for(let i = 0; i < articlesRecipes.length; i++){
            articlesRecipes[i].classList.remove("display-block");
            articlesRecipes[i].classList.add("class", "display-none");
        }

        //Seules les bonnes recettes sont affichées
        for(let i = 0; i < tabResults.length; i++){
            articlesRecipes[tabResults[i]].classList.replace("display-none", "display-block");
        }

        //Ajouts des items aux 3 menus
        addItemsSecondaryMenus(tabResults);
        
    }
    else{
        for(let i = 0; i < recipes.length; i++){
            tabResults.push(i);
        }
        document.querySelectorAll(".recipe-card article").forEach(article => {
            article.classList.remove("display-none");
            article.classList.add("display-block");
        });
    }
    console.log(tabResults);
    
    filterForIngredientsMachinesUtensiles(tabResults);

    return tabResults;
}


//Fonctionalitée de tri des recettes pour le champs de recherche secondaire Ingrédients 
const inputSortMenuIngredientsDisplay = document.querySelector(`#input-ingredients--display`);
const inputSortMenuMachinesDisplay = document.querySelector(`#input-machines--display`);
const inputSortMenuUtensilsDisplay = document.querySelector(`#input-utensils--display`);
inputSortMenuIngredientsDisplay.addEventListener("input", fctSecondarySearchSortIngredients);
inputSortMenuMachinesDisplay.addEventListener("input", fctSecondarySearchSortMachines);
inputSortMenuUtensilsDisplay.addEventListener("input", fctSecondarySearchSortUtensils);


/*  Ces 3 fonctions permettent d'afficher les items qui correspondent à ce qui a été saisi dans les champs de recherche secondaires
*/
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

        displayGoodRecipe(inputUser, recipes);
        
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
        displayGoodRecipe(inputUser, recipes);
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
        displayGoodRecipe(inputUser, recipes);
    }
    removeEventListener("click", fctEventLinkItemUtensil);
});

/*  Cette fonction ajoute tous les items des recettes actives
*/
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


function filterForIngredientsMachinesUtensiles(activeRecipes){
    console.log(activeRecipes);

    //Controle de présence d'un tag actif de type INGREDIENT, si oui agir en conséquence
    if(selectedIngredients.size !== 0){
        let badRecipes = [];
        //Pour toutes les recettes actives
        for(let i = 0; i < activeRecipes.length; i++){  
            const recipe = recipes[activeRecipes[i]];
            let control = true;
            let activeIngredients = "";

            //Pour tous les tags d'ingrédients actifs
            for(let j = 0; j < selectedIngredients.size; j++){
                const selectedIngredient = Array.from(selectedIngredients)[j];  //Récupération ingrédient actif

                tagsIngredientsSpan.forEach((tagIngredientSpan, index) => {
                    
                    if(tagIngredientSpan.innerHTML === selectedIngredient){
                        tagsIngredientsDiv[index].classList.replace("display-none", "display-flex");
                    }
                });

                //Ajout des ingrédients
                for(let k = 0; k < recipe.ingredients.length; k++){
                    activeIngredients += recipe.ingredients[k].ingredient + " ";
                }

                if(!activeIngredients.includes(selectedIngredient)){ //Si le tag n'est pas inclu dans les ingrédients, alors le control passe a false
                    control = false;
                }
                activeIngredients = "";
            }


            if(control === false){
                //Recette a masquer
                document.getElementById(recipe.id).classList.remove("display-block");
                document.getElementById(recipe.id).classList.add("display-none");
                badRecipes.push(recipe.id - 1);
            }
            
        }
        console.log(badRecipes);
        console.log(activeRecipes);
        //Suppression du tableau des mauvaises recettes
        for(let i = 0; i < activeRecipes.length; i++){
            for(let z = 0; z < badRecipes.length; z++){
                if(activeRecipes[i] === badRecipes[z]){
                    activeRecipes.splice(i, 1);
                }
            }
        }
    }

    console.log(activeRecipes);

    //Controle de présence d'un tag actif de type MACHINE/APPAREILS, si oui agir en conséquence
    if(selectedMachines.size !== 0){
        let badRecipes = [];
        //Pour toutes les recettes actives
        for(let i = 0; i < activeRecipes.length; i++){  
            const recipe = recipes[activeRecipes[i]];
            let control = true;
            let activeMachines = "";

            //Pour tous les tags d'ingrédients actifs
            for(let j = 0; j < selectedMachines.size; j++){
                const selectedMachine = Array.from(selectedMachines)[j];  //Récupération machine active

                tagsMachinesSpan.forEach((tagMachineSpan, index) => {
                    
                    if(tagMachineSpan.innerHTML === selectedMachine){
                        tagsMachinesDiv[index].classList.replace("display-none", "display-flex");
                    }
                });

                //Ajout des appareils
                activeMachines += recipe.appliance;

                if(!activeMachines.includes(selectedMachine)){ //Si le tag n'est pas inclu dans les machines, alors le control passe a false
                    control = false;
                }
                activeMachines = "";
            }


            if(control === false){
                //Recette a masquer
                document.getElementById(recipe.id).classList.remove("display-block");
                document.getElementById(recipe.id).classList.add("display-none");
                badRecipes.push(recipe.id - 1);
            }
            
        }
        console.log(badRecipes);
        console.log(activeRecipes);
        //Suppression du tableau des mauvaises recettes
        for(let i = 0; i < activeRecipes.length; i++){
            for(let z = 0; z < badRecipes.length; z++){
                if(activeRecipes[i] === badRecipes[z]){
                    activeRecipes.splice(i, 1);
                }
            }
        }
    }

    console.log(activeRecipes);


    //Controle de présence d'un tag actif de type USTENSILS, si oui agir en conséquence
    if(selectedUtensils.size !== 0){
        let badRecipes = [];
        //Pour toutes les recettes actives
        for(let i = 0; i < activeRecipes.length; i++){  
            const recipe = recipes[activeRecipes[i]];
            let control = true;
            let activeUtensils = "";

            //Pour tous les tags d'ustensils actifs
            for(let j = 0; j < selectedUtensils.size; j++){
                const selectedUtensil = Array.from(selectedUtensils)[j];  //Récupération ustensil actif

                tagsUtensilsSpan.forEach((tagUtensilSpan, index) => {
                    
                    if(tagUtensilSpan.innerHTML === selectedUtensil){
                        tagsUtensilsDiv[index].classList.replace("display-none", "display-flex");
                    }
                });

                //Ajout des ustensils
                for(let k = 0; k < recipe.ustensils.length; k++){
                    activeUtensils += recipe.ustensils[k] + " ";
                }

                if(!activeUtensils.includes(selectedUtensil)){ //Si le tag n'est pas inclu dans les ustensils, alors le control passe a false
                    control = false;
                }
                activeUtensils = "";
            }


            if(control === false){
                //Recette a masquer
                document.getElementById(recipe.id).classList.remove("display-block");
                document.getElementById(recipe.id).classList.add("display-none");
                badRecipes.push(recipe.id - 1);
            }
            
        }
        console.log(badRecipes);
        console.log(activeRecipes);
        //Suppression du tableau des mauvaises recettes
        for(let i = 0; i < activeRecipes.length; i++){
            for(let z = 0; z < badRecipes.length; z++){
                if(activeRecipes[i] === badRecipes[z]){
                    activeRecipes.splice(i, 1);
                }
            }
        }
    }

    console.log(activeRecipes);
    addItemsSecondaryMenus(activeRecipes);
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

            if(inputUser === undefined){
                document.querySelectorAll(".recipe-card article").forEach(article => {
                    article.classList.remove("display-none");
                    article.classList.add("display-block");
                });
            }
            displayGoodRecipe(inputUser, recipes);
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
            if(inputUser === undefined){
                document.querySelectorAll(".recipe-card article").forEach(article => {
                    article.classList.remove("display-none");
                    article.classList.add("display-block");
                });
            }
            displayGoodRecipe(inputUser, recipes);
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
            if(inputUser === undefined){
                document.querySelectorAll(".recipe-card article").forEach(article => {
                    article.classList.remove("display-none");
                    article.classList.add("display-block");
                });
            }
            displayGoodRecipe(inputUser, recipes);
        }
    });
}