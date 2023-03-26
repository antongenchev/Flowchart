import React from "react";
import { useState } from "react";
import '../App.css';



function BoxEditor({ box, onBoxContentSave, onClose , onSubmit }) {
    const [newContent, setNewContent] = useState('')

    const handleContentChange = (event) => {
        setNewContent(event.target.value)
    }

    return (
        <div className="box-editor">
            <h3>Editor Box</h3>
            <form onSubmit={onSubmit}>
                <label>
                    Title:
                    <input className="editor-box-title-field" type="text" value={newContent} onChange={handleContentChange} />
                </label>
                <br />
                <button className="button-yellow-hover" type="button" onClick={onClose}>Cancel</button>
                <button className="button-yellow-hover" onClick={() => onBoxContentSave(newContent)}>Save</button>
            </form>
        </div>
    )
}

export default BoxEditor;