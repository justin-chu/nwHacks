import json

from flask import Flask, jsonify, request

app = Flask(__name__)


@app.route('/', methods=['GET'])
def index():
    return "hello word"

@app.route('/search', methods=['GET'])
def search():
    print(request.args)
    # http://127.0.0.1:5000/search?arg1=hi
    # ImmutableMultiDict([('arg1', 'hi')])
    return jsonify({'gg': (1, 2)})

if __name__ == '__main__':
    app.run(debug=True)
