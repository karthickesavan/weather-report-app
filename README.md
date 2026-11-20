# Weatherly — Weather Report App

A responsive weather dashboard built with **React**, **Axios**, and the **OpenWeatherMap Current Weather API**. Search for a city to view its current temperature, conditions, humidity, wind speed, visibility, pressure, sunrise, and sunset.

## Features

- Search current weather by city name
- Temperature displayed in Celsius
- Weather condition and matching icon
- Feels-like temperature, humidity, wind speed, visibility, and pressure
- Daily minimum and maximum temperatures
- Sunrise and sunset times in the searched city's local time
- Loading, invalid-city, API-key, and network error states
- Responsive layout for mobile, tablet, and desktop

## Built with

- React 18 (Create React App)
- Axios
- OpenWeatherMap API
- CSS Grid, Flexbox, and media queries
- Lucide React icons

## Run locally

### 1. Requirements

Install [Node.js](https://nodejs.org/) (LTS recommended) and npm.

### 2. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/weather-report-app.git
cd weather-report-app
```

### 3. Install dependencies

```bash
npm install
```

### 4. Get an API key

1. Create an account at [OpenWeatherMap](https://openweathermap.org/api).
2. Generate an API key for the **Current Weather Data** API.
3. Copy `.env.example` to a new file named `.env` in the project root.
4. Add your key:

```env
REACT_APP_OPENWEATHER_API_KEY=your_actual_api_key
```

Do not add quotation marks around the key. Restart the development server after changing `.env`.

### 5. Start the app

```bash
npm start
```

Open http://localhost:3000.

### 6. Create a production build

```bash
npm run build
```

The optimized production files are generated in the `build` folder.

## Push to GitHub

Create an empty repository on GitHub, then run:

```bash
git init
git add .
git commit -m "Build responsive weather report app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/weather-report-app.git
git push -u origin main
```

**Important:** `.env` is excluded by `.gitignore`. Never commit your actual API key.

## Deploying

You can deploy the `build` folder to a static hosting service such as Netlify or Vercel. Add `REACT_APP_OPENWEATHER_API_KEY` in the hosting provider's environment-variable settings and rebuild.

**API key security note:** A React app running in the browser cannot keep an API key secret. Environment variables prefixed with `REACT_APP_` are embedded into the browser bundle at build time. For a public production deployment, use a small backend/serverless proxy to keep the provider key on the server, and apply usage limits. Do not assume a `.env` variable is secret after deployment.

## API endpoint

```text
https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric
```

The city value is URL-encoded with `encodeURIComponent`, and Axios handles the GET request.

## Project structure

```text
weather-report-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── Weather.js
│   ├── App.js
│   ├── App.css
│   ├── index.css
│   └── index.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Notes

- OpenWeatherMap API keys may take some time to activate after creation.
- API usage limits and availability depend on your OpenWeatherMap plan.
- Create React App is used here to match the project brief. For a new production application, consider a currently maintained React build tool such as Vite.
