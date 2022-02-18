from flask import Flask, request

app = Flask(__name__)

@app.route("/upload", methods = ["GET", "POST"])
def upload():
    if request.method == "POST":
        type = request.content_type
        return str(type)
    else:
        return "POST an image to this URL"