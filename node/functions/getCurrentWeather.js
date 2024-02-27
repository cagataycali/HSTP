// Example function. Replace with your own function.
module.exports = function getCurrentWeather(location, unit = "fahrenheit") {
    if (location.toLowerCase().includes("tokyo")) {
        return JSON.stringify({ location: "Tokyo", temperature: "10", unit: "celsius" });
    } else if (location.toLowerCase().includes("san francisco")) {
        return JSON.stringify({ location: "San Francisco", temperature: "72", unit: "fahrenheit" });
    } else if (location.toLowerCase().includes("paris")) {
        return JSON.stringify({ location: "Paris", temperature: "22", unit: "fahrenheit" });
    } else {
        return JSON.stringify({ location, temperature: "unknown" });
    }
}