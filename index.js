const axios = require('axios');
const readline = require('readline');

// Function to get location from IP address
async function getLocationFromIp(ipAddress, apiKey) {
  const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ipAddress}`;
  try {
    const response = await axios.get(url);
    return {
      "IP Address": response.data.ip,
      "Continent": response.data.continent_name,
      "Country": response.data.country_name,
      "State/Province": response.data.state_prov,
      "City": response.data.city,
      "ZIP Code": response.data.zipcode,
      "Latitude": response.data.latitude,
      "Longitude": response.data.longitude,
      "ISP": response.data.isp,
    };
  } catch (error) {
    console.error("Error fetching location:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
    }
    return { "Error": "Unable to fetch location" };
  }
}

// Function to prompt the user for input
function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans);
  }));
}

// Main function
async function main() {
  const apiKey = '36e2029128194b30bfbbdb4a0b7fe503';  
  const ipAddress = await askQuestion('Enter an IP address: ');
  const location = await getLocationFromIp(ipAddress, apiKey);
  for (const [key, value] of Object.entries(location)) {
    console.log(`${key}: ${value}`);
  }
}

main();
