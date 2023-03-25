const { request, response } = require("express");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());

const getMorgan = morgan("tiny");
const postMorgan = morgan(
  ":method :url :status :res[content-length] - :response-time ms :json"
);

app.use((request, response, next) => {
  if (request.method === "GET") {
    getMorgan(request, response, next);
  } else if (request.method === "POST") {
    postMorgan(request, response, next);
  } else {
    next();
  }
});

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const personsNumber = persons.length;
  const now = new Date();

  const infoDiv = `
    <div>
      <p>Phonebook has info for ${personsNumber} persons</p>
      <p>${now}</p>
    </div>
  `;

  response.send(infoDiv);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).send("This person does not exist");
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const randomId = Math.floor(Math.random() * 20000);
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  } else if (!body.number) {
    return response.status(400).json({
      error: "number missing",
    });
  }

  const personExists = persons.find((p) => p.name === body.name);
  if (personExists) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    id: randomId,
    name: body.name,
    number: body.number,
  };

  morgan.token("json", (request, response) => {
    return JSON.stringify({
      name: body.name,
      number: body.number,
    });
  });

  persons = persons.concat(person);

  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
