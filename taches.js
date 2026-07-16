// Fonction async pour pouvoir utiliser await
async function chargerTaches() {
  // Appel de l'API : on attend la réponse
  const reponse = await fetch("http://localhost:3000/todos");
  // Conversion de la réponse en objet JavaScript
  const donnees = await reponse.json();
  // Les tâches sont imbriquées dans todolist
  const taches = donnees[0].todolist;

  // On récupère les deux listes
  const listeAFaire = document.getElementById("liste-a-faire");
  const listeTerminee = document.getElementById("liste-terminee");

  // Pour chaque tâche, on génère une ligne HTML
  taches.forEach(function(tache) {

    // On construit la ligne une seule fois
    const ligne = `
      <li class="tache">
        <div class="tache-titre">
          <input type="checkbox" id="tache-${tache.id}" ${tache.is_complete ? "checked" : ""} />
          <label for="tache-${tache.id}">${tache.text}</label>
        </div>
        <p class="tache-date">
          <img src="Images/proicons_clock.png" alt="" />${tache.created_at}
        </p>
        <a href="Details.html?id=${tache.id}" class="tache-lien">Consulter la tâche</a>
      </li>
    `;

    // On choisit la destination selon le statut
    if (tache.is_complete) {
      listeTerminee.innerHTML += ligne;
    } else {
      listeAFaire.innerHTML += ligne;
    }

  });
}

chargerTaches();


