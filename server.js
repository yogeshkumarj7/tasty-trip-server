const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS for all routes

// Endpoint to fetch restaurant list
app.get('/api/restaurants', async (req, res) => {
  const swiggyApiUrl =
    'https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.990088&lng=75.7531324&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING';

  try {
    const response = await fetch(swiggyApiUrl);
    const data = await response.json();
    res.json(data); // Send the data to the frontend
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from Swiggy API' });
  }
});

// Endpoint to fetch menu for a specific restaurant
app.get('/api/menu/:restaurantId', async (req, res) => {
  const { restaurantId } = req.params;
  const swiggyMenuApiUrl = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=18.990088&lng=75.7531324&restaurantId=${restaurantId}`;

  try {
    const response = await fetch(swiggyMenuApiUrl);
    const data = await response.json();
    res.json(data); // Send the data to the frontend
  } catch (error) {
    res.status(500).json({ error: 'Error fetching menu from Swiggy API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
