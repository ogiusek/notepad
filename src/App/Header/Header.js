import React from "react";
import style from "./Header.module.css";

import Error from "../Error/Error";
import AuthContext from "../AuthContext";
import headerUrl from "./headerUrl";

function Header(props) {
    const ctx = React.useContext(AuthContext);

    const logout = () => {
        const func = () => {
            props.setLoggedIn(null);
        };
        ctx.setError(<Error
            prompt={'Are you sure you want to logout?'}
            func={func} />);
    }
    const register = () => {
        props.setLogin(false);
    }
    const login = () => {
        props.setLogin(true);
    }
    const exitNote = () => {
        localStorage.removeItem('note');
        props.setNote(null);
    }
    let button;
    if (props.note !== null) {
        button = (<button onClick={exitNote} className={style.button + ' ' + style.exitNote}>exit note</button>);
    } else if (props.isLoggedIn) {
        button = (<button onClick={logout} className={style.button + ' ' + style.logout}>logout</button>);
    } else if (!props.login) {
        button = (<button onClick={login} className={style.button + ' ' + style.login}>login</button>);
    } else {
        button = (<button onClick={register} className={style.button + ' ' + style.register}>register</button>);
    }
    return (
        <div className={style.header}>
            <img className={style.logo} src={headerUrl} />
            <div className={style.user}>
                {typeof props.user === typeof '' && props.user.split('@')[0]}
                {typeof props.note === typeof '' && '/' + props.note}
            </div>
            {button}
        </div>
    );
}

export default Header;