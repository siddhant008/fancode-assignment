const API_KEY = "2dca580c2a14b55200e784d157207b4d";
export async function getGenreList() {
	const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
	const options = { method: "GET", headers: { accept: "application/json" } };

	const result = await fetch(url, options)
		.then((res) => res.json())
		.then((json) => json)
		.catch((err) => console.error("error:" + err));
	return result;
}
