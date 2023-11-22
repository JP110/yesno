import express from 'express'
import fs from 'fs'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use('/gif/no', express.static(path.join(__dirname, 'gif', 'no')));
app.use('/gif/yes', express.static(path.join(__dirname, 'gif', 'yes')));

app.get('/api', (request, response) => {
    const dossiers = ['/home/jp/Workspaces/node/gif/yes/', '/home/jp/Workspaces/node/gif/no/'];
    const randomDossierIndex = Math.floor(Math.random() * dossiers.length);

    const dossier = dossiers[randomDossierIndex];

    fs.readdir(dossier, (err, fichiers) => {
        if (err) {
            console.error('Erreur lors de la lecture du dossier :', err);
            return response.status(500).send('Erreur serveur interne');
        }

        const fichiersFiltrés = fichiers.filter(fichier => {
            return fs.statSync(path.join(dossier, fichier)).isFile();
        });


        const fichierAuHasard = fichiersFiltrés[Math.floor(Math.random() * fichiersFiltrés.length)];


        const prefixe = randomDossierIndex === 0 ? 'yes' : 'no';


        response.send(`
        <style>
            body { display: flex; align-items: center; justify-content: center; margin: 0; }
            #overlay { position: absolute; color: white; text-align: center; font-size: 75px; }
        </style>
        <div id="overlay">${prefixe}</div>
        <img style=" height: 100vh;" src="/gif/${prefixe}/${encodeURIComponent(fichierAuHasard)}" alt="Image">
    `);
    });
});

  
 /*app.get('/gif/:type/:path', (request, response) => {
    const fichier = request.params.path;
    const cheminImage = path.join(__dirname, 'gif', type, fichier);
    response.sendFile(cheminImage);
});*/

  

app.get('/foo', function (request, response) {
  response.send('Hello Foo!')
})

app.get('/bar', function (request, response) {
  response.send({a:123,b:256})
})


app.get('/', function (request, response) {
    response.send('Hello !')
  })
  


app.listen(3000, function () {
  console.log("Server listening on port 3000")
})