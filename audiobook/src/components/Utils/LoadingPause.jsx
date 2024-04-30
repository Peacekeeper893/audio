import React, { useEffect, useRef, useState } from "react";
import LoadingScreen from "./LoadingScreen";

function LoadingPause() {
    const [isLoading, setIsLoading] = useState(false);
    const [hasBeenViewed, setHasBeenViewed] = useState(false);
    const loaderRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasBeenViewed) {
                setIsLoading(true);
                document.documentElement.scrollTop += 30;
                document.body.style.overflow = "hidden"; // Prevent scrolling
                setTimeout(() => {
                    setIsLoading(false);
                    document.body.style.overflow = "auto"; // Re-enable scrolling
                    setHasBeenViewed(true); // Mark as viewed
                }, 1500);
            }
        });

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => observer.disconnect();
    }, [hasBeenViewed]);

    return (
        <div ref={loaderRef} className="flex justify-center items-center">
            {isLoading && (
                <div className="animate-spin rounded-full h-10 w-10 text-center border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
            )}
            {isLoading && <div className="h-[100vh]"> Loading...</div>}
        </div>
    );
}

export default LoadingPause;
