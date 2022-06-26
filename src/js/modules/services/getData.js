const getData = async (url) => {
	let response = await fetch (url);

	if (!response.ok) {
		throw new Error(`Could not fetch ${url}, status: ${response.status}`);
	}

	return await response.json();
};

export default getData;