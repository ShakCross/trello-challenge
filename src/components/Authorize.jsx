import { useEffect, useState } from "react";
import authAPI from "../services/authAPI";
import { useAppContext } from "../context/context";
import "../assets/css/Authorize.css";

const Authorize = props => {
    const context = useAppContext();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const checkForToken = async () => {
            const matchIndex = window.location.href.indexOf("#token=");
            //if a token already exists, check if still valid and return
            if (localStorage.trelloToken && await isValidToken(localStorage.trelloToken)) {
                context.keys.token = localStorage.trelloToken;
                props.setIsAuthorized(!props.isAuthorized);
            }
            else if (matchIndex !== -1) {
                if ( window.location.href.indexOf("error=") === -1) {
                    localStorage.trelloToken = window.location.href.substring(matchIndex + "#token=".length);
                    context.keys.token = localStorage.trelloToken;
                    window.window.location.href = window.location.href.substring(0, matchIndex);
                    props.setIsAuthorized(!props.isAuthorized);
                }
            }
            setIsLoaded(!isLoaded);
        }
        checkForToken();
    },[]);

    const isValidToken = async token => {
        if (!token)
            return (false);
        const currentTime = new Date();
        try {
            const response = await authAPI.getTokenInfo(context.keys.apiKey, token);
            if (response.data.dateExpires !== null) {
                const expirationDate = new Date(response.data.dateExpires);
                if (currentTime.getTime() > expirationDate.getTime()) {
                    localStorage.removeItem("trelloToken");
                    return (false);
                }  
            }
        }
        catch (error) {
            if (error.response.data === "expired token") {
                console.error("Token Expired");
                localStorage.removeItem("trelloToken");
            }
            return (false);
        }
        return (true);
    }

    return (
        <>
        {isLoaded && 
            <div className="authorize">
            <h1>Trello Client</h1>
            {process.env.REACT_APP_TOKEN &&
                <button className="authorize__button"
                onClick={() => {
                    context.keys.token = process.env.REACT_APP_TOKEN;
                    props.setIsAuthorized(!props.isAuthorized)}
                }
                >Sign with ENV Token</button>
            }
            </div>
        }
        </>
    );
}

export default Authorize;