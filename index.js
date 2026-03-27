import express from "express";
import morgan from "morgan";
import axios from "axios";

const app = express();
const port = 3000;

// Middleware
app.use(morgan("combined"));
app.use(express.urlencoded({ extended: true }));

// Home route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to My Server</h1><a href='/weather'>Go to Weather App</a>");
});

// Weather Page (Form)
app.get("/weather", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Weather App</title>
        <style>
          body {
            font-family: Arial;
            background: linear-gradient(to right, #4facfe, #00f2fe);
            color: white;
            text-align: center;
            padding-top: 100px;
          }
          input, button {
            padding: 10px;
            margin: 10px;
            border-radius: 5px;
            border: none;
          }
          button {
            background-color: #333;
            color: white;
            cursor: pointer;
          }
        </style>
      </head>
      <body>
        <h1>🌦 Weather App</h1>

        <form action="/weather" method="POST">
          <input type="text" name="city" placeholder="Enter City" required />
          <br>
          <button type="submit">Get Weather</button>
        </form>
      </body>
    </html>
  `);
});

// Weather Result (API call)
app.post("/weather", async (req, res) => {
  const city = req.body.city;

  try {
    const apiKey = "255bb555531b2034ca94f04358e22fba";

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = response.data;

    const temp = data.main.temp;
    const desc = data.weather[0].description;
    const humidity = data.main.humidity;
    const wind = data.wind.speed;

    res.send(`
      <html>
        <head>
          <title>Weather Result</title>
          <style>
            body {
              font-family: Arial;
              background: linear-gradient(to right, #43cea2, #185a9d);
              color: white;
              text-align: center;
              padding-top: 100px;
            }
            .card {
              background: rgba(255,255,255,0.2);
              padding: 20px;
              border-radius: 10px;
              display: inline-block;
            }
            a {
              color: white;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>🌍 Weather in ${city}</h1>
            <h2>🌡 ${temp}°C</h2>
            <p>☁ ${desc}</p>
            <p>💧 Humidity: ${humidity}%</p>
            <p>💨 Wind: ${wind} m/s</p>
            <br>
            <a href="/weather">🔙 Search Again</a>
          </div>
        </body>
      </html>
    `);
  } catch (error) {
    res.send(`
      <h1>❌ Error</h1>
      <p>City not found or API issue</p>
      <a href="/weather">Go Back</a>
    `);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});