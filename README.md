# Setting up locally
## Server
```zsh
cd server
python -m venv venv
pip install -r requirements.txt
cp .env.example .env
flask run
```

By that, you should have a Flask server running on `http://localhost:5000`

## Client
```zsh
cd client
npm install
npm run dev
```

By that, you should have a React.js + Vite client running on `http://localhost:3000` that is connected to Flask server through proxy.