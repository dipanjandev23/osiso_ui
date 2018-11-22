import React from "react";
import Spinner from "../assets/spin.svg";
const Loading=()=> {
    return   (
        <div style={{
                width: "100vw",
                height: "100vh",
                display: "table",
                textAlign: "center"
        }}>
            <p style={{
                display: "table-cell",
                verticalAlign: "middle"
            }}>
                <img src={Spinner} alt="spinner" />
            </p>
        </div>
    ) 
}
export default Loading;
