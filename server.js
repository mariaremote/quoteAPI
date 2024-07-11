const express = require("express");
const app = express();
const { quotes } = require("./data");
const PORT = process.env.PORT || 4001;
const { getRandomElement } = require("./utils");

app.use(express.static("public"));

app.get("/api/quotes/", (req, res) => {
  const person = req.query.person;
  if (person) {
    const filteredQuotes = quotes.filter((quote) => quote.person === person);
    res.send({ quotes: filteredQuotes });
  } else {
    res.send({ quotes: quotes });
  }
});

app.get("/api/quotes/random", (req, res) => {
  let randomQuote = getRandomElement(quotes);
  res.send({ quote: randomQuote });
});

app.post("/api/quotes/", (req, res) => {
  const newQuote = req.query;
  if (newQuote.quote && newQuote.person) {
    quotes.push(newQuote);
    res.status(201).send({ quote: newQuote });
  } else {
    res.status(400).send();
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
