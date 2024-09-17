export const serializeImageData = (imageData: ImageData) => {
  return {
    data: Array.from(imageData.data),
    width: imageData.width,
    height: imageData.height,
  };
};

const deserializeImageData = (serializedData: any) => {
  const imageData = new ImageData(
    new Uint8ClampedArray(serializedData.data),
    serializedData.width,
    serializedData.height,
  );
  return imageData;
};
