const express = require('express');
const app = express();
const path = require('path');
const {
  products
} = require('./data')

// app.get
// app.post
// app.put
// app.delete
// app.listen
// app.all -> use for all http method after it
// app.use

app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.status(200).send('Home page');
})

app.get('/userpage', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, './template/index.html'));
})

app.get('/products', (req, res) => {
  res.json(products);
})

app.get('/products/:name/company/:company', (req, res) => {
  const {
    name,
    company
  } = req.params;
  const product = products.find(pro => pro.name === name);
  res.send(product);
  console.log(company)
})

app.get('/api/v1/query', (req, res) => {
    const { search, limit } = req.query;
    let newProducts = [...products];
    if (search) {
        newProducts = newProducts.filter(item => item.name.startsWith(search));
    }
    if (limit) {
        newProducts = newProducts.slice(0, +limit);
    }
    return res.status(200).json(newProducts);
})

app.all('*', (req, res) => {
  res.status(404).send('Not Found the url');
})

app.listen(5000, () => {
  console.log('server is listening on port 5000');
});
