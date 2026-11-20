import { useState } from "react";
import { CloudSun, MapPin, Search, Github, Wind, Droplets, Thermometer, Eye, Gauge, Sunrise, Sunset } from "lucide-react";
import Weather from "./components/Weather";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [searchCity, setSearchCity] = useState("Chennai");

  const handleSearch = (event) => {
    event.preventDefault();
    const trimmedCity = city.trim();
    if (trimmedCity) {
      setSearchCity(trimmedCity);
      setCity("");
    }
  };

  return (
    <main className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar">
        <a className="brand" href="/" aria-label="Weatherly home">
          <span className="brand-mark"><CloudSun size={23} /></span>
          <span>weatherly<span className="brand-dot">.</span></span>
        </a>
        <a className="github-link" href="https://github.com/" target="_blank" rel="noreferrer">
          <Github size={17} /> <span>GitHub project</span>
        </a>
      </header>

      <section className="hero">
        <div className="eyebrow"><span className="live-dot" /> LIVE WEATHER DASHBOARD</div>
        <h1>Weather, at a <span>glance.</span></h1>
        <p className="hero-copy">A little sunshine, a little data. Get current weather conditions for any city around the world.</p>

        <form className="search-form" onSubmit={handleSearch}>
          <MapPin className="search-pin" size={19} />
          <input
            aria-label="City name"
            type="text"
            placeholder="Search a city — e.g. Chennai"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
          <button type="submit" aria-label="Search weather" disabled={!city.trim()}>
            <Search size={18} /><span>Search</span>
          </button>
        </form>

        <Weather
          city={searchCity}
          icons={{ Wind, Droplets, Thermometer, Eye, Gauge, Sunrise, Sunset }}
        />
      </section>

      <footer className="footer">
        <span>Made with React & Axios</span>
        <span className="footer-separator">•</span>
        <span>Weather data by OpenWeatherMap</span>
      </footer>
    </main>
  );
}

export default App;