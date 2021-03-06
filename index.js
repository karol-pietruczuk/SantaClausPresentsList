const express = require('express');
require('express-async-errors');
const methodOverride = require('method-override');
const { engine } = require('express-handlebars');
const colors = require('colors');
const { giftRouter } = require('./routers/gift');
const { childRouter } = require('./routers/child');
const { homeRouter } = require('./routers/home');
const { handleError } = require('./utils/errors');
require('./utils/db');
const { handlebarsHelpers } = require('./utils/handlebars-helpers'); // ten dziwny zapis po to, aby po odrazu po uruchomieniu nastąpiło łączenie z bazą danych

const app = express();

app.use(methodOverride('_method'));
app.use(express.urlencoded({
  extended: true,
}));
app.use(express.static('public'));
// app.use(express.json()); // Content-type: application/json
app.engine('.hbs', engine({
  extname: '.hbs',
  helpers: handlebarsHelpers, // Additinal functionality for handlebars
}));
app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/child', childRouter);
app.use('/gift', giftRouter);

app.use(handleError);

app.listen(3000, 'localhost', () => {
  console.log(colors.green('Listening on http://localhost:3000'));
});
