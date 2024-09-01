document.addEventListener("DOMContentLoaded", function() {
    const recettes = []; // Initialisation d'un tableau vide pour les recettes

    const recettesContainer = document.getElementById("recettes");
    const formAjouterRecette = document.getElementById("form-ajouter-recette");

    // Fonction pour afficher les recettes
    function afficherRecettes() {
        recettesContainer.innerHTML = ""; // Vider le conteneur de recettes
        recettes.forEach((recette, index) => {
            const recetteDiv = document.createElement("div");
            recetteDiv.classList.add("recette");

            recetteDiv.innerHTML = `
                <img src="${recette.image}" alt="${recette.titre}" class="recette-image">
                <h2>${recette.titre}</h2>
                <button onclick="afficherRecette('${recette.titre}', '${recette.ingredients.join(', ')}', '${recette.instructions}')">Voir la recette</button>
                <button class="supprimer" onclick="supprimerRecette(${index})">Supprimer</button>
            `;

            recettesContainer.appendChild(recetteDiv);
        });
    }

    // Gérer le formulaire pour ajouter une nouvelle recette
    formAjouterRecette.addEventListener("submit", function(event) {
        event.preventDefault(); // Empêcher le rechargement de la page

        // Récupérer les valeurs du formulaire
        const titre = document.getElementById("titre").value;
        const ingredients = document.getElementById("ingredients").value.split(","); // Séparer les ingrédients par des virgules
        const instructions = document.getElementById("instructions").value;
        const imageFile = document.getElementById("image").files[0]; // Récupérer le fichier image

        // Vérifier si un fichier image a été sélectionné
        if (!imageFile) {
            alert("Veuillez sélectionner une image.");
            return;
        }

        // Créer un objet FileReader pour lire le fichier image
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageUrl = event.target.result; // Obtenir l'URL de l'image en mémoire

            // Créer un nouvel objet recette
            const nouvelleRecette = {
                titre,
                ingredients,
                instructions,
                image: imageUrl
            };

            // Ajouter la nouvelle recette au tableau des recettes
            recettes.push(nouvelleRecette);

            // Afficher la nouvelle liste des recettes
            afficherRecettes();

            // Réinitialiser le formulaire
            formAjouterRecette.reset();
        };

        // Lire le fichier image en tant que URL d'objet
        reader.readAsDataURL(imageFile);
    });

    // Fonction pour supprimer une recette
    window.supprimerRecette = function(index) {
        recettes.splice(index, 1); // Supprimer la recette à l'index spécifié
        afficherRecettes(); // Mettre à jour l'affichage des recettes
    }
});

function afficherRecette(titre, ingredients, instructions) {
    alert(`Recette: ${titre}\n\nIngrédients: ${ingredients}\n\nInstructions: ${instructions}`);
}
