from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send', methods=['POST', 'GET'])
def send():
    message = request.form['message']
    # Process the message on the server and generate the chatbot response
    response = 'testing, 1 2 3'
    return response

if __name__ == '__main__':
    app.run(debug=True)
