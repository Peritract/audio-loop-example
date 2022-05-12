# Audio Loop Example

This repository contains a very small and hacked-together demo project.

The project allows you to record audio on a webpage, send that audio to an API, and then later request it back from the same.

Currently, the project uses a text file as a database, but this is an implementation detail; there's nothing preventing you using a database to store the audio data.

## Usage

- Install (in a virtual environment or otherwise as you prefer, I'm not a cop) the requirements listed in [./api/requirements.txt](./api/requirements.txt)
- Run the API server from the `./api` folder with `python app.py`
- Use `index.html` in the client folder to record audio and send it to the back-end.
- Use `load-audio.html` to hear your dulcet tones played back to you.