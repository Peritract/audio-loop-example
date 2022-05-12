const start = document.getElementById("start");
const stop = document.getElementById("stop");
const audio = document.getElementById("audio");


// Ask for permission to record

navigator.mediaDevices.getUserMedia({ audio: true})
    .then( (stream) => {

        // Make a thing that can store audio

        const recorder = new MediaRecorder(stream);

        // Add start and stop buttons

        start.addEventListener('click', () => {
            recorder.start();
            console.log(recorder.state);
        })

        stop.addEventListener('click', () => {
            recorder.stop();
            console.log(recorder.state);
        })

        // A place to store sections of streamed audio
        
        let sections = []

        // Push a section whenever it's available

        recorder.ondataavailable = function (e) {
            sections.push(e.data);
        }

        // When recording stops (state == 'inactive')

        recorder.onstop = (e) => {

            // Make an audio blob from the sections

            const blob = new Blob(sections, { type: 'audio/mp3' });

            // Clear the sections

            sections = []

            // Make a src URL for the blob

            const blobURL = URL.createObjectURL(blob);

            // Attach it to the audio element

            audio.src = blobURL;

            // Convert the blob to a base64 encoded string

            const reader = new FileReader()
            reader.readAsDataURL(blob);

            // When it's converted,

            reader.onloadend = (e) => {
                const encodedBlob = reader.result;

                // Send the string to the api

                const options = {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({blob: encodedBlob})
                }

                fetch("http://localhost:5000/post_audio", options)
                    .then(r => r.json())
                    .then(d => console.log(d))
            }

        }


    })
    .catch(e => console.log(e))