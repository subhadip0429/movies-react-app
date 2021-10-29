import React from "react";
import "./ModalInput.styles.css"

function ModalInputComponent({list, value, handleChange, onClose}) {
    return (
        <div className={"modal-panel"} onClick={e => onClose(e)}>
            <div className={"input-modal"}>
                <label>Select Genres (Press enter to select)</label>
                <input list={"items"} value={value} onKeyDown={handleChange}/>
                <datalist id={"items"}>
                    {list.map(item => <option key={item} value={item.replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase())} />)}
                </datalist>
            </div>
        </div>
    );
}


export default ModalInputComponent;
