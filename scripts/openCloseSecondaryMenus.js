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