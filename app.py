from __future__ import division, print_function
from flask import Flask, redirect, url_for, request, render_template
from tensorflow.keras.preprocessing import image
from werkzeug.utils import secure_filename
from flask_cors import CORS
from pathlib import Path
import numpy as np
import base64
import keras
import glob
import json
import sys
import re
import os

app = Flask(__name__ ,template_folder='templates')

model = keras.models.load_model("SunsetClassification.h5")

def model_predict(img_path):
    """
       model_predict will return the preprocessed image
    """
    output_class = ['beautiful_sunset', 'normal_sunset']
    test_image = image.load_img(img_path, target_size=(200, 200))
    test_image = image.img_to_array(test_image) / 255
    test_image = np.expand_dims(test_image, axis=0)

    predicted_array = model.predict(test_image)
    predicted_value = output_class[np.argmax(predicted_array)]
    predicted_accuracy = round(np.max(predicted_array) * 100, 2)
    return predicted_value

@app.route('/', methods=['GET'])
def index():
    # Main page
    return render_template("index.html")

@app.route('/uploader', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        # Get the file from post request
        f = request.files['file']

        # Save the file to ./uploads
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(
            basepath, 'uploads', secure_filename(f.filename))
        f.save(file_path)

        # Make prediction
        preds = model_predict(file_path)
        return preds
    return None

if __name__ == '__main__':
    app.run()


