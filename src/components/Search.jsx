import {useEffect, useState} from 'react'
import useDebounce from '../custom-hook/useDebouncer';


function SearchForm({ setSearchTerm }) {
	const [inputValue, setInputValue] = useState("");
	const debouncedSearchTerm = useDebounce(inputValue, 1000); // Debounce with 500ms delay

	useEffect(() => {
		setSearchTerm(debouncedSearchTerm); // Update search term when debounced term changes
	}, [debouncedSearchTerm, setSearchTerm]);

	const handleChange = (e) => {
		setInputValue(e.target.value); // Update input value on each keystroke
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setSearchTerm(inputValue.trim()); // Trigger search on form submission
	};

	return (
		<div className="p-2">
			<form onSubmit={handleSubmit} method="get">
				<div className="form-floating mb-3">
					<input
						className="search form-control"
						id="floatingInput"
						type="text"
						value={inputValue}
						onChange={handleChange}
						placeholder="Search for your favorite show"
					/>
					<label htmlFor="floatingInput">Search for your favorite show</label>
				</div>
                <button className="btn btn-dark" onClick={() => {setInputValue('')}}>Clear</button>
			</form>
		</div>
	);
}

export default SearchForm