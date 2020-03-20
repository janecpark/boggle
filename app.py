from boggle import Boggle
from flask import Flask, render_template, session, request, jsonify

boggle_game = Boggle()
app = Flask(__name__)
app.config['SECRET_KEY'] = "secret"

@app.route('/')
def board():
    """Render a board"""
    board = boggle_game.make_board()
    session['board'] = board
    return render_template('index.html', board=board)


@app.route('/check-word')
def check_word():
    word = request.args['word']
    board = session["board"]
    res = boggle_game.check_valid_word(board, word)
    return jsonify({'result':res})




