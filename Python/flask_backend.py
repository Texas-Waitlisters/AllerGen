from flask import Flask, jsonify, request, render_template, session, redirect, url_for
import json
import requests
from backend import *

app = Flask(__name__)

@app.route('/search/barcode', methods=['GET'])
def search_barcode():
    #barcode = request.form['data']
    barcode='070847811169'
    data = search(barcode)
    print(data)
    return 'abc'

app.run(host='0.0.0.0')
