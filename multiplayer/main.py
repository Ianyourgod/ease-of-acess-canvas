from flask import Flask, render_template, request,redirect
from flask_socketio import SocketIO, send, emit
players = {}

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route("/")
def home():
    return render_template("index.html")

@socketio.on("connect")
def connect():
    players[request.sid] = [0,0]
    print(players)

@socketio.on("disconnect")
def disconnect():
    print("discon")
    del players[request.sid]

if __name__ == "__main__":
    app.run(debug=True)