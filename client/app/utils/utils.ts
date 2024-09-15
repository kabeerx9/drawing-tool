export const serializeImageData = (imageData: ImageData) => {
	return {
		data: imageData.data,
		width: imageData.width,
		height: imageData.height,
	};
};

export const deserializeImageData = (imageData: ImageData) => {
	const { width, height, data } = imageData;
	return new ImageData(new Uint8ClampedArray(data), width, height);
};
