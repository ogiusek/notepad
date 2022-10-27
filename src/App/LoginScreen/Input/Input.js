import React from "react";
import style from "./Input.module.css";

import WrongInput from "./WrongInput/WrongInput";

function Input(props) {
    return (
        <div className={style.input + ' ' + (!props.focus && (props.valid !== true) && style.wrongInput)}>
            <label>{props.password ? "Password" : "Login"}</label>
            <input type={props.password ? 'password' : 'text'}
                onInput={props.handler}
                onFocusCapture={(event) => {
                    props.dispach({ action: event['_reactName'] });
                }}
                onBlurCapture={(event) => {
                    props.dispach({ action: event['_reactName'] });
                }}
                value={props.value}
                placeholder={props.password ? "password" : "Login"}
                required />
            <div className={props.login ? style.error : style.errorRegister}>{!props.focus && (props.valid !== true) && <WrongInput text={props.valid} />}</div>
        </div>
    );
}

export default Input;