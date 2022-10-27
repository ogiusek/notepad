import React, { useEffect, useState } from "react";
import style from "./NotesList.module.css";

import NoteIcon from "./NoteIcon/NoteIcon";
import AddNoteIcon from "./NoteIcon/NoteIconAdd";
import link from "../../link";
function NotesList(props) {
    const [notesList, setNotesList] = useState([]);
    const fetchNotes = async () => {
        const response = await fetch(link + `accounts/${props.user}/notes.json`);
        const result = await response.json();
        if (result !== null) {
            setNotesList(Object.entries(result));
        }
    }
    const addNote = async (note) => {
        const response = await fetch(link + `accounts/${props.user}/notes.json`, {
            method: 'PATCH',
            body: JSON.stringify({
                [note]: "Hello world!"
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        const result = await response.json();
        fetchNotes();
    }
    const removeNote = async (note) => {
        const response = await fetch(link + `accounts/${props.user}/notes/${note}.json`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        const result = await response.json();
        setTimeout(() => {
            fetchNotes();
        }, 1);
    }
    useEffect(() => {
        fetchNotes();
    }, []);
    const notes = [
        (<AddNoteIcon key={''} addNote={addNote} user={props.user} />),
        notesList.length > 0 && notesList.map((element) => {
            return <NoteIcon title={element[0]} key={element[0]} removeNote={removeNote} setNote={props.setNote} />
        })
    ];
    return (
        <div className={style.main}>
            {notes}
        </div>
    );

}

const foundNote = async (note) => {
    return false;
}

export default NotesList;