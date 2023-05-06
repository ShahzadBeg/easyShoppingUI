import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  createAddress,
  getCities,
  getStates,
  getallCountries,
} from "../features/slices/AddressSlice";
import { useSelector } from "react-redux";

const Address = () => {
  const dispatch = useDispatch();
  const add = useSelector((state) => state.address);
  const [countryId, setConutryId] = useState(0);
  const [stateId, setStateId] = useState(0);
  const [cityId, setCityId] = useState(0);
  const [error, setError] = useState("");

  const initialState = {
    countryId: "",
    stateId: "",
    cityId: "",
    streetAddress: "",
    zipCode: "",
  };
  const [address, setAdress] = useState(initialState);

  const handleStateChange = (e) => {
    setError("");
    if (e.target.value > 0) {
      setStateId(e.target.value);
      dispatch(getCities(e.target.value));
    }
  };
  const handledCountryChange = (e) => {
    setError("");
    if (e.target.value > 0) {
      setConutryId(e.target.value);
      dispatch(getStates(e.target.value));
    }
  };
  const handledSubmit = (e) => {
    e.preventDefault();
    if (countryId < 1) {
      setError("select country");
      return;
    }
    if (stateId < 1) {
      setError("select state");
      return;
    }
    if (cityId < 1) {
      setError("select city");
      return;
    }
    if (!address.zipCode || !address.streetAddress) {
      setError("Enter zipCode and streetAddress");
      return;
    }
    setError("");
    address.countryId = countryId;
    address.stateId = stateId;
    address.cityId = cityId;
    dispatch(createAddress(address));
  };

  useEffect(() => {
    dispatch(getallCountries());
  }, [dispatch]);

  return (
    <StyledForm onSubmit={handledSubmit}>
      <h3>Shipping Address</h3>
      {error ? <span color="red">{error}</span> : ""}
      <select name="countries" onChange={(e) => handledCountryChange(e)}>
        {add.countryLoading ? (
          <option value="">Loading...</option>
        ) : (
          <>
            <option value="-1">---Select Country---</option>
            {add.countries.map((country, index) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </>
        )}

        {add.countries.map((country) => (
          <option key={country.id} value={country.id}>
            {country.name}
          </option>
        ))}
      </select>
      <select name="state" onChange={(e) => handleStateChange(e)}>
        {add.stateLoading ? (
          <option value="-1">Loading....</option>
        ) : (
          <>
            <option value="-1">---Select State---</option>
            {add.states.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </>
        )}
      </select>
      <select name="cities" onChange={(e) => setCityId(e.target.value)}>
        {add.cityLoading ? (
          <option value="-1">Loading....</option>
        ) : (
          <>
            <option value="-1">...Select City....</option>
            {add.cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </>
        )}
      </select>
      <input
        type="text"
        placeholder="Enter street address"
        value={address.streetAddress}
        onChange={(e) =>
          setAdress({ ...address, streetAddress: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Enter Zip code"
        value={address.zipCode}
        onChange={(e) => setAdress({ ...address, zipCode: e.target.value })}
      />
      <button type="submit" disabled={add.createAddressLoading ? true : false}>
        {add.createAddressLoading ? "Submitting..." : "Submit"}
      </button>
    </StyledForm>
  );
};

export default Address;

export const StyledForm = styled.form`
  max-width: 350px;
  width: 100%;
  margin: 2rem auto;

  h2 {
    margin-bottom: 1rem;
  }

  button,
  input,
  select {
    height: 35px;
    width: 100%;
    padding: 7px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(220, 220, 220);
    margin-bottom: 1rem;

    &:focus {
      border: 1px solid rgb(0, 208, 255);
    }
  }

  button {
    cursor: pointer;

    &:focus {
      border: none;
    }
  }

  p {
    font-size: 14px;
    color: red;
  }
`;
