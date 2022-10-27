import React from "react";
import style from "./ErrorPrompt.module.css";

import AuthContext from "../AuthContext";

function Error(props) {
    const ctx = React.useContext(AuthContext);
    const errorType = props.func !== null && props.func !== undefined;
    const confirm = () => {
        props.func();
        ctx.setError(<React.Fragment />);
    }
    const cancel = () => {
        ctx.setError(<React.Fragment />);
    }
    return (
        <div className={style.shadow}>
            <main className={style.wraper}>
                <h1>{props.prompt}</h1>
                <div className={style.buttons}>
                    {errorType ? (
                        <React.Fragment>
                            <button onClick={cancel} className={style.cancel}>cancel</button>
                            <button onClick={confirm} className={style.confirm}>confirm</button>
                        </React.Fragment>
                    ) : (
                        <button onClick={cancel} className={style.confirm}>ok</button>
                    )
                    }
                </div>
            </main>
        </div>
    );
}

export default Error;