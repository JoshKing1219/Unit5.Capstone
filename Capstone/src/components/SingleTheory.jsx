import { useNavigate, useParams } from "react-router-dom";
import { useCreateReviewMutation, useGetTheoryQuery } from "../api/index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import RatingScorecard from "./RatingScorecard.jsx";
import StarRating from "./StarRating.jsx";
import { useState } from "react";

function SingleTheory({ token }) {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data = {}, err, isLoading, isSuccess } = useGetTheoryQuery(id);

  console.log(data);

  let message;

  if (isLoading) {
    message = "Loading details and reviews...";
  }

  if (err) {
    message = "Failed to load the details and reviews...";
  }

  const initialForm = {
    user_review: "",
  };

  const [error, setError] = useState(null);
  const [form, updateForm] = useState(initialForm);
  const [score, setScore] = useState(null);
  const [createReview] = useCreateReviewMutation();

  const handleChange = ({ target }) => {
    setError(null);
    updateForm({ ...form, [target.name]: target.value });
  };

  const handleSubmit = async (evnt) => {
    evnt.preventDefault();

    if (form.user_review === "" || score === null) {
      setError("Please write a review and give it a lil rating");
      return;
    }

    const { data, error } = await createReview({ id, form, score, token });

    if (error) {
      setError(error);
      return;
    }

    console.log(data);
    navigate(`/theory/${id}/reviews`);
  };

  const { user_review } = form;

  return (
    <section id="single-theory-page">
      <div id="return-container">
        <FontAwesomeIcon
          icon={faArrowRightToBracket}
          rotation={180}
          style={{ color: "#f7f7f7" }}
          id="return-button"
          onClick={() => navigate("/theories")}
        />
      </div>
      <div id="single-theory-intro-container">
        <h2 id="single-theory-intro-title">Your Chosen Conspiracy Theory</h2>
      </div>
      <div id="single-theory">
        {isLoading && <p>{message}</p>}
        {err && <p>{message}</p>}
        <div key={data.id} className="theory-card">
          <div id="theory-details-container">
            <img
              src={data.image_url}
              alt={data.title}
              className="theory-image"
            />
            <h3 id="theory-title">{data.title}</h3>
            <p id="theory-descrip">{data.description}</p>
          </div>
        </div>
        <div>
          <RatingScorecard reviews={data.reviews} />
          <div>
            <button
              id="reviews-portal-button"
              onClick={() => navigate(`/theory/${id}/reviews`)}
            >
              See All Reviews
            </button>
          </div>
        </div>
        {token && (
          <div id="review-form-container">
            <form id="review-form" onSubmit={handleSubmit}>
              <label name="user-review-input" id="user-review-label">
                Write a Review:
                <textarea
                  name="user_review"
                  value={user_review}
                  onChange={handleChange}
                  placeholder="Your review here..."
                  id="user-review-input"
                />
              </label>
              <div id="user-rating-container">
                <StarRating setScore={setScore} />
              </div>
              <button id="review-submission-button">Submit Review</button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

export default SingleTheory;
