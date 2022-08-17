import React from "react";

export const Commit = ({author, date, message}) => {
    return (
        <div className="commit">
            <h3>{message}</h3>
            <p>{date} by <b>{author}</b></p>
        </div>
    );
};