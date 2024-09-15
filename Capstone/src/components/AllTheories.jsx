import { useNavigate } from "react-router";
import { useGetTheoriesQuery } from "../api/index.js";
import { useState } from "react";

const AllTheories = () => {
  const navigate = useNavigate();
  const { data, error, isLoading, isSuccess } = useGetTheoriesQuery();

  console.log(data);

  const [type, setType] = useState(null);
  const [searchParameter, setSearchParameter] = useState("");

  const filteredTheories =
    type && data
      ? data.filter((theory) => {
          return theory.type === type;
        })
      : data;

  const searchedTheories =
    filteredTheories &&
    filteredTheories.filter((theory) => {
      return theory.title.toLowerCase().includes(searchParameter.toLowerCase());
    });

  const theoriesToDisplay = filteredTheories && [...searchedTheories];

  return (
    <section id="all-theories-page">
      {isLoading && <p>Loading Theories...</p>}
      {error && (
        <p>
          Oopsie daisy! Something went wrong!
          <br />
          Please try again!
        </p>
      )}
      <div className="searchBar">
        <label id="searchBar-label">
          Search:
          <input
            value={searchParameter}
            onChange={(event) => setSearchParameter(event.target.value)}
            id="searchBar-input"
          />
        </label>
      </div>
      <div id="theory-library">
        <div id="library-intro-container">
          <h2 id="library-intro-title">The Library of Theories</h2>
          <p className="library-descrip">
            Below is a mass collection of all the conspiracy theories currently
            in our database. There is also a drop-down menu that will filter the
            conspiracy theories based on it's primary subject (i.e. Politics,
            Science & Technology, Medicine, etc.).
          </p>
          <p className="library-descrip">
            The "See Details" button will allow you to view the following: a
            brief description of the conspiracy theory you've chosen, a form to
            submit a review for the chosen conspiracy theory, and all reviews
            and user comments related to the chosen conspiracy theory.
          </p>
          <p className="library-descrip">
            You must either register for an account or login to your existing
            account in order to submit a review and comment on other people's
            reviews. You may only submit one review per conspiracy theory.
          </p>
          <div id="dropdown">
            <div id="dropdown-button-container">
              <button id="dropdown-button">Select a Subject:</button>
            </div>
            <div className="dropdown-content">
              <a
                className="theory-type"
                onClick={() => {
                  setType(null);
                }}
              >
                All Theories (default)
              </a>
              <a
                className="theory-type"
                onClick={() => {
                  setType("Politics");
                }}
              >
                Politics
              </a>
              <a
                className="theory-type"
                onClick={() => {
                  setType("Science");
                }}
              >
                Science & Technology
              </a>
              <a
                className="theory-type"
                onClick={() => {
                  setType("Weather");
                }}
              >
                Weather
              </a>
              <a
                className="theory-type"
                onClick={() => {
                  setType("Aliens");
                }}
              >
                Aliens
              </a>
              <a
                className="theory-type"
                onClick={() => {
                  setType("Space");
                }}
              >
                Space
              </a>
              <a
                className="theory-type"
                onClick={() => {
                  setType("Society");
                }}
              >
                Society
              </a>
              <a
                className="theory-type"
                onClick={() => {
                  setType("Medicine");
                }}
              >
                Medicine
              </a>
              <a
                className="theory-type"
                onClick={() => {
                  setType("Religion");
                }}
              >
                Religion
              </a>
              <a
                className="theory-type"
                onClick={() => {
                  setType("CoverUps");
                }}
              >
                Cover-Ups
              </a>
            </div>
          </div>
        </div>
        {theoriesToDisplay?.map((theory) => (
          <div key={theory.id} className="theory-container">
            <div className="theory-title-container">
              <h2 className="theory-title">{theory.title}</h2>
            </div>
            <div className="theory-image-container">
              <img
                className="theory-image"
                src={theory.image_url}
                alt={theory.title}
              />
            </div>
            <div className="theory-details-container">
              {/* <p>Score: {theory.reviews.score}</p> */}
              <button
                onClick={() => navigate(`/theory/${theory.id}`)}
                className="details-button"
              >
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllTheories;
