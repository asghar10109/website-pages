import React from 'react'
 import Load from "../assets/images/loading.png"
 
const Spinner = () => {
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", width: "100%", backgroundColor: "rgba(15, 15, 15,0.5)", position: "fixed", zIndex: 1500, }}>
             <div className="fa-3x">
                <img src={Load} width="50" height="50"/>
             </div>
        </div>
    )
}

export default Spinner