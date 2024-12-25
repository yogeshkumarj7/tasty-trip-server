const express = require("express");
const cors = require("cors");
const fetch = require("cross-fetch");
const app = express();
const port = process.env.PORT || 3000;

// Enhanced CORS configuration
app.use(cors({
  origin: ['https://tasty-trip.netlify.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Restaurant API with improved error handling
app.get("/api/restaurants", async (req, res) => {
  try {
    const { lat, lng, page_type } = req.query;
    
    if (!lat || !lng) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=${page_type}`;
    
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Restaurant API Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Menu API with improved error handling
app.get("/api/menu", async (req, res) => {
  try {
    const { 
      'page-type': page_type,
      'complete-menu': complete_menu,
      lat,
      lng,
      submitAction,
      restaurantId 
    } = req.query;

    if (!restaurantId || !lat || !lng) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const url = `https://www.swiggy.com/dapi/menu/pl?page-type=${page_type}&complete-menu=${complete_menu}&lat=${lat}&lng=${lng}&submitAction=${submitAction}&restaurantId=${restaurantId}`;
    
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Menu API Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.json({
    status: "active",
    message: "Tasty-Trip API Server",
    documentation: "API endpoints: /api/restaurants and /api/menu"
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
