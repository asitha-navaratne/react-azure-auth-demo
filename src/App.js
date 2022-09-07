import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { config } from "./Config";
import { PublicClientApplication } from "@azure/msal-browser";

const publicClientApplication = new PublicClientApplication({
  auth: {
    clientId: config.appId,
    redirectUri: config.redirectUrl,
    authority: config.authority,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: true,
  },
});

function App() {
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function loginUser() {
      const isMounted = true;

      if (isLoggedIn) {
        try {
          await publicClientApplication.loginPopup({
            scopes: config.scopes,
            prompt: "select_account",
          });
          if (isMounted) {
            setIsAuthenticated(true);
          }
        } catch (err) {
          if (isMounted) {
            setError(err);
          }
        } finally {
          setIsLoggedIn(false);
        }
      }

      return () => {
        isMounted = false;
      };
    }
    loginUser();
  }, [isLoggedIn]);

  const login = function () {
    setIsLoggedIn(true);
  };

  const logout = function () {
    publicClientApplication.logout();
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {isAuthenticated ? (
          <p>Successfully logged in!</p>
        ) : (
          <button
            onClick={() => {
              login();
            }}
          >
            Log in
          </button>
        )}
      </header>
    </div>
  );
}

export default App;
