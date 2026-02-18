console.log("HubVids Studio chargé");

// Sauvegarde des vidéos dans localStorage
function saveVideoToTikTok(base64) {
  let vids = localStorage.getItem("tiktok_videos");
  vids = vids ? JSON.parse(vids) : [];

  vids.push({
    id: Date.now(),
    src: base64
  });

  localStorage.setItem("tiktok_videos", JSON.stringify(vids));
}

// Import vidéo
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("videoImport");

  if (!input) return;

  input.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {
      const base64 = e.target.result;

      const accept = confirm(
        "Acceptez-vous les conditions de publication ?\n\n" +
        "- Votre vidéo sera visible dans TikTok‑like\n" +
        "- Elle sera stockée localement dans votre appareil\n" +
        "- Vous pouvez la supprimer à tout moment"
      );

      if (accept) {
        saveVideoToTikTok(base64);
        alert("Vidéo publiée dans TikTok‑like !");
      } else {
        alert("Publication annulée.");
      }
    };

    reader.readAsDataURL(file);
  });
});
