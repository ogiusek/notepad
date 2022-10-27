import React, { useReducer } from "react";
// import ReactDOM from "react-dom";
import style from "../MainLogin.module.css";
import reducer from "../reducer";

import Input from "../Input/Input";

function Login(props) {
    const [login, dispachLogin] = useReducer(reducer, { value: '', valid: 'Input is empty', focus: true, type: 'login' });
    const [password, dispachPassword] = useReducer(reducer, { value: '', valid: 'Input is empty', focus: true, type: 'password' });

    const loginHanler = (event) => {
        dispachLogin({
            action: 'setVal',
            value: event.target.value
        });
    };
    const passwordHandler = (event) => {
        dispachPassword({
            action: 'setVal',
            value: event.target.value
        });
    };
    const submitHandler = (event) => {
        event.preventDefault();
        props.setLogin(login.value, password.value);
    }
    const valid = login.valid === true && password.valid === true;
    return (
        <form onSubmit={submitHandler}>
            {/* {ReactDOM.createPortal(<div>dick</div>, document.getElementById('login-mistakes'))} */}
            <main className={style.form}>
                <div className={style.inputs}>
                    <Input value={login.value}
                        valid={login.valid}
                        focus={login.focus}
                        handler={loginHanler}
                        dispach={dispachLogin}
                        login={true} />
                    <Input value={password.value}
                        valid={password.valid}
                        focus={password.focus}
                        handler={passwordHandler}
                        dispach={dispachPassword}
                        login={true}
                        password={true} />
                </div>
                <button type="submit"
                    className={style.button + ' ' + (valid && style.confirm)}
                    disabled={!valid}>Login</button>
            </main>
        </form>
    );
}

export default Login;