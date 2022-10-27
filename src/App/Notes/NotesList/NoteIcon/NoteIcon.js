import React from "react";
import style from "./NoteIcon.module.css";

import AuthContext from "../../../AuthContext";
import Error from "../../../Error/Error";

function NoteIcon(props) {
    const ctx = React.useContext(AuthContext);
    const removeNote = () => {
        const func = () => {
            props.removeNote(props.title);

        }
        ctx.setError(<Error
            prompt={'Are you sure you want to delete this note ?'}
            func={func}
            setPrompt={props.setPrompt} />);
    }
    const setNote = () => {
        props.setNote(props.title);
        localStorage.setItem('note', props.title);
    }
    return (
        <div className={style.icon}>
            <button className={style.button} onClick={setNote}>
                <h1>{props.title}</h1>
                <div className={style.back} />
            </button>
            <button className={style.trash} onClick={removeNote}>🗑️</button>
        </div>
    );
}

export default NoteIcon;