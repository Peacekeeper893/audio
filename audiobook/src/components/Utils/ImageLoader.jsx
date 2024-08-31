import React, { useEffect, useState } from 'react';

const ImageLoader = ({ src , classSettings }) => {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const checkCachedImage = async () => {
      try {
        // Open the cache
        const cache = await caches.open('image-cache');

        // Check if the image is cached
        const cachedResponse = await cache.match(src);
        if (cachedResponse) {
          // If the cached image is found, use it
          const imageURL = URL.createObjectURL(await cachedResponse.blob());
          setImageData(imageURL);
        } else {
          // If the image is not cached, load it
          loadImage(cache);
        }
      } catch (error) {
        console.error('Error checking cached image:', error);
      }
    };

    const loadImage = async (cache) => {
      try {
        // Fetch the image using the provided URL
        const response = await fetch(src);

        // If the response is not OK, throw an error
        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
        }

        // Clone the response as it's a one-time-use object
        const clonedResponse = response.clone();

        // Put the response in the cache
        await cache.put(src, clonedResponse);

        // Convert response to blob
        const blob = await response.blob();

        // Convert blob to URL
        const imageURL = URL.createObjectURL(blob);

        // Set the loaded image data
        setImageData(imageURL);
      } catch (error) {
        console.error('Error loading image:', error);
      }
    };

    checkCachedImage();
  }, [src]);

  return <img src={imageData || src} className={classSettings} alt="Fetched Image" />;
};

export default ImageLoader;
