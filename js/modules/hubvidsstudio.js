async function uploadVideo() {
  const file = document.getElementById("videoFile").files[0];
  if (!file) return alert("Choisis une vidéo");

  const form = new FormData();
  form.append("video", file);
  form.append("creator", "Abdelhamid");

  const res = await fetch("https://classhub-5l38.onrender.com/upload", {
    method: "POST",
    body: form
  });

  const data = await res.json();
  alert("Vidéo publiée !");
}
