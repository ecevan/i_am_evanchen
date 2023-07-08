import openai
import panel as pn
from flask import render_template, url_for, flash, redirect, jsonify, request
from i_am_evanchen import app, cfg, index, ChatOpenAI
from i_am_evanchen.forms import ChatBoxForm
import markdown

messages = []


@app.route("/", methods=['GET', 'POST'])
@app.route("/home", methods=['GET', 'POST'])
def home():
    return render_template('home.html')


@app.route("/send", methods=['POST'])
def read_message():
    data = request.get_json()
    respond = send_prompt(data['message'])
    return jsonify(respond)


@app.route("/test")
def test():
    return render_template('test.html')


def send_prompt(prompt):
    # messages = setup_gpt()
    respond = index.query(prompt, llm=ChatOpenAI())
    return respond


@app.route("/about-project")
def about_project():
    with open('D:\projects\i_am_evanchen\README.md', 'r') as f:
        readme_content = f.read()
    readme_html = markdown.markdown(readme_content)
    return render_template('about_project.html', readme_content=readme_html)
