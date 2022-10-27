import React, { useContext, useRef, useState } from "react";
import style from "./NoteIcon.module.css";

import AuthContext from "../../../AuthContext";
import Error from "../../../Error/Error";
import link from "../../../link";

function AddNoteIcon(props) {
    const ctx = useContext(AuthContext);
    const input = useRef();
    const [add, setAdd] = useState(false);
    const addNote = async (event) => {
        event.preventDefault();

        const response = await fetch(link + `accounts/${props.user}/notes/${input.current.value}.json`);
        const result = await response.json();

        if (result === null) {
            // setTimeout(() => {
            props.addNote(input.current.value);
            setAdd(false);
            // }, 1);
        } else {
            ctx.setError(<Error prompt='Note exist!'
            />);
        }
    }
    const switchAdd = () => {
        setAdd(!add);
    }
    return (
        <div className={style.icon + ' ' + (add && style.addIcon)} onClick={(!add) ? (switchAdd) : () => { }}>
            {/* <button className={style.button} onClick={addNote}> */}
            {
                add ? (
                    <form onSubmit={addNote} className={style.add}>
                        <input type="text" placeholder="Note Name" ref={input} />
                        <div className={style.buttons}>
                            <button type="submit" className={style.onSubmit}>Add</button>
                            <button className={style.cancel} onClick={switchAdd}>Cancel</button>
                        </div>
                    </form>
                ) : (
                    <button className={style.add}>+</button>
                )
            }
            <div className={style.back} />
            {/* </button> */}
        </div >
    );
}

export default AddNoteIcon;