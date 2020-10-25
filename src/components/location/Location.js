import React from "react";
import "./Location.css";

export default function Location(props) {
    const { ...locationsData } = props;

    return (
        <div className="location">
            <h1>{locationsData.name}</h1>
            <h2>{locationsData.address}</h2>
        </div>
    );
}