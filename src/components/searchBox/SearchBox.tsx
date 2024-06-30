import { FaSearch } from "react-icons/fa";
import "./searchBox.css";
import debounce from "../../utils/debounce";
type searchBoxType = {
	query: string;
	setQuery: (query: string) => void;
};
const SearchBox = ({ query, setQuery }: searchBoxType) => {
	const handleSearch = () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return debounce((e: any) => {
			setQuery(e.target.value);
		}, 500);
	};

	return (
		<div className="flex">
			<div className="input-wrapper">
				<input
					type="text"
					className="search-input"
					placeholder="Search Movies"
					defaultValue={query}
					onChange={handleSearch()}
				/>
				<FaSearch id="search-icon" />
			</div>
		</div>
	);
};

export default SearchBox;
