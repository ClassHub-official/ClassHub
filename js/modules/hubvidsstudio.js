console.log("HubVids Studio chargé");

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("videoImport");
  if (!input) {
    console.warn("input#videoImport introuvable");
    return;
  }

  input.addEventListener("change", async function () {
    const file = this.files[0];
    if (!file) return;

    const accept = confirm(
      "Acceptez-vous les conditions de publication ?\n\n" +
      "- Votre vidéo sera visible par tous les utilisateurs\n" +
      "- Elle sera stockée sur le serveur\n" +
      "- Vous pouvez la supprimer plus tard"
    );

    if (!accept) {
      alert("Publication annulée.");
      return;
    }

    const formData = new FormData();
    formData.append("video", file);

    try {
      const res = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        console.error("Erreur HTTP upload:", res.status);
        alert("Erreur lors de la publication (HTTP " + res.status + ").");
        return;
      }

      const data = await res.json();
      console.log("Réponse upload:", data);

      if (data.success) {
        alert("Vidéo publiée !");

        // si la fonction de TikTok existe, on recharge le feed
        if (typeof loadTikTokVideos === "function") {
          loadTikTokVideos();
        }
      } else {
        alert("Erreur lors de la publication.");
      }
    } catch (e) {
      console.error("Erreur fetch upload:", e);
      alert("Erreur de connexion au serveur.");
    }
  });
});
