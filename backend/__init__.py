from flask import Flask
from config import Config
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)

from . import routes  # ??! -> this import should be in the end. (c) Miguel Grinberg
