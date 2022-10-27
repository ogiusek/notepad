import React, { useReducer, useState } from "react";
import style from "./NotesMain.module.css";

import Note from "./Note/Note";
import NotesList from "./NotesList/NotesList";

function NotesMain(props) {
    return (
        <div className={style.main}>
            {
                props.note === null ? (
                    <NotesList user={props.user} setNote={props.setNote} />
                ) : (
                    <Note user={props.user} note={props.note} setNote={props.setNote} />
                )
            }
        </div>
    );
}

export default NotesMain;