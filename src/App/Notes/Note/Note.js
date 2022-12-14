import React, { useEffect, useState } from "react";
import style from "./Note.module.css";

import link from "../../link/link";

function Note(props) {
    const [notes, setNotes] = useState('');

    useEffect(() => {
        fetchNote();
    }, []);
    const fetchNote = async () => {
        const response = await fetch(link + `accounts/${props.user}/notes/${props.note}.json`);
        const result = await response.json();
        setNotes(result);
    }

    const notesHandler = (event) => {
        setNotes(event.target.value);
    }

    const handleKeyDown = (event) => {
        setNotes(event.target.value);
        let charCode = String.fromCharCode(event.which).toLowerCase();
        if ((event.ctrlKey || event.metaKey) && charCode === 's') {
            event.preventDefault();
            save();
        }
    }
    const save = async () => {
        const response = await fetch(link + `accounts/${props.user}/notes.json`, {
            method: 'PATCH',
            body: JSON.stringify({
                [props.note]: notes
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        const result = await response.json();
    }
    useEffect(() => {
        const identyfier = setTimeout(save, 500);

        return () => {
            clearTimeout(identyfier);
        };
    }, [notes]);
    return (<div className={style.note} onKeyDown={handleKeyDown}>
        <textarea id={style.note} value={notes} onChange={notesHandler}>
        </textarea>
    </div >);
}

export default Note;