import  { useState, useEffect } from "react";
import axios from "axios";
import Shows from "../components/Shows";
import Pagination from "../components/Pagination";
import SearchForm from "../components/Search";

function Home() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [moviesPerPage] = useState(12);
	const [searchTerm, setSearchTerm] = useState("");
	const [error, setError] = useState(null);

	const indexOfLastMovies = currentPage * moviesPerPage;
	const indexOfFirstMovies = indexOfLastMovies - moviesPerPage;
	const currentMovie = data.slice(indexOfFirstMovies, indexOfLastMovies);
	const numberOfPages = Math.ceil(data.length / moviesPerPage);

	useEffect(() => {
		let cancelRequest = false;
		let url = "https://api.tvmaze.com/shows";
		if (searchTerm) {
			url = `https://api.tvmaze.com/search/shows?q=${searchTerm}`;
		}

		setLoading(true);
		setError(null);

		axios
			.get(url)
			.then((res) => {
				if (!cancelRequest) {
					setData(res.data);
					setLoading(false);
				}
			})
			.catch((err) => {
				console.error("Error fetching data:", err);
				setLoading(false);
				setError(
					"An error occurred while fetching data. Please try again later."
				);
				setData([]); // Clear data on error to avoid showing stale data
			});

		return () => {
			cancelRequest = true;
		};
	}, [searchTerm]);

	return (
		<div className="">
			<SearchForm setSearchTerm={setSearchTerm} />
			{error && <div className="error">{error}</div>}
			{loading && <div className="loading">Loading...</div>}
			<Shows data={currentMovie} loading={loading} />
			{!loading && (
				<Pagination
					numberOfPages={numberOfPages}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
				/>
			)}
		</div>
	);
}

export default Home;
