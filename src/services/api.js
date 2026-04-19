export const fetchCountries = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all?fields=name,capital,population,flags,region,subregion,languages,currencies,latlng,cca3");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.map(country => ({
      id: country.cca3,
      name: country.name.common,
      capital: country.capital?.[0] || 'Unknown',
      population: country.population,
      region: country.region,
      subregion: country.subregion || 'Unknown',
      languages: country.languages || null,
      currencies: country.currencies || null,
      flag: country.flags.svg,
      lat: country.latlng[0],
      lng: country.latlng[1]
    })).filter(c => c.lat !== undefined && c.lng !== undefined);
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};
