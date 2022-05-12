from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    with open("test.txt") as f_obj:
        data = f_obj.read()
        return jsonify({"success": True,
                        "blob": data})

@app.route('/post_audio', methods=["POST"])
def post_audio():
    data = request.get_json()
    
    with open("test.txt", "w") as f_obj:
        f_obj.write(data["blob"])

    return jsonify({"success": True})

if __name__ == "__main__":
    app.run()