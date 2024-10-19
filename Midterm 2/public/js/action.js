function playSound() {
    const sound = document.getElementById("soundEffect");
    if (sound) {
        sound.currentTime = 0; // Reset to the beginning
        sound.play(); // Play the sound
    }
}