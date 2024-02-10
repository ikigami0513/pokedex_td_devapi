Lancement du serveur backend 
cd back
npm install
npm run start

Lancement du serveur frontend
cd front
python -m venv venv
venv/Script/activate
pip install -r requirements.txt
python index.py

connexion admin:
login : admin
password : admin

base de données :
télécharger les fichiers json dans back/dumb_db et les importer dans une collection nommée pokedex sur mongodb