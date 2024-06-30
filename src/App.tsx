/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import "./App.css";
import HorizontalScroll from "./horizontalScroll/HorizontalScroll";
import MoviesList from "./components/moviesList/MoviesList";
import SearchBox from "./components/searchBox/SearchBox";
import { moviesListType } from "./types/moviesListType";
import Logo from "./Logo/Logo";
import ErrorMessages from "./errorMessages/ErrorMessages";
import { fetchData, fetchScrollData, handleGenreList } from "./utils/utils";
import debounce from "./utils/debounce";

function App() {
	const [moviesData, setMoviesData] = useState<moviesListType[]>([]); // fetch data
	const [genreList, setGenreList] = useState<Record<string, any>[]>([]); // fetch data
	const [error, setError] = useState<Record<string, boolean>>({
		genreError: false,
		moviesError: false,
	});
	const [query, setQuery] = useState("");
	const [selectedGenre, setSelectedGenre] = useState<number[]>([1]);
	const [selectedYears, setSelectedYears] = useState([2012]);
	const [scrollDirection, setScrollDirection] = useState<"UP" | "DOWN" | null>(
		null
	);
	const [scrolling, setScrolling] = useState(false);
	const [endOfList, setEndofList] = useState(false);
	const [loading, setLoading] = useState(false);
	const initialSelectedGenre = { id: 1, name: "All" };
	const containerRef = useRef<HTMLDivElement>(null);

	function handleScroll(prop: "UP" | "DOWN") {
		setScrollDirection(() => prop);
		setScrolling(false);
		switch (prop) {
			case "UP":
				setSelectedYears((arr) => [arr[0] - 1, ...arr]);
				break;
			case "DOWN":
				setSelectedYears((arr) => [...arr, arr[arr.length - 1] + 1]);
				break;
			default:
				setScrollDirection(null);
		}
	}
	useEffect(() => {
		setLoading(true);

		setSelectedYears([2012]);
		// debounce(() => {
		fetchData(query, selectedGenre)
			.then((data) => {
				setMoviesData(data ? [data] : []);
			})
			.catch(() => {
				setError((err) => ({ ...err, moviesError: true }));
			})
			.finally(() => setLoading(false));
		// }, 500)();
	}, [query, selectedGenre]);

	useEffect(() => {
		setLoading(true);
		debounce(() => {
			fetchScrollData(
				query,
				selectedGenre,
				scrollDirection,
				selectedYears,
				setEndofList
			)
				.then((scrollData) => {
					const data = scrollData!;
					if (scrollDirection === "UP") {
						if (data.results.length) {
							setMoviesData((c) => [data.results, ...c]);
						}
					} else if (scrollDirection === "DOWN") {
						if (data.results.length) setMoviesData((c) => [...c, data.results]);
					}
				})
				.catch(() => {
					setError((err) => ({ ...err, moviesError: true }));
				})
				.finally(() => setLoading(false));
		}, 500)();
	}, [selectedYears]);

	//Handles the scroll position
	useEffect(() => {
		if (scrollDirection === "UP") {
			const el = containerRef.current && containerRef.current.children[1];
			const top = el && window.scrollY + el?.getBoundingClientRect().top;
			window.scrollTo(0, top! - 350);
		}
	}, [containerRef, moviesData]);

	useEffect(() => {
		handleGenreList()
			.then((genres) => {
				setGenreList([initialSelectedGenre, ...genres.genres]);
			})
			.catch(() => setError((err) => ({ ...err, genreError: true })));
		const handleWindowScroll = () => {
			if (scrolling) return;
			if (window.scrollY <= 0) {
				if (!loading) {
					debounce(() => {
						setScrolling(true);
						handleScroll("UP");
						// setScrolling(false);
					}, 100)();
				}
			} else if (
				window.innerHeight + window.scrollY + 2 >=
				document.body.offsetHeight
			) {
				if (!loading) {
					debounce(() => {
						setScrolling(true);
						handleScroll("DOWN");
						// setScrolling(false);
					}, 1000)();
				}
			}
		};
		window.addEventListener("scroll", handleWindowScroll);

		return () => {
			window.removeEventListener("scroll", handleWindowScroll);
		};
	}, [loading, scrolling]);

	return (
		<div className={`App ${scrollDirection === "UP" ? "scroll-up" : ""}`}>
			<header className="header">
				<Logo />
				{!error.genreError ? (
					<HorizontalScroll
						selectedGenre={selectedGenre}
						setSelectedGenre={setSelectedGenre}
						items={genreList}
					/>
				) : (
					<ErrorMessages header="Failed to fetch Genres" />
				)}
				<SearchBox query={query} setQuery={setQuery} />
			</header>
			<div className="body" style={{ marginTop: 200 }}>
				{moviesData.length === 0 ? (
					<ErrorMessages header="Oops! Seems like you're out of luck." />
				) : (
					<>
						{selectedYears?.length > 1 && (
							<div
								style={{
									height: "100px",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<h1> Loading Movies... please wait!</h1>
							</div>
						)}
						<div className="movies-container" ref={containerRef}>
							{moviesData.map((data: Record<string, any>[], i: number) => {
								return data.length ? (
									<MoviesList data={data} key={i} />
								) : (
									<ErrorMessages
										header="Seems we do not have the movie you are searching for"
										type="error"
									/>
								);
							})}
						</div>
						<div
							style={{
								height: "100px",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<h1> Loading Movies... please wait!</h1>
						</div>
					</>
				)}
			</div>
			{endOfList && (
				<footer className="footer">
					<ErrorMessages header="There's always a next year" type="info" />
				</footer>
			)}
		</div>
	);
}

export default App;
