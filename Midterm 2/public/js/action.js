function playSound() {
    const sound = document.getElementById("soundEffect");
    if (sound) {
        sound.currentTime = 0; // Reset to the beginning
        sound.play(); // Play the sound
    }
}

function redirectToGetRoute(id, currentPage) {
    // Redirect to the desired GET route (for example: '/some-route')
    window.location.href = '/character?id=' + encodeURIComponent(id) + "&currentPage=" + encodeURIComponent(currentPage);
}

