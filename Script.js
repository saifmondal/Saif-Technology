// তোমার YouTube Channel ID
const channelId = "UCHs6VSaJpQnXyLRh3SeIKvA";

// ভিডিও লোড ফাংশন
async function loadVideos(limit = 6) {

    const url = `https://rss2json.com/api.json?rss=https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    const container = document.getElementById("videos-container");

    container.innerHTML = "<p>Loading...</p>";

    try {
        const res = await fetch(url);
        const data = await res.json();

        container.innerHTML = "";

        data.items.slice(0, limit).forEach(video => {
            const videoId = video.link.split("=")[1];

            container.innerHTML += `
                <a class="video-card" href="${video.link}" target="_blank">
                    <img src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg">
                    <p>${video.title}</p>
                </a>
            `;
        });

    } catch (error) {
        container.innerHTML = "<p>Error loading videos</p>";
        console.log(error);
    }
}

// যদি index.html → 6 টি ভিডিও দেখাও
if (document.URL.includes("index.html")) {
    loadVideos(6);
}

// যদি videos.html → সব ভিডিও দেখাও
if (document.URL.includes("videos.html")) {
    loadVideos(50);
}
