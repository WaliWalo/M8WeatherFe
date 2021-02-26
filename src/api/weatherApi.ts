export async function fetchWeather(lat: number, lon: number) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_URL}?units=metric&lat=${lat}&lon=${lon}&exclude=minutely&appid=${process.env.REACT_APP_API_KEY}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getCoordinates(location: string) {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_COORD_URL}?q=${location}&key=${process.env.REACT_APP_COORD_URL_KEY}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}
