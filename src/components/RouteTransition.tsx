import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function RouteTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState<"fadeIn" | "fadeOut">("fadeIn");

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname || location.search !== displayLocation.search) {
      setTransitionStage("fadeOut");

      const timer = setTimeout(() => {
        setDisplayLocation(location);

        // Scroll to top or handle hash target
        if (location.hash) {
          const element = document.getElementById(location.hash.slice(1));
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          } else {
            window.scrollTo({ top: 0, behavior: "instant" });
          }
        } else {
          window.scrollTo({ top: 0, behavior: "instant" });
        }

        setTransitionStage("fadeIn");
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [location, displayLocation]);

  return (
    <div
      className={`transition-opacity duration-200 ease-out ${
        transitionStage === "fadeIn" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
      }`}
    >
      {children}
    </div>
  );
}
