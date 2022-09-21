from flask import Flask, render_template, request,redirect
from flask_socketio import SocketIO, send, emit
players = {}

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route("/")
def home():
    return render_template("index.html")

@socketio.on("move")
def move(name,dir):


if __name__ == "__main__":
    app.run(debug=True)