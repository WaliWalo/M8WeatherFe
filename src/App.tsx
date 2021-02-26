import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import useCustomSelector from "./store/helpers/useCustomSelector";
// import { apiCall } from "./store/api";
// import { weatherCallBody } from "./store/weatherCallReducer";
import { Route } from "react-router-dom";
import Home from "./components/home/Home";
import SelectCity from "./components/selectCity/SelectCity";
import Search from "./components/search/Search";
import { addFav, fetchWeather, getCoordinates } from "./api/weatherApi";
import { ICities, IPosition, IWeather, IFav } from "./types";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouteComponentProps } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import Registration from "./components/login/Registration";
import Cookies from "js-cookie";
import { getUser } from "./api/authApi";

function App(props: RouteComponentProps) {
  // const dispatch = useDispatch();
  // const state = useCustomSelector((store) => store);
  // const handleRedux = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   dispatch(apiCall(weatherCallBody));
  // };
  const [weather, setWeather] = useState<IWeather | null>(null);
  const [position, setPosition] = useState<IPosition | null>(null);
  const [input, setInput] = useState("");
  const [cities, setCities] = useState<ICities | null>(null);
  const [background, setBackground] = useState<string>(
    `url("https://media.giphy.com/media/KzqJsfsd78wLe/giphy.gif")`
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ favourite: [] });

  useEffect(() => {
    getLocation();
    if (Cookies.get("loggedIn")) {
      handleIsLoggedIn();
      handleCities();
      fetchUser();
    }
  }, []);

  useEffect(() => {
    if (position) {
      getWeather("Current Location", position.lat, position.lng);
    }
  }, [position]);

  useEffect(() => {
    if (weather) {
      if (weather.current.weather[0].main === "Clear") {
        setBackground(
          `url("https://media.giphy.com/media/KzqJsfsd78wLe/giphy.gif")`
        );
      }
      if (weather.current.weather[0].main === "Clouds") {
        setBackground(
          `url("https://images-cdn.9gag.com/photo/awXXwg4_700b.jpg")`
        );
      }
      if (weather.current.weather[0].main === "Snow") {
        setBackground(
          `url("http://38.media.tumblr.com/3cee14c9daf7f3f8202298bdc11a00f8/tumblr_mqfly2Tevf1suxe4jo1_500.gif")`
        );
      }
    }
  }, [weather]);

  const fetchUser = async () => {
    const res = await getUser();
    if (res.ok) {
      const user = await res.json();
      if (user !== null) {
        setUser(user);
        // setCities(user.favourite);
        // console.log(cities);
        // user.favourite.forEach((fav: IFav) => {
        //   getWeather(fav.name, fav.lat, fav.long);
        // });
      }
    } else {
      console.log(res);
    }
  };

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function showPosition(position: GeolocationPosition) {
    setPosition({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  }

  function showError(error: GeolocationPositionError) {
    switch (error.code) {
      case 1:
        alert("User denied the request for Geolocation.");
        break;
      case 2:
        alert("Location information is unavailable.");
        break;
      case 3:
        alert("The request to get user location timed out.");
        break;
      default:
        alert("An unknown error occurred.");
        break;
    }
  }

  const getWeather = async (name: string, lat: number, lon: number) => {
    const res = await fetchWeather(lat, lon);
    if (res !== undefined) {
      if (res.ok) {
        const data = await res.json();
        setWeather({ ...data, name });
        await addFav(name, lat, lon);
        // if (cities === null) {
        //   const newData = { ...data, name: name };
        //   setCities({ cities: [newData] });
        // }
      } else {
        alert(`${res.status}: ${res.statusText}`);
      }
    }
  };
  useEffect(() => {
    // handleCities();
    if (
      cities &&
      user.favourite &&
      cities.cities.length !== user.favourite.length
    ) {
      handleCities();
    }
  }, [cities?.cities.length, user]);

  const handleCities = async () => {
    console.log(user);
    if (user) {
      user.favourite.forEach(async (fav: IFav) => {
        try {
          const res = await fetchWeather(fav.lat, fav.long);
          if (res !== undefined) {
            if (res.ok) {
              const data = await res.json();
              if (cities === null) {
                const newData = { ...data, name: fav.name };
                const newCities = { cities: [newData] };

                setCities(newCities);
              }

              if (cities && cities?.cities.length < user.favourite.length) {
                const newData = { ...data, name: fav.name };
                const newCities = { cities: cities.cities.concat(newData) };

                setCities(newCities);
              }
            }
          }
        } catch (error) {}
      });
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getLatLang();
    props.history.push("/");
  };

  const handleSelectCity = (city: IWeather) => {
    console.log(city);
    setWeather(city);
    props.history.push("/");
  };

  const getLatLang = async () => {
    const res = await getCoordinates(input);
    if (res !== undefined) {
      if (res.ok) {
        const data = await res.json();
        if (data.results.length > 0) {
          const lat = data.results[0].geometry.lat;
          const lang = data.results[0].geometry.lng;
          // await addFav(input, lat, lang);
          setPosition({ lat: lat, lng: lang });
          getWeather(input, lat, lang);
        } else {
          alert("No location found");
        }
      } else {
        alert(`${res.status}: ${res.statusText}`);
      }
    }
  };

  const handleIsLoggedIn = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div
      style={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: `${background}`,
        position: "relative",
        height: "140vh",
      }}
    >
      <Route
        path="/"
        exact
        render={(props) => (
          <Home
            routeProps={props}
            weather={weather}
            handleIsLoggedIn={handleIsLoggedIn}
            isLoggedIn={isLoggedIn}
          />
        )}
      />

      <Route
        path="/login"
        exact
        render={(props) => (
          <Login routeProps={props} handleIsLoggedIn={handleIsLoggedIn} />
        )}
      />

      <Route path="/register" exact render={(props) => <Registration />} />
      {user && cities && cities.cities.length > 0 && (
        <Route
          path="/select"
          exact
          render={(props) => (
            <SelectCity
              routeProps={props}
              cities={cities}
              handleSelectCity={(city: IWeather) => handleSelectCity(city)}
            />
          )}
        />
      )}

      <Route
        path="/search"
        exact
        render={(props) => (
          <Search
            handleOnChange={handleOnChange}
            input={input}
            handleSubmit={handleSubmit}
          />
        )}
      />
    </div>
  );
}

export default App;
