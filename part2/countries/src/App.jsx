import { useState, useEffect } from "react";
import axios from "axios";

const MAX_COUNTRIES = 10;
const COUNTRIES_URL = "https://restcountries.com/v3.1";

// const API_KEY = process.env.REACT_APP_API_KEY;

const App = () => {
  const [searchString, setSearchString] = useState("");
  const [countries, setCountries] = useState([]);

  function searchStringChangeFunction(event) {
    const trimmed = event.target.value.trim();
    setSearchString(trimmed);
    if (trimmed === "") {
      setCountries([]);
    } else {
      axios
        .get(`${COUNTRIES_URL}/name/${trimmed}`)
        .then((response) => {
          console.log("COUNTRY promise fulfilled");
          setCountries(response.data);
        })
        .catch((error) => {
          console.log({ error });
          setCountries([]);
        });
    }
  }
  return (
    <div>
      <Prompt />
      <InputBox onChange={searchStringChangeFunction} />
      <br />
      <Feedback countries={countries} searchString={searchString} />
    </div>
  );
};

export default App;

const Prompt = () => {
  return "Find Countries:";
};

const InputBox = (props) => {
  const { onChange } = props;
  return <input onChange={onChange} />;
};

const Feedback = (props) => {
  const { countries, searchString } = props;
  const trimmedSearchString = searchString;
  const countryCount = countries.length;
  if (trimmedSearchString === "") {
    return <i>awaiting input</i>;
  }
  if (countryCount === 0) {
    return <i>no matching countries</i>;
  }
  if (countryCount > MAX_COUNTRIES) {
    return `${countryCount} is too many countries, specify another filter`;
  }
  if (countryCount > 1) {
    return (
      <div>
        {countries.map((country) => {
          const commonName = country?.name?.common;
          return <ACountry key={commonName} country={country} />;
        })}
      </div>
    );
  }
  return <PrettyCountry includeWeather={true} country={countries[0]} />;
};

const ACountry = (props) => {
  const { country } = props;
  const [showing, setShowing] = useState(false);

  function toggleShowing() {
    setShowing((xx) => {
      return !xx;
    });
  }

  // console.log(props);
  const commonName = country?.name?.common;
  return (
    <div>
      {commonName}
      <button onClick={toggleShowing}>{showing ? "hide" : "show"}</button>
      {showing ? (
        <>
          <PrettyCountry country={country} /> <br /> <br />
        </>
      ) : (
        ""
      )}
    </div>
  );
};

const PrettyCountry = (props) => {
  const { country } = props;
  const { includeWeather } = props;
  const { capital, area, languages, flag, capitalInfo } = country;

  return (
    <div>
      <h1>{country.name.common}</h1>

      <p>
        capital {capital} <br />
        area {area}
      </p>
      <h2>Languages</h2>
      <ul>
        {Object.values(languages).map((lan) => {
          return <li id={lan}>{lan} </li>;
        })}
      </ul>
      <h2> Flag </h2>
      <span style={{ fontSize: "200px" }}>{flag}</span>
      {includeWeather ? (
        <Weather capital={capital} capitalInfo={capitalInfo} />
      ) : (
        ""
      )}
    </div>
  );
};

const Weather = (prop) => {
  const [weather, setWeather] = useState({});
  const { capital, capitalInfo } = prop;

  const { latlng } = capitalInfo;
  const [lat, lon] = latlng;

  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

  console.log({ weatherUrl });

  useEffect(() => {
    axios
      .get(weatherUrl)
      .then((response) => {
        console.log("WEATHER promise fulfilled");
        setWeather(response.data);
      })
      .catch((error) => {
        console.log({ error });
        setWeather({});
      });
  }, [weatherUrl]);

  return (
    <div>
      <h1>Weather in {capital}</h1>
      <p>Temperature: {weather?.current_weather?.temperature} C </p>
      <p>Wind: {weather?.current_weather?.windspeed} km/s </p>
    </div>
  );
};
