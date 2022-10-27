import React from "react";
import style from "./WrongInput.module.css";

function ErrorWindow(props) {
    return (
        <div className={style.wraper}>
            <p>{props.text.split('\n')[0]}</p>
        </div>
    );
}

export default ErrorWindow;