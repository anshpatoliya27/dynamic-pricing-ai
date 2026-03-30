from app import create_app

# Factory initialization 
app = create_app()

if __name__ == '__main__':
    # Run the Flask app
    app.run(debug=True, port=5000)
