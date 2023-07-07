import openai
import panel as pn
from flask import render_template, url_for, flash, redirect, jsonify, request
from i_am_evanchen import app, cfg, index, ChatOpenAI
from i_am_evanchen.forms import ChatBoxForm

messages = []


@app.route("/", methods=['GET', 'POST'])
@app.route("/home", methods=['GET', 'POST'])
def home():
    return render_template('home.html')

@app.route("/send",  methods=['POST'])
def read_message():
    data = request.get_json()
    respond = send_prompt(data['message'])
    return jsonify(respond)

def send_prompt(prompt):
    # messages = setup_gpt()
    respond = index.query(prompt, llm=ChatOpenAI())
    return respond




@app.route("/about-project")
def about_project():
    index.query()
