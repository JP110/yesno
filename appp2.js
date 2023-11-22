import express from 'express'
const app = express();
app.get('/', function (request, response) {
    const formHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Formulaire Nombre</title>
        </head>
        <body>
            <form action="/traitement" method="post">
                <label for="nombre">Entrez un nombre :</label>
                <input type="number" id="nombre" name="nombre" required>
                <button type="submit">OK</button>
            </form>
        </body>
        </html>`;
        response.send(formHtml);
  });



  app.listen(3000, function () {
    console.log("Server listening on port 3000")
  })