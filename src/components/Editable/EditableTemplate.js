import React, {useEffect, useState} from "react";

// Component accept text, placeholder values and also pass what type of Input - input, textarea so that we can use it for styling accordingly
const Editable = ({
                      childRef,
                      text,
                      type,
                      placeholder,
                      children,
                      ...props
                  }) => {

// Manage the state whether to show the label or the input box. By default, label will be shown
    const [isEditing, setEditing] = useState(false);

    useEffect(() => {
        if (childRef && childRef.current && isEditing === true) {
            childRef.current.focus();
        }
    }, [isEditing, childRef]);


// Event handler if we want to use text area (enter key to write on another line)
    const handleKeyDown = (event, type) => {

        const { key } = event;
        const keys = ["Escape", "Tab"];
        const enterKey = "Enter";
        const allKeys = [...keys, enterKey];

    };

    /*
    - It will display a label is `isEditing` is false
    - It will display the children (input or textarea) if `isEditing` is true
    - when input `onBlur`, we will set the default non edit mode
    */
    return (
        <section {...props}>
            {isEditing ? (
                <div
                    onBlur={() => setEditing(false)}
                    onKeyDown={e => handleKeyDown(e, type)}
                >
                    {children}
                </div>
            ) : (
                <div
                    onClick={() => setEditing(true)}
                >
          <span>
            {text || placeholder || "Editable content"}
          </span>
                </div>
            )}
        </section>
    );
};

export default Editable;