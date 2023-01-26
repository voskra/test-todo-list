const bcrypt = require('bcryptjs');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();

const users = [
  {
    id: 1,
    username: 'Test',
    login: 'test',
    password: bcrypt.hashSync(`Password1!`)
  }
];

const SECRET_KEY = 'secret-key';

const corsOptions = {
  origin: 'http://localhost:8080'
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
  const { login, password } = req.body;

  const user = users.find((u) => {
    return u.login === login && bcrypt.compareSync(password, u.password);
  });

  if (user) {
    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_KEY
    );

    res.status(200).send({
      access_token: token
    });
  } else {
    res.status(200).send({
      error: 'Invalid username or password'
    });
  }
});

app.use((err, req, res) => {
  console.error(err);
  res.status(500).send(err.message);
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
