// const express = require("express");
// const cors = require("cors");
// const fetch = require("cross-fetch");

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(cors());

// // For Restaurant API
// app.get("/api/restaurants", async (req, res) => {
//   const { lat, lng, page_type } = req.query;
//   console.log(req.query);

//   const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=${page_type}`;

//   await fetch(url, {
//     headers: {
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Origin": "*",
//       "User-Agent":
//         "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
//     },
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//       res.json(data);
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).send("An error occurred");
//     });
// });

// // For Menu API
// app.get("/api/menu", async (req, res) => {
//   const {
//     "page-type": page_type,
//     "complete-menu": complete_menu,
//     lat,
//     lng,
//     submitAction,
//     restaurantId,
//   } = req.query;
//   console.log(req.query);

//   const url = `https://www.swiggy.com/dapi/menu/pl?page-type=${page_type}&complete-menu=${complete_menu}&lat=${lat}&lng=${lng}&submitAction=${submitAction}&restaurantId=${restaurantId}`;

//   await fetch(url, {
//     headers: {
//       "Content-Type": "application/json",
//       "Access-Control-Allow-Origin": "*",
//       "User-Agent":
//         "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
//     },
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//       res.json(data);
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).send("An error occurred");
//     });
// });

// app.get("/", (req, res) => {
//   res.json({
//     test: "Welcome to Tasty-Trip! - See Live Web URL for this Server - https://tasty-trip.netlify.app/",
//   });
// });

// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`);
// });

//............

// const express = require("express");
// const cors = require("cors");
// const fetch = require("node-fetch");

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors()); // Enable CORS for all routes

// // Endpoint to fetch restaurant list
// app.get("/api/restaurants", async (req, res) => {
//   const swiggyApiUrl =
//     "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.990088&lng=75.7531324&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

//   try {
//     const response = await fetch(swiggyApiUrl);
//     const data = await response.json();
//     res.json(data); // Send the data to the frontend
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching data from Swiggy API" });
//   }
// });

// // Endpoint to fetch menu for a specific restaurant
// app.get("/api/menu/:restaurantId", async (req, res) => {
//   const { restaurantId } = req.params;
//   const swiggyMenuApiUrl = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=18.990088&lng=75.7531324&restaurantId=${restaurantId}`;

//   try {
//     const response = await fetch(swiggyMenuApiUrl);
//     const data = await response.json();
//     res.json(data); // Send the data to the frontend
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching menu from Swiggy API" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

//.........
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS for all routes

// Endpoint to fetch restaurant list
app.get("/api/restaurants", async (req, res) => {
  const swiggyApiUrl =
    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.990088&lng=75.7531324&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

  try {
    const response = await fetch(swiggyApiUrl);
    const data = await response.json();
    res.json(data); // Send the data to the frontend
  } catch (error) {
    res.status(500).json({ error: "Error fetching data from Swiggy API" });
  }
});

// Endpoint to fetch menu for a specific restaurant
app.get("/api/menu/:restaurantId", async (req, res) => {
  const { restaurantId } = req.params;
  const swiggyMenuApiUrl = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=18.990088&lng=75.7531324&restaurantId=${restaurantId}`;

  try {
    const response = await fetch(swiggyMenuApiUrl);
    const data = await response.json();
    res.json(data); // Send the data to the frontend
  } catch (error) {
    res.status(500).json({ error: "Error fetching menu from Swiggy API" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
