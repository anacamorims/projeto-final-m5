import { Outlet } from "react-router-dom";
import React, { useEffect, useState } from "react";

import IconeApp from "./assets/app.png";

export default function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallModal(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
        setShowInstallModal(false);
        setRedirectToDashboard(true);
      });
    }
  };

  const handleCloseModal = () => {
    setShowInstallModal(false);
  };

  return (
    <div>
      <Outlet />
      {showInstallModal && (
        <div className="install-modal">
          <div className="modal-content">
            <div className="icon">
              <img src={IconeApp} alt="" />
            </div>
            <h2>Install App</h2>
            <p>
              You can install this app on your device for a better experience!
            </p>
            <div className="buttons">
              <button onClick={handleInstallClick}>Install</button>
              <button onClick={handleCloseModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
