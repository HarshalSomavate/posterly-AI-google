# from flask import Flask, jsonify
# from flask_cors import CORS

# # app instance
# app = Flask(__name__)
# CORS(app)

# # /api/home
# @app.route("/api/home", methods=['GET'])
# def return_home():
#     return jsonify({
#         'message': "Like this video if this helped!",
#         'people': ['Jack', 'Harry', 'Arpan']
#     })


# if __name__ == "__main__":
#     app.run(debug=True, port=8080)




from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import io
from PIL import Image

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Hugging Face API configuration
API_URL = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev"
headers = {"Authorization": "Bearer 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"}

def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    if response.status_code == 200:
        return response.content  # Return the image bytes
    else:
        print(f"Error {response.status_code}: {response.text}")
        return None

# API route to generate banner
@app.route('/api/generate-banner', methods=['POST'])
def generate_banner():
    try:
        # Get form data
        theme = request.form.get('theme')
        text_show = request.form.get('text_show')
        discount_info = request.form.get('discount')
        color_palette = request.form.get('color')

        # Get the uploaded images
        image_files = [
            request.files.get('image1'),
            request.files.get('image2'),
            request.files.get('image3')
        ]

        # Create the prompt
        prompt = f"Create a {theme} sale banner with text showing {text_show} at top of the image and {discount_info} discount, using {color_palette} color palette."

        # Query the Hugging Face model
        image_bytes = query({"inputs": prompt})

        if image_bytes:
            # Load the generated banner image
            banner_image = Image.open(io.BytesIO(image_bytes))

            # Resize and overlay uploaded images
            uploaded_images = []
            for image_file in image_files:
                if image_file:
                    img = Image.open(image_file)
                    img = img.resize((banner_image.width // 4, banner_image.height // 4))  # Resize to fit
                    uploaded_images.append(img)

            # Overlay the images at the bottom of the banner
            margin_x = 22  # Horizontal margin between images
            y_position = banner_image.height - uploaded_images[0].height - 30  # Near the bottom
            x_position = 20  # Starting x position

            for img in uploaded_images:
                banner_image.paste(img, (x_position, y_position), img)  # Paste the images
                x_position += img.width + margin_x  # Update x position

            # Save the final banner image
            banner_image.save("static/generated_combined_banner.png")

            # Return the image URL
            return jsonify({'banner_url': 'static/generated_combined_banner.png'}), 200

        else:
            return jsonify({'error': 'Failed to generate the banner'}), 500

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=8080)
