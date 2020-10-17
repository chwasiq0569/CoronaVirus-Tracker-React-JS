import React, { useState } from "react";
import { L, Map, Marker, Popup, TileLayer } from "react-leaflet";
import { plottingDataOnMap } from "../../util/util";
import "./map.scss";
const PlottedMap = ({
  mapCountries,
  mapCenter,
  mapZoom,
  casesStateCountry,
}) => {
  return (
    <Map center={mapCenter} zoom={mapZoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {plottingDataOnMap(mapCountries, casesStateCountry)}
    </Map>
  );
};

export default PlottedMap;
