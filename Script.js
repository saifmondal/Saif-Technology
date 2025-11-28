// ------------------------------
// Toggle Dark / Light Theme
// ------------------------------
function toggleTheme() {
    document.body.classList.toggle("light");
}

// Set Background Image
document.body.style.backgroundImage = "url('bg.jpg')";


// ------------------------------
// YOUTUBE AUTO VIDEO LOADER
// ------------------------------

const channelID = "UCs4lK8T3i0uUQyFsBR1rQTA";   // আপনার YouTube Channel ID
const videoContainer = document.getElementById("video-list");

fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelID}`)
    .then(res => res.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        let entries = data.getElementsByTagName("entry");

        // যদি ভিডিও কম থাকে, লুপ অটো অ্যাডজাস্ট করবে
        let limit = entries.length >= 6 ? 6 : entries.length;

        for (let i = 0; i < limit; i++) {
            let videoId = entries[i].getElementsByTagName("yt:videoId")[0].textContent;
            let title = entries[i].getElementsByTagName("title")[0].textContent;
            let thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

            let card = document.createElement("div");
            card.className = "video-card";

            card.innerHTML = `
                <img src="${thumb}" alt="Thumbnail">
                <h3>${title}</h3>
                <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" class="btn">Watch</a>
            `;

            videoContainer.appendChild(card);
        }
    })
    .catch(error => {
        console.error("YouTube Feed Load Error:", error);
        videoContainer.innerHTML = "<p style='color:red'>Failed to load videos.</p>";
    });
