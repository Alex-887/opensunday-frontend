import React from "react";
import "./Location.css";

export default function Location(props) {
    const { ...locationsData } = props;

    return (
        <div className="location">
            <h2>{locationsData.name}</h2>
            <div>{locationsData.address}</div>
        </div>
    );
}