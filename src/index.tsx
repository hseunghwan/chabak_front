import React from "react";
import ReactDOM from "react-dom/client";
import "src/index.css";
import App from "src/App";
import reportWebVitals from "src/reportWebVitals";
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string;

function loadGoogleMapsApi(apiKey: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = (error) => reject(error);
        document.body.appendChild(script);
    });
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
loadGoogleMapsApi(GOOGLE_MAPS_API_KEY)
    .then(() => {
        root.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>
        );
    })
    .catch((error) => {
        console.error("Error loading Google Maps API:", error);
    });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
