export interface WeatherData {
  location: string
  temperature: number
  description: string
  weatherType: "sunny" | "cloudy" | "rainy" | "unknown"
  icon: string
  humidity: number
  windSpeed: number
  forecast: ForecastItem[]
}

export interface ForecastItem {
  dateTime: string
  temperature: number
  description: string
  weatherType: "sunny" | "cloudy" | "rainy" | "unknown"
  icon: string
  humidity: number
  windSpeed: number
}

// Map OpenWeatherMap weather conditions to our simplified types
function mapWeatherType(description: string, id: number): "sunny" | "cloudy" | "rainy" | "unknown" {
  // Using the weather condition codes from OpenWeatherMap
  // https://openweathermap.org/weather-conditions

  if (id >= 200 && id < 600) {
    return "rainy" // Thunderstorm, Drizzle, Rain
  } else if (id >= 600 && id < 700) {
    return "rainy" // Snow (treating as rainy for sport recommendations)
  } else if (id >= 700 && id < 800) {
    return "cloudy" // Atmosphere (mist, fog, etc.)
  } else if (id === 800) {
    return "sunny" // Clear sky
  } else if (id > 800) {
    return "cloudy" // Clouds
  }

  return "unknown"
}

// At the top of the file
const apiKey = 'cda8c178a08b5f2dd18d4d86f62b4286';

export async function getWeatherData(location?: string): Promise<WeatherData> {
  try {
    let lat: number;
    let lon: number;
    
    if (!location) {
      // Default to Chennai coordinates
      lat = 13.0827;
      lon = 80.2707;
    } else {
      // Use provided location name
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=1&appid=${apiKey}`
      );

      if (!geoResponse.ok) {
        throw new Error(`Geocoding API responded with status: ${geoResponse.status}`);
      }

      const geoData = await geoResponse.json();
      if (!geoData || geoData.length === 0) {
        throw new Error("Location not found");
      }

      lat = geoData[0].lat;
      lon = geoData[0].lon;
    }

    // Get current weather
    const currentWeatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );

    if (!currentWeatherResponse.ok) {
      throw new Error(`Weather API responded with status: ${currentWeatherResponse.status}`);
    }

    const currentWeatherData = await currentWeatherResponse.json();

    // Get forecast data
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );

    if (!forecastResponse.ok) {
      throw new Error(`Forecast API responded with status: ${forecastResponse.status}`);
    }

    const forecastData = await forecastResponse.json();

    // Process current weather
    const weatherId = currentWeatherData.weather[0]?.id;
    const description = currentWeatherData.weather[0]?.description || "Unknown";
    const weatherType = mapWeatherType(description, weatherId);

    // Process forecast data (next 5 days, every 3 hours)
    const forecast = forecastData.list.slice(0, 8).map((item) => {
      const forecastWeatherId = item.weather[0]?.id;
      const forecastDescription = item.weather[0]?.description || "Unknown";

      return {
        dateTime: item.dt_txt,
        temperature: item.main.temp,
        description: forecastDescription,
        weatherType: mapWeatherType(forecastDescription, forecastWeatherId),
        icon: item.weather[0]?.icon || "01d",
        humidity: item.main.humidity,
        windSpeed: item.wind.speed,
      };
    });

    return {
      location: currentWeatherData.name,
      temperature: currentWeatherData.main.temp,
      description: description,
      weatherType: weatherType,
      icon: currentWeatherData.weather[0]?.icon || "01d",
      humidity: currentWeatherData.main.humidity,
      windSpeed: currentWeatherData.wind.speed,
      forecast: forecast,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return {
      location: location || "Unknown",
      temperature: 22,
      description: "Weather data unavailable",
      weatherType: "sunny",
      icon: "01d",
      humidity: 60,
      windSpeed: 5,
      forecast: [],
    };
  }
}

// AI-like function to analyze weather and provide recommendations
export function getWeatherRecommendations(weatherData: WeatherData): {
  bestTimeToPlay: string
  recommendation: string
  sportsRecommendation: string[]
} {
  // Default recommendations
  let bestTimeToPlay = "today"
  let recommendation = "The weather looks good for outdoor activities."
  let sportsRecommendation = ["Football", "Cricket", "Basketball", "Tennis"]

  // Current weather analysis
  const currentTemp = weatherData.temperature
  const currentWeatherType = weatherData.weatherType
  const currentWindSpeed = weatherData.windSpeed

  // Analyze forecast to find best time
  if (weatherData.forecast && weatherData.forecast.length > 0) {
    // Find periods with good weather (sunny or cloudy with moderate temperature)
    const goodWeatherPeriods = weatherData.forecast.filter(
      (item) =>
        (item.weatherType === "sunny" || item.weatherType === "cloudy") &&
        item.temperature >= 15 &&
        item.temperature <= 30 &&
        item.windSpeed < 10,
    )

    if (goodWeatherPeriods.length > 0) {
      // Get the first good weather period
      const bestPeriod = goodWeatherPeriods[0]
      const date = new Date(bestPeriod.dateTime)
      const timeString = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      const dayString = date.toLocaleDateString([], { weekday: "long" })

      bestTimeToPlay = `${dayString} at around ${timeString}`
      recommendation = `The weather looks best for outdoor activities on ${bestTimeToPlay}.`
    }
  }

  // Current weather recommendations
  if (currentWeatherType === "sunny") {
    if (currentTemp > 30) {
      recommendation = "It's quite hot right now. Consider playing in the evening or in shaded areas."
      sportsRecommendation = ["Evening Football", "Basketball (indoor courts)", "Swimming", "Tennis (evening)"]
    } else if (currentTemp < 15) {
      recommendation = "It's sunny but cool. Great for active sports that keep you warm."
      sportsRecommendation = ["Football", "Rugby", "Basketball", "Running"]
    } else {
      recommendation = "Perfect weather for outdoor sports! Enjoy the sunshine."
      sportsRecommendation = ["Cricket", "Football", "Tennis", "Basketball"]
    }
  } else if (currentWeatherType === "cloudy") {
    recommendation = "Cloudy conditions are good for most outdoor activities without the heat of direct sun."
    sportsRecommendation = ["Football", "Cricket", "Rugby", "Tennis"]
  } else if (currentWeatherType === "rainy") {
    recommendation = "It's rainy today. Consider indoor activities or wait for a better time."
    sportsRecommendation = ["Indoor Basketball", "Badminton", "Table Tennis", "Squash"]
  }

  // Wind considerations
  if (currentWindSpeed > 15) {
    recommendation += " High winds may affect some sports like badminton or tennis."
    // Adjust recommendations for windy conditions
    sportsRecommendation = sportsRecommendation.filter(
      (sport) => !["Badminton", "Tennis", "Table Tennis"].includes(sport),
    )
    sportsRecommendation.push("Football", "Rugby")
  }

  return {
    bestTimeToPlay,
    recommendation,
    sportsRecommendation: [...new Set(sportsRecommendation)].slice(0, 4), // Remove duplicates and limit to 4
  }
}

const getCurrentPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error),
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    }
  });
};

// Remove the duplicate getWeatherData declaration that was here
