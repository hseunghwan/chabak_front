import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import "src/index.css";
import App from "src/App";
import reportWebVitals from "src/reportWebVitals";
const NAVER_MAPS_CLIENT_ID = process.env.REACT_APP_NAVER_MAPS_CLIENT_ID as string;

function loadNaverMapsApi(clientId: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = (error) => reject(error);
        document.body.appendChild(script);
    });
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
loadNaverMapsApi(NAVER_MAPS_CLIENT_ID)
    .then(() => {
        root.render(
            <React.StrictMode>
                <RecoilRoot>
                    <App />
                </RecoilRoot>
            </React.StrictMode>
        );
    })
    .catch((error) => {
        console.error("Error loading Naver Maps API:", error);
    });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
