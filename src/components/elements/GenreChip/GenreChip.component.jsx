import React from "react";
import "./GenreCchip.styles.css"
export default function GenreChipComponent({name, onClose, classes}){
    return (
    <div key={name} className={"basic-chip background-grey "+ classes} onClick={onClose(name)} >{name.replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase())}
        <a href="#">
            <span>x</span>
        </a>
    </div>
    );
}
