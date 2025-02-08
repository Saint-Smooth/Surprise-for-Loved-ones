document.addEventListener("DOMContentLoaded", function () {
    const popup = document.querySelector(".popup");
    const closePopup = document.getElementById("closePopup");
    const heart = document.querySelector(".heart");
    const wrapper = document.querySelector(".wrapper");
    const replyPopup = document.querySelector(".reply-popup");
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const bgMusic = document.getElementById("bgMusic"); // Get the audio element
    const toggleMusicBtn = document.getElementById("toggleMusic"); // Music control button

    let noCount = 0;

    // Show initial pop-up
    popup.style.display = "flex";

    // Close initial pop-up
    closePopup.addEventListener("click", function () {
        popup.style.display = "none";
    });

    // Start letter animation and play music when heart is clicked
    heart.addEventListener("click", function () {
        wrapper.classList.add("open");

        // Play background music when heart is clicked
        if (bgMusic.paused) {
            bgMusic.play().catch(error => console.log("Autoplay blocked:", error));
            toggleMusicBtn.innerText = "🔇 Pause Music"; // Update button text
        }

        // Show reply pop-up AFTER 8 seconds (to allow reading time)
        setTimeout(() => {
            replyPopup.style.display = "flex";
        }, 8000);
    });

    // Handle "Yes" response - Start petal animation
    yesBtn.addEventListener("click", function () {
        replyPopup.style.display = "none";
        createPetalAnimation(); // Function to start petals
    });

    // Handle "No" response - Reprompt or Show "F*ck You"
    noBtn.addEventListener("click", function () {
        if (noCount < 5) {
            noCount++;
            replyPopup.querySelector("p").innerText = "Please";
        } else {
            replyPopup.querySelector("p").innerText = "F*ck You 😂";
            noBtn.style.display = "none";
            yesBtn.innerText = "Fine... Yes";
        }
    });

    // Function to create falling petals
    function createPetalAnimation() {
        for (let i = 0; i < 300; i++) { // Reduced number to avoid lag
            let petal = document.createElement("div");
            petal.classList.add("petal");
            document.body.appendChild(petal);

            // Randomize position & delay
            petal.style.left = Math.random() * 100 + "vw";
            petal.style.animationDelay = Math.random() * 3 + "s";
            petal.style.transform = `rotate(${Math.random() * 360}deg)`;

            // Remove petal after animation ends
            setTimeout(() => petal.remove(), 10000);
        }
    }

    // 🎵 Handle Music Play/Pause Toggle
    toggleMusicBtn.addEventListener("click", function () {
        if (bgMusic.paused) {
            bgMusic.play();
            toggleMusicBtn.innerText = "🔇 Pause Music";
        } else {
            bgMusic.pause();
            toggleMusicBtn.innerText = "🎵 Play Music";
        }
    });
});

