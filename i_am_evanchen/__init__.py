import os
from flask import Flask
from config import config
from i_am_evanchen import forms
from langchain.llms import OpenAI
from langchain.document_loaders import TextLoader, DirectoryLoader
from langchain.indexes import VectorstoreIndexCreator
from langchain.chat_models import ChatOpenAI

app = Flask(__name__)
app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
cfg = config.Config()
os.environ['OPENAI_API_KEY'] = cfg.account_info['evanchen_showcase_web']
loader = DirectoryLoader("info_doc")
index = VectorstoreIndexCreator().from_loaders([loader])


from i_am_evanchen import routes