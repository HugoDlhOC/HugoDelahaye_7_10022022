export class Recipe{

    constructor(data){
        this.appliance = data.appliance;
        this.description = data.description;
        this.id = data.id;
        this.ingredients = data.ingredients;
        this.name = data.name;
        this.servings = data.servings;
        this.time = data.time;
        this.ustensils = data.ustensils;
    }

    addHtmlOfRecipes(){
        //console.log(this.ingredients);
        let ingredientsHtml = "";
        this.ingredients.forEach(ingredient => {
            let quantity = "";
            let unit = "";

            //Vérifier si l'on a ou pas une quantité et une unité
            if(ingredient.quantity !== undefined){
                quantity = `: ${ingredient.quantity}`;
            }

            if(ingredient.unit !== undefined){
                unit = ingredient.unit;
            }

            ingredientsHtml += `<li><strong>${ingredient.ingredient}</strong> ${quantity} ${unit}</li>`
        });
        //Ajout de l'HTML
        let recipeCard = document.querySelector(".recipe-card");
        recipeCard.innerHTML += `<article class="col-lg-4 col-md-6 col-sm-12">
        <div class="place-image-recipe"></div>
        <div class="title-time-recipe">
            <p class="title-recipe">${this.name}</p>
            <img src="./ressources/images/time.svg" alt="horloge">
            <span class="time">${this.time} min</span>
        </div>
        <div class="ingredients-description-recipe">
            <ul class="list-ingredients">
                ${ingredientsHtml}
            </ul>
            <p class="description-recipe">${this.description}</p>
        </div>
    </article>`;

    }
}