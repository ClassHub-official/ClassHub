console.log("TikTok‑like chargé");

function loadTikTokVideos() {
  let vids = localStorage.getItem("tiktok_videos");
  vids = vids ? JSON.parse(vids) : [];

  const container = document.getElementById("tiktokFeed");
  if (!container) return;

  container.innerHTML = "";

  vids.forEach(v => {
    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "center";
    wrapper.style.marginBottom = "40px";

    // VIDEO
    const video = document.createElement("video");
    video.src = v.src;
    video.controls = true;
    video.style.width = "260px";
    video.style.borderRadius = "12px";
    video.style.background = "#000";

    // RIGHT PANEL
    const panel = document.createElement("div");
    panel.style.display = "flex";
    panel.style.flexDirection = "column";
    panel.style.marginLeft = "20px";
    panel.style.gap = "12px";

    // LIKE BUTTON
    const like = document.createElement("div");
    like.innerHTML = "👍 100k";
    like.style.background = "#4a90e2";
    like.style.color = "white";
    like.style.padding = "8px 12px";
    like.style.borderRadius = "8px";
    like.style.cursor = "pointer";

    // DISLIKE
    const dislike = document.createElement("div");
    dislike.innerHTML = "👎";
    dislike.style.background = "#4a90e2";
    dislike.style.color = "white";
    dislike.style.padding = "8px 12px";
    dislike.style.borderRadius = "8px";
    dislike.style.cursor = "pointer";

    // COMMENTS
    const comments = document.createElement("div");
    comments.innerHTML = "💬 20";
    comments.style.background = "#4a90e2";
    comments.style.color = "white";
    comments.style.padding = "8px 12px";
    comments.style.borderRadius = "8px";
    comments.style.cursor = "pointer";

    // NOTIFICATIONS
    const notif = document.createElement("div");
    notif.innerHTML = "🔔 1M";
    notif.style.background = "#4a90e2";
    notif.style.color = "white";
    notif.style.padding = "8px 12px";
    notif.style.borderRadius = "8px";
    notif.style.cursor = "pointer";

    panel.appendChild(like);
    panel.appendChild(dislike);
    panel.appendChild(comments);
    panel.appendChild(notif);

    wrapper.appendChild(video);
    wrapper.appendChild(panel);

    container.appendChild(wrapper);
  });

  if (vids.length === 0) {
    container.innerHTML = "<p>Aucune vidéo publiée pour le moment.</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadTikTokVideos);
