// 🌙 Toggle Dark/Light Theme
function toggleTheme() {
    document.body.classList.toggle("light");
}



// 📌 YouTube Videos Auto Load (Optional)
// https://youtu.be/nzgKmiGxhVY?si=T-RjpxGn0yIOV0UW

const videoList = [
    // nzgKmiGxhVY
    "XXXXXXXX",
    "YYYYYYYY",
    "ZZZZZZZZ",
    "WWWWWWWW"
];

const container = <div id="videos-container"></div>

if (container) {
    videoList.forEach(id => {
        const card = `
            <a class="video-card" href="https://www.youtube.com/watch?v=${id}" target="_blank">
                <img src="https://img.youtube.com/vi/${id}/hqdefault.jpg">
                <p>Video Title</p>
            </a>
        `;
        container.innerHTML += card;
    });
}
