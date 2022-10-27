import React from "react";

import Register from "./RegisterScreen/Register";
import Login from "./Login/Login";
import Error from "../Error/Error";
import AuthContext from "../AuthContext";
import link from "../link/link";

function MainLogin(props) {
    const ctx = React.useContext(AuthContext);

    const register = async (login, password) => {
        console.log(login);
        const editedLogin = login.includes('@') ? login.split('.')[0] + '@' + login.split('.')[1].toLowerCase() : login.toLowerCase();
        if (!await FoundLogin(editedLogin)) {
            const response = await fetch(link + 'accounts.json', {
                method: 'PATCH',
                body: JSON.stringify({
                    [editedLogin]: {
                        password: password
                    }
                }),
                headers: { 'Content-Type': 'application/json' }
            });
            const result = await response.json();
            props.setLogin(editedLogin);
        } else {
            ctx.setError(<Error prompt={'account exist'} />);
        }
    }
    const login = async (login, password) => {
        const editedLogin = login.includes('@') ? login.split('.')[0] + '@' + login.split('.')[1].toLowerCase() : login.toLowerCase();
        if (await FoundLogin(editedLogin)) {
            const response = await fetch(link + 'accounts/' + editedLogin + '/password.json');
            const result = await response.json();
            if (result === password) {
                props.setLogin(editedLogin);
            } else {
                ctx.setError(<Error prompt={'Wrong password or user!'} />);
            }
        } else {
            ctx.setError(<Error prompt={"User doesn't exist!"} />);
        }
    }
    return (
        <React.Fragment>
            {props.login && <Login setLogin={login} />}
            {!props.login && <Register setLogin={register} />}
        </React.Fragment>
    );
}

async function FoundLogin(login) {
    const response = await fetch(link + 'accounts.json');
    const result = await response.json();
    if (typeof result === typeof {} && result !== undefined && result !== null) {
        const editedLogin = login.includes('.') ? login.split('.')[0] + '@' + login.split('.')[1].toLowerCase() : login.toLowerCase();
        let found = false;
        const resultEntries = Object.entries(result);
        for (let index = 0; index < resultEntries.length; index++) {
            if (resultEntries[index][0] === editedLogin) {
                found = true;
                break;
            }
        }
        return found;
    } else {
        return false;
    }
}

export default MainLogin;