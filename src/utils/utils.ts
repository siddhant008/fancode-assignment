/* eslint-disable @typescript-eslint/no-explicit-any */
import { getGenreList } from "../api/genreListApi";
import { BASE_URL } from "../constants/base_urls";
import { dataType } from "../types/moviesListType";

const intialParams = [
	{ vote_count_gte: 150 },
	{ sort_by: "popularity.desc" },
	{ api_key: "2dca580c2a14b55200e784d157207b4d" },
];

export async function fetchData(query: any, selectedGenre: number[]) {
	let data: dataType;
	try {
		const params = new URLSearchParams();
		intialParams.forEach((each: Record<string, any>) => {
			for (const key in each) params.append(key, each[key]);
		});
		params.append("with_text_query", query);
		// if (query.length === 0)
		params.append("primary_release_year", "2012");

		params.append(
			"with_genres",
			selectedGenre[0] === 1 && selectedGenre.length === 1
				? ""
				: selectedGenre.join("|")
		);
		// console.log(params.toString());
		const result = await fetch(`${BASE_URL}?${params}`);

		data = await result.json();
		return data.results;
	} catch (err) {
		// console.log(err);
		Promise.reject();
	}
}

export async function handleGenreList() {
	try {
		const list = await getGenreList();
		return list;
	} catch {
		Promise.reject();
	}
}

export async function fetchScrollData(
	query: any,
	selectedGenre: any,
	scrollDirection: any,
	selectedYears: any,
	setEndofList: any
) {
	let data: dataType;
	try {
		const params = new URLSearchParams();
		intialParams.forEach((each: Record<string, any>) => {
			for (const key in each) params.append(key, each[key]);
		});
		params.append("with_text_query", query);
		params.append(
			"with_genres",
			selectedGenre[0] === 1 && selectedGenre.length === 1
				? ""
				: selectedGenre.join("|")
		);
		if (scrollDirection === "UP") {
			params.append("primary_release_year", selectedYears[0].toString());
		} else if (scrollDirection === "DOWN") {
			params.append(
				"primary_release_year",
				selectedYears[selectedYears.length - 1].toString()
			);
		}
		if (selectedYears[selectedYears.length - 1] > new Date().getFullYear()) {
			setEndofList(true);
			return;
		}
		const result = await fetch(`${BASE_URL}?${params}`);
		data = await result.json();
		return data;
	} catch (err) {
		Promise.reject();
	}
}
