// ===== FINAL script.js (replace entire file) =====

// 1) এখানে তোমার সঠিক Channel ID দিচ্ছি (তুমি আগে দিয়েছিলে)
// আপনার চ্যানেল ID (আপনের ক্ষেত্রে): UCs4lK8T3i0uUQyFsBR1rQTA
const channelId = "UCs4lK8T3i0uUQyFsBR1rQTA";

// 2) helper: page container ID (must match index.html & videos.html)
const CONTAINER_ID = "videos-container";

// 3) show messages on page for debug (visible to you)
function showMessage(msg, color = "#00eaff") {
  let box = document.getElementById("video-debug-box");
  if (!box) {
    box = document.createElement("div");
    box.id = "video-debug-box";
    box.style.position = "fixed";
    box.style.left = "12px";
    box.style.bottom = "12px";
    box.style.padding = "8px 12px";
    box.style.background = "#0b1020aa";
    box.style.color = "#fff";
    box.style.borderRadius = "8px";
    box.style.fontSize = "13px";
    box.style.zIndex = 9999;
    document.body.appendChild(box);
  }
  box.innerText = msg;
  box.style.border = `2px solid ${color}`;
}

// 4) main loader (uses rss2json proxy to avoid CORS)
async function loadVideos(limit) {
  const container = document.getElementById(CONTAINER_ID);
  if (!container) {
    console.error("VIDEOS CONTAINER not found. Expected id:", CONTAINER_ID);
    showMessage("Error: videos container not found (check id).", "#ff4444");
    return;
  }

  showMessage("Loading videos...");

  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const proxy = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

  try {
    const res = await fetch(proxy);
    if (!res.ok) throw new Error("Network response not ok: " + res.status);
    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      container.innerHTML = "<p style='color:#fff'>No videos found.</p>";
      showMessage("No videos returned by feed.", "#ffbb33");
      return;
    }

    // clear
    container.innerHTML = "";

    const items = data.items.slice(0, limit || 6);
    items.forEach(item => {
      // item.link is like "https://www.youtube.com/watch?v=VIDEOID"
      const videoId = (item.link.split("v=")[1] || "").split("&")[0];
      const thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      const title = item.title || "Untitled";

      const a = document.createElement("a");
      a.className = "video-card";
      a.href = item.link;
      a.target = "_blank";
      a.innerHTML = `
        <img src="${thumb}" alt="${title}">
        <p>${title}</p>
      `;
      container.appendChild(a);
    });

    showMessage(`Loaded ${items.length} videos.`, "#00ff88");
  } catch (err) {
    console.error("Error loading videos:", err);
    container.innerHTML = "<p style='color:#ff9999'>Error loading videos. See console.</p>";
    showMessage("Error loading videos (check console).", "#ff4444");
  }
}

// 5) decide how many to load depending on page
const path = window.location.pathname;
if (path.endsWith("/index.html") || path === "/" || path.endsWith("/Saif-Technology") || path.endsWith("/Saif-Technology/")) {
  loadVideos(6);  // show 6 on homepage
} else if (path.endsWith("/videos.html")) {
  loadVideos(50); // show many on videos page
} else {
  // fallback: try to load 6
  loadVideos(6);
}
