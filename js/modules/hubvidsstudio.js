console.log("HubVids Studio chargé");

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("videoImport");
  if (!input) return;

  input.addEventListener("change", async function () {
    const file = this.files[0];
    if (!file) return;

    const accept = confirm(
      "Acceptez-vous les conditions de publication ?\n\n" +
      "- Votre vidéo sera visible par tous les utilisateurs\n" +
      "- Elle sera stockée sur le serveur Render\n" +
      "- Vous pouvez la supprimer plus tard"
    );

    if (!accept) {
      alert("Publication annulée.");
      return;
    }

    const formData = new FormData();
    formData.append("video", file);

    try {
      const res = await fetch("https://classhub-5l38.onrender.com/upload", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      console.log("Réponse serveur :", data);

      if (data.success) {
        alert("Vidéo publiée !");
      } else {
        alert("Erreur lors de la publication.");
      }
    } catch (e) {
      console.error("Erreur :", e);
      alert("Erreur de connexion au serveur Render.");
    }
  });
});
