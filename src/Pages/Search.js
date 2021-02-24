import Form from "../components/Form";
import Error from "../components/Error";
import Weather from "../components/Weather";
import AuthorData from "../components/AuthorData";
import "./search.css";

const Search = ({
	isToggled,
	setIsToggled,
	result,
	error,
	search,
	setSearch,
	setConsult,
	author,
	rawImage,
}) => {
	const {
		name,
		username,
		instagram_username,
		twitter_username,
		links,
		portfolio_url,
	} = author;

	console.log(result);
	console.log(search);
	console.log(author);

	let component1;
	let component2;
	component2 = <Weather result={result} isToggled={isToggled} />;

	if (error) {
		component1 = <Error message={`There are no results for this search`} />;
	} else {
		component1 = null && component2;
	}

	return (
		<div className="author-search-data">
			<div className="author-data">
				<AuthorData
					name={name}
					links={links}
					username={username}
					instagram_username={instagram_username}
					twitter_username={twitter_username}
					rawImage={rawImage}
					// html={html}
					portfolio_url={portfolio_url}
				/>
			</div>
			<div className="search" id="lorem">
				<div className="info-wrapper">
					<div className="form-section">
						<Form
							// searchData={searchData}
							search={search}
							setSearch={setSearch}
							setConsult={setConsult}
							isToggled={isToggled}
							setIsToggled={setIsToggled}
						/>
						<div className="error-div">{component1}</div>
					</div>
					<div className="weather-data">{component2}</div>
				</div>
			</div>
		</div>
	);
};

export default Search;
