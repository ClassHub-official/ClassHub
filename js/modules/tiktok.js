async function loadTikTok() {
  const res = await fetch("https://classhub-5l38.onrender.com/videos");
  const videos = await res.json();

  const container = document.getElementById("tiktok-feed");
  container.innerHTML = "";

  videos.forEach(v => {
    const card = document.createElement("div");
    card.style.margin = "20px 0";
    card.style.padding = "10px";
    card.style.border = "1px solid #ddd";
    card.style.borderRadius = "12px";
    card.style.background = "#ffffff";

    // VIDEO
    const video = document.createElement("video");
    video.src = v.url;  
    video.controls = true;
    video.autoplay = false;
    video.style.width = "100%";
    video.style.borderRadius = "12px";

    // VUES
    video.onplay = () => {
      fetch(`https://classhub-5l38.onrender.com/view/${v.id}`, {
        method: "POST"
      });
    };

    // LIKE (icône moderne)
    const like = document.createElement("button");
    like.innerHTML = `
      <span class="material-icons-round" style="color:#ff5252;">favorite</span>
      ${v.likes}
    `;
    like.style.border = "none";
    like.style.background = "transparent";
    like.style.cursor = "pointer";
    like.style.fontSize = "18px";

    like.onclick = async () => {
      const r = await fetch(`https://classhub-5l38.onrender.com/like/${v.id}`, {
        method: "POST"
      });
      const d = await r.json();
      like.innerHTML = `
        <span class="material-icons-round" style="color:#ff5252;">favorite</span>
        ${d.likes}
      `;
    };

    // COMMENTAIRE (icône moderne)
    const comment = document.createElement("button");
    comment.innerHTML = `
      <span class="material-icons-round" style="color:#2196f3;">chat_bubble</span>
      Commenter
    `;
    comment.style.border = "none";
    comment.style.background = "transparent";
    comment.style.cursor = "pointer";
    comment.style.fontSize = "18px";

    comment.onclick = () => {
      const text = prompt("Écris ton commentaire :");
      if (!text) return;

      fetch(`https://classhub-5l38.onrender.com/comment/${v.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author: "Abdelhamid",
          text
        })
      });
    };

    // AJOUT
    card.appendChild(video);
    card.appendChild(like);
    card.appendChild(comment);

    container.appendChild(card);
  });
}

loadTikTok();
