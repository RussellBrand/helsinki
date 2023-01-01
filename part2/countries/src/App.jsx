import { useState, useEffect } from "react";
import axios from "axios";

const MAX_COUNTRIES = 10;
const COUNTRIES_URL = "https://restcountries.com/v3.1";

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
          console.log("promise fulfilled");
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
        {countries.map((c) => {
          const commonName = c?.name?.common;
          return <div key={commonName}> {commonName}</div>;
        })}
      </div>
    );
  }
  return <PrettyCountry country={countries[0]} />;
};

const PrettyCountry = (props) => {
  const { country } = props;
  const { capital, area, languages, flag } = country;

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
    </div>
  );
};
