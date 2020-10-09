import React from "react";
import "./Location.css";

export default function Location(props) {
    const { name, address } = props;

    return (
        <div className="location">
            <h2>{name}</h2>
            <div>{address}</div>
        </div>
    );
}