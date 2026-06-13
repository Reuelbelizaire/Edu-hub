import React from 'react';
import './Card.css';

export const Card = ({
    imgsrc,
    imgalt,
    title,
    description ,
    link,
    icon,
}) => {
    return(
        <div className="card-container">
            {imgsrc && imgalt && (<img src={imgsrc} alt={imgalt} className="card-image"/> )}
            {icon && <div className="card-icon">{icon}</div>}
            {title && <h3 className="card-title">{title}</h3>}
            {description && <p className="card-description">{description}</p>}
            {link && <a href={link} className="card-btn" target="_blank" rel="noopener noreferrer" className="card-btn">Learn Here!</a>}
        </div> 
    ) 
}
