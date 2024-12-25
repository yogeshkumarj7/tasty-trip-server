const express = require("express");
const cors = require("cors");
const fetch = require("cross-fetch");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: ['https://tasty-trip.netlify.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Restaurant API with response type checking and debugging
app.get("/api/restaurants", async (req, res) => {
  try {
    const { lat, lng, page_type } = req.query;
    console.log('Restaurant API Request:', { lat, lng, page_type });

    if (!lat || !lng) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=${page_type}`;
    console.log('Fetching from URL:', url);

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/json",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": "https://www.swiggy.com/",
        "Origin": "https://www.swiggy.com"
      },
    });

    // Log response headers and status
    console.log('Response Status:', response.status);
    console.log('Response Headers:', Object.fromEntries(response.headers.entries()));

    // Check content type
    const contentType = response.headers.get('content-type');
    console.log('Content-Type:', contentType);

    // Get response text first
    const text = await response.text();
    console.log('Response Text Preview:', text.substring(0, 200));

    // Try parsing as JSON
    try {
      const data = JSON.parse(text);
      res.json(data);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      res.status(500).json({ 
        error: 'Invalid JSON response from Swiggy API',
        details: text.substring(0, 200),
        status: response.status
      });
    }
  } catch (error) {
    console.error('Restaurant API Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Menu API with similar debugging
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
    console.log('Menu API Request:', { page_type, complete_menu, lat, lng, submitAction, restaurantId });

    if (!restaurantId || !lat || !lng) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const url = `https://www.swiggy.com/dapi/menu/pl?page-type=${page_type}&complete-menu=${complete_menu}&lat=${lat}&lng=${lng}&submitAction=${submitAction}&restaurantId=${restaurantId}`;
    console.log('Fetching from URL:', url);

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/json",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": "https://www.swiggy.com/",
        "Origin": "https://www.swiggy.com"
      },
    });

    // Log response headers and status
    console.log('Response Status:', response.status);
    console.log('Response Headers:', Object.fromEntries(response.headers.entries()));

    // Check content type
    const contentType = response.headers.get('content-type');
    console.log('Content-Type:', contentType);

    // Get response text first
    const text = await response.text();
    console.log('Response Text Preview:', text.substring(0, 200));

    // Try parsing as JSON
    try {
      const data = JSON.parse(text);
      res.json(data);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      res.status(500).json({ 
        error: 'Invalid JSON response from Swiggy API',
        details: text.substring(0, 200),
        status: response.status
      });
    }
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
