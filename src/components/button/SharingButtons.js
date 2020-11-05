import React from "react";
import {FacebookShareButton, FacebookIcon} from "react-share";

export default function SocialMediaButtons(props) {
    return (
        <FacebookShareButton
            url={props.url}>
            <FacebookIcon size={36} />
        </FacebookShareButton>);
}