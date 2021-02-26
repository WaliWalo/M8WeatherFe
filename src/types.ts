import { RouteComponentProps } from "react-router-dom";

export interface IPosition {
  lat: number;
  lng: number;
}

export interface IHomeProps {
  routeProps: RouteComponentProps;
  weather: IWeather | null;
}

export interface ISelectCityProps {
  routeProps: RouteComponentProps;
  cities: ICities | null;
  handleSelectCity: (city: IWeather) => void;
}

export interface ISearchProps {
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  input: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export interface ICities {
  cities: Array<IWeather>;
}

// type weather = object;

export interface IMainProps {
  weather: IWeather | null;
}

export interface IForecastDaysProps {
  weather: IWeather | null;
}

export interface IForecastTimeProps {
  weather: IWeather | null;
}

export interface ICurrentDetailsProps {
  weather: IWeather | null;
}

export interface IWeather {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: Current;
  hourly: Current[];
  daily: Daily[];
  name: string;
}

export interface Current {
  dt: number;
  sunrise?: number;
  sunset?: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: Weather[];
  pop?: number;
}

export interface Weather {
  id: number;
  main: Main;
  description: Description;
  icon: Icon;
}

export enum Description {
  BrokenClouds = "broken clouds",
  ClearSky = "clear sky",
  FewClouds = "few clouds",
  LightSnow = "light snow",
  OvercastClouds = "overcast clouds",
  ScatteredClouds = "scattered clouds",
  Snow = "snow",
}

export enum Icon {
  The01N = "01n",
  The02N = "02n",
  The03D = "03d",
  The03N = "03n",
  The04D = "04d",
  The04N = "04n",
  The13D = "13d",
}

export enum Main {
  Clear = "Clear",
  Clouds = "Clouds",
  Snow = "Snow",
}

export interface Daily {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: Temp;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  weather: Weather[];
  clouds: number;
  pop: number;
  uvi: number;
  snow?: number;
}

export interface FeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface Temp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}
