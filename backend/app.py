import json

from scrape import get_response_dict
from flask import Flask, jsonify, request

app = Flask(__name__)

with open('.keys', 'r') as f:
    keyd = json.load(f)

with open('ctrees.txt', 'r') as f:
    ctrees = json.load(f)

@app.route('/', methods=['GET'])
def index():
    return '<h1>Index</h1>'

@app.route('/search', methods=['GET'])
def search():
    search_term = request.args.get('q', None)
    if search_term is None:
        return jsonify({})

    resp_dict = get_response_dict(search_term, ctrees, ytb_key=keyd['ytb_key'], gthumb_key=keyd['gthumb_key'])
    return jsonify(resp_dict)

if __name__ == '__main__':
    app.run(debug=True)
