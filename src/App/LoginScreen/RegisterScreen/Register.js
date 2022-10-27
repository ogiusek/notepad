import React, { useReducer } from "react";
import style from "../MainLogin.module.css";
import reducer from "../reducer";

import Input from "../Input/Input";

function Register(props) {
    const [login, dispachLogin] = useReducer(reducer, { value: '', valid: 'Input is empty', focus: true, type: 'login' });
    const [password, dispachPassword] = useReducer(reducer, { value: '', valid: 'Input is empty', focus: true, type: 'password' });
    const [confirmPassword, dispachConfirmPassword] = useReducer(reducer, { value: '', valid: 'Input is empty', focus: true, type: 'confirmPassword' });
    const loginHanler = (event) => {
        dispachLogin({ action: 'setVal', value: event.target.value });
    };
    const passwordHandler = (event) => {
        dispachPassword({ action: 'setVal', value: event.target.value });
    };
    const confirmPasswordHandler = (event) => {
        dispachConfirmPassword({ action: 'setVal', value: event.target.value, sec: password.value });
    };
    const submitHandler = (event) => {
        event.preventDefault();
        props.setLogin(login.value, password.value);
    }
    const valid = login.valid === true && password.valid === true && confirmPassword.valid === true;
    return (
        <form onSubmit={submitHandler}>
            <main className={style.form}>
                <div className={style.inputs + ' ' + style.inputsRegister}>
                    <Input value={login.value}
                        valid={login.valid}
                        focus={login.focus}
                        handler={loginHanler}
                        dispach={dispachLogin} />
                    <Input value={password.value}
                        valid={password.valid}
                        focus={password.focus}
                        handler={passwordHandler}
                        dispach={dispachPassword}
                        password={true} />
                    <Input value={confirmPassword.value}
                        valid={confirmPassword.valid}
                        focus={confirmPassword.focus}
                        handler={confirmPasswordHandler}
                        dispach={dispachConfirmPassword}
                        password={true} />
                </div>
                <button type="submit" className={style.button + ' ' + (valid && style.confirm)} disabled={!valid}>Register</button>
            </main>
        </form>
    );
}

export default Register;