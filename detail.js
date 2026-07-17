async function chargerDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const reponse = await fetch(`http://localhost:3000/todos/${id}`);
  const donnees = await reponse.json();

  console.log(donnees);
  document.getElementById("titre-tache").textContent = donnees.text;
  document.getElementById("date-tache").textContent = donnees.created_at;
  document.getElementById("statut-tache").textContent = donnees.is_complete
    ? "Terminée"
    : "À faire";

  const boutonSupprimer = document.getElementById("supprimer-tache");

  boutonSupprimer.addEventListener("click", async function () {
    await fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    });
    window.location.href = "Taches.html";
  });
  const boutonBascule = document.getElementById("basculer-statut");
boutonBascule.textContent = donnees.is_complete ? "Réouvrir la tâche" : "Terminer la tâche";

boutonBascule.addEventListener("click", async function() {
  await fetch(`http://localhost:3000/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      is_complete: !donnees.is_complete
    })
  });

  // On recharge la page pour voir le nouveau statut
  window.location.reload();
});
}

chargerDetail();
