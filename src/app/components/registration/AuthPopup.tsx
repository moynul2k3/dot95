"use client";

import React, { useState, useEffect, Suspense  } from "react";
import Popup from "../popup/popup"; 
import Register from "../registration/register"; 
import SigninSignup from "../registration/signin_signup"; 
import { useSearchParams } from "next/navigation";

const AuthPopup = () => {
  

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AuthProvider />
    </Suspense>
  );
};



export const AuthProvider = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const searchParams = useSearchParams();
  //const router = useRouter();

  const handleClosePopup = async () => {
    window.history.back(); // Navigate back
    setIsPopupVisible(false);

    // Refresh page efficiently
    //setTimeout(() => {
    //  window.location.reload(); // Best way to refresh in Next.js
    //}, 100);
  };

  useEffect(() => {
    const notLoggedInParam = searchParams.get("user");
    if (notLoggedInParam === "_authentication-required") {
      setIsPopupVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      setIsPopupVisible(false);
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = ""; // Cleanup on unmount
    };
  }, [searchParams]);
  return (
      <div className="absolute top-0 left-0">
        <Popup isVisible={isPopupVisible} onClose={handleClosePopup}>
          <Register>
            <SigninSignup onClose={handleClosePopup} />
          </Register>
        </Popup>
      </div>
    )
}

export default AuthPopup;
