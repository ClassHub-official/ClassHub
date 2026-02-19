async function loadTikTok() {
  const res = await fetch("https://classhub-5l38.onrender.com/videos");
  const videos = await res.json();

  const container = document.getElementById("tiktok-feed");
  container.innerHTML = "";

  videos.forEach(v => {
    const card = document.createElement("div");
    card.className = "tiktok-card";

    const video = document.createElement("video");
    video.src = v.url;
    video.controls = true;
    video.autoplay = false;

    video.onplay = () => {
      fetch(`https://classhub-5l38.onrender.com/view/${v.id}`, { method: "POST" });
    };

    const like = document.createElement("button");
    like.innerText = `👍 ${v.likes}`;
    like.onclick = async () => {
      const r = await fetch(`https://classhub-5l38.onrender.com/like/${v.id}`, { method: "POST" });
      const d = await r.json();
      like.innerText = `👍 ${d.likes}`;
    };

    const commentBtn = document.createElement("button");
    commentBtn.innerText = "💬 Commenter";
    commentBtn.onclick = () => {
      const text = prompt("Ton commentaire :");
      if (!text) return;

      fetch(`https://classhub-5l38.onrender.com/comment/${v.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author: "Abdelhamid", text })
      });
    };

    const creator = document.createElement("div");
    creator.innerText = `Créateur : ${v.creator}`;

    card.appendChild(video);
    card.appendChild(like);
    card.appendChild(commentBtn);
    card.appendChild(creator);

    container.appendChild(card);
  });
}
