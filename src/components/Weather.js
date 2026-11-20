import { useEffect, useState } from "react";
import axios from "axios";
import {
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Sun,
  CloudFog,
  CloudDrizzle,
  RefreshCw,
  AlertCircle,
  MapPin
} from "lucide-react";

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

const weatherIcons = {
  Clear: Sun,
  Clouds: Cloud,
  Rain: CloudRain,
  Drizzle: CloudDrizzle,
  Thunderstorm: CloudLightning,
  Snow: CloudSnow,
  Mist: CloudFog,
  Smoke: CloudFog,
  Haze: CloudFog,
  Fog: CloudFog,
  Dust: CloudFog,
  Sand: CloudFog,
  Ash: CloudFog,
  Squall: Cloud,
  Tornado: CloudLightning,
};

const formatTime = (unixTime, timezoneOffset) => {
  if (!unixTime) return "--:--";
  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  }).format(new Date((unixTime + timezoneOffset) * 1000));
};

function Weather({ city, icons }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      if (!API_KEY) {
        setWeather(null);
        setError("API key missing. Add your OpenWeatherMap key to the .env file, then restart the app.");
        return;
      }

      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `${API_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
        );
        setWeather(response.data);
        setUpdatedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      } catch (err) {
        setWeather(null);
        if (err.response?.status === 404) {
          setError(`We couldn't find "${city}". Check the spelling and try again.`);
        } else if (err.response?.status === 401) {
          setError("The API key was rejected. Check that your OpenWeatherMap key is active and correct.");
        } else {
          setError("Weather data couldn't be loaded. Check your connection and try again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (loading) {
    return <section className="weather-panel status-panel" aria-live="polite">
      <RefreshCw className="spin" size={26} />
      <p>Fetching the latest weather for {city}…</p>
    </section>;
  }

  if (error) {
    return <section className="weather-panel status-panel error-panel" role="alert">
      <AlertCircle size={27} />
      <h2>Weather unavailable</h2>
      <p>{error}</p>
      {!API_KEY && <p className="hint">Create a free key at <a href="https://openweathermap.org/api" target="_blank" rel="noreferrer">OpenWeatherMap</a>.</p>}
    </section>;
  }

  if (!weather) return null;

  const condition = weather.weather?.[0]?.main || "Clouds";
  const WeatherIcon = weatherIcons[condition] || Cloud;
  const { Wind, Droplets, Thermometer, Eye, Gauge, Sunrise, Sunset } = icons;
  const timezone = weather.timezone || 0;

  const details = [
    { label: "Feels like", value: `${Math.round(weather.main.feels_like)}°`, note: "Perceived temperature", Icon: Thermometer },
    { label: "Humidity", value: `${weather.main.humidity}%`, note: "Relative humidity", Icon: Droplets },
    { label: "Wind speed", value: `${weather.wind.speed} m/s`, note: "At ground level", Icon: Wind },
    { label: "Visibility", value: `${(weather.visibility / 1000).toFixed(1)} km`, note: "Horizontal visibility", Icon: Eye },
    { label: "Pressure", value: `${weather.main.pressure} hPa`, note: "Atmospheric pressure", Icon: Gauge },
    { label: "Min / Max", value: `${Math.round(weather.main.temp_min)}° / ${Math.round(weather.main.temp_max)}°`, note: "Today's temperature range", Icon: Thermometer },
  ];

  return (
    <section className="weather-content" aria-live="polite">
      <div className="weather-panel current-panel">
        <div className="current-topline">
          <div>
            <div className="location-label"><MapPin size={14} /> CURRENT WEATHER</div>
            <h2>{weather.name}<span className="country">, {weather.sys.country}</span></h2>
            <p className="weather-description">{weather.weather?.[0]?.description}</p>
          </div>
          <div className="weather-symbol"><WeatherIcon size={62} strokeWidth={1.4} /></div>
        </div>
        <div className="temperature-row">
          <div className="temperature">{Math.round(weather.main.temp)}<span>°C</span></div>
          <div className="temperature-caption">
            <strong>{condition}</strong>
            <span>Feels like {Math.round(weather.main.feels_like)}°C</span>
          </div>
        </div>
        <div className="sun-times">
          <div><Sunrise size={17} /><span>Sunrise</span><strong>{formatTime(weather.sys.sunrise, timezone)}</strong></div>
          <div><Sunset size={17} /><span>Sunset</span><strong>{formatTime(weather.sys.sunset, timezone)}</strong></div>
        </div>
      </div>

      <div className="details-heading">
        <div><span className="section-kicker">THE DETAILS</span><h3>Weather conditions</h3></div>
        <span className="updated-label">Updated {updatedAt}</span>
      </div>
      <div className="details-grid">
        {details.map(({ label, value, note, Icon }) => (
          <article className="detail-card" key={label}>
            <div className="detail-icon"><Icon size={19} /></div>
            <span className="detail-label">{label}</span>
            <strong className="detail-value">{value}</strong>
            <span className="detail-note">{note}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Weather;