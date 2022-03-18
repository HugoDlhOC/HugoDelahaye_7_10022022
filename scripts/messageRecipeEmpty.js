/**
 * Fonction qui affiche le message indiquant qu'il n'y a pas de recette trouvée
 */
 export function displayMessageRecipeNoFound() {
    document
      .querySelector("#message")
      .classList.replace("display-none", "display-flex");
  }
  
  /**
   * Fonction qui cache le message indiquant qu'il n'y a pas de recette trouvée
   */
  export function hideMessageRecipeNoFound() {
    document
      .querySelector("#message")
      .classList.replace("display-flex", "display-none");
  }