async function parseToURIFormat(blobObject) {
	const reader = new FileReader();
	reader.readAsDataURL(blobObject);
	// eslint-disable-next-line no-unused-vars
	return new Promise((resolve, reject) => {
		reader.onload = (event) => {
			resolve(event.target.result);
		};
	});
}

export default async function srcImgToBlob(url) {
	const response = await fetch(url);
	const blob = await response.blob();
	const uri = await parseToURIFormat(blob);
	return uri;
}
