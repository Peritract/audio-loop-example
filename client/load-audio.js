const audio = document.getElementById("audio");

window.addEventListener('load', (event) => {
    

    fetch("http://localhost:5000")
        .then(r => r.json())
        .then(d => {

            const encodedBlob = d.blob; // Get the string data
            const blobParts = encodedBlob.split(";base64,"); // Split off the metadata
            const blobType = blobParts[0].split(':')[1]; // Extract the type from the metadata
            const blobBytesAsCharacters = atob(blobParts[1]); // Decode the data into a normal string
            const blobBytesAsNumbers = [...blobBytesAsCharacters].map(c => c.charCodeAt(0)); // Replace each character with a number
            const blobBytes = new Uint8Array(blobBytesAsNumbers); // Turn those numbers into bytes
            const blob = new Blob([blobBytes], {type: blobType}); // Blob it
            console.log(blob);
            
            // Make a src URL for the blob

            const blobURL = URL.createObjectURL(blob); // Convert it into a URL that audio objects accept

            // Attach it to the audio element

            audio.src = blobURL; // Add it on
        })
        .catch(e => console.log(e));
});