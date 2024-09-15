import {
  useGetTheoryQuery,
  useCreateCommentMutation,
  useCreateReplyMutation,
  useDeleteCommentMutation,
} from "../api/index.js";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpaghettiMonsterFlying,
  faArrowTrendDown,
  faMagicWandSparkles,
  faStreetView,
  faArrowRightToBracket,
  faUserSecret,
  faArrowsTurnRight,
  faGhost,
  faSkullCrossbones,
} from "@fortawesome/free-solid-svg-icons";
import Comments from "./Comments.jsx";

function Reviews({ token, userId }) {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data = {}, err, isLoading, isSuccess } = useGetTheoryQuery(id);

  let message;

  if (isLoading) {
    message = "Loading details and reviews...";
  }

  if (err) {
    message = "Failed to load the details and reviews...";
  }

  const [showReviewUpdateForm, updateShowReviewUpdateForm] = useState(false);
  const [currentReviewIndex, updateCurrentReviewIndex] = useState(null);

  const handleEditClick = (index, reviewId) => {
    updateShowReviewUpdateForm(!showReviewUpdateForm);
    updateCurrentReviewIndex(index);
    updateCurrentReviewId(reviewId);
  };

  const [newUserReview, setNewUserReview] = useState("");

  const [showCommentForm, updateShowCommentForm] = useState(false);
  const [currentIndex, updateCurrentIndex] = useState(null);
  const [currentReviewId, updateCurrentReviewId] = useState(null);

  const handleClick = (index, reviewId) => {
    updateShowCommentForm(!showCommentForm);
    updateCurrentIndex(index);
    updateCurrentReviewId(reviewId);
  };

  const [createComment] = useCreateCommentMutation();
  const [comment, setComment] = useState("");

  const handleSubmit = async (evnt) => {
    evnt.preventDefault();

    await createComment({ id: currentReviewId, body: { comment }, token });

    updateShowCommentForm(false);
  };

  return (
    <section id="reviews-page">
      <div id="return-container">
        <FontAwesomeIcon
          icon={faArrowRightToBracket}
          rotation={180}
          style={{ color: "#f7f7f7" }}
          id="return-button"
          onClick={() => navigate(`/theory/${data.id}`)}
        />
      </div>

      <div id="secret-button-container">
        <FontAwesomeIcon
          icon={faSpaghettiMonsterFlying}
          style={{ color: "#ababab" }}
          id="secret-button-1"
        />
      </div>

      <div id="reviews-intro-container">
        <h2 id="reviews-intro-title">
          All Reviews For <br />
          Your Chosen Theory
        </h2>
      </div>
      <div key={data.id} className="theory-card">
        <div id="theory-details-container">
          <img src={data.image_url} alt={data.title} className="theory-image" />
          <h3 id="theory-title-2">{data.title}</h3>
        </div>
      </div>

      <div id="review-cards-container">
        {isLoading && <p>{message}</p>}
        {err && <p>{message}</p>}
        {data?.reviews?.map((review, index) => (
          <section>
            <div className="reviews-card" key={review.id}>
              {token && (
                <div className="edit-delete-container">
                  <FontAwesomeIcon
                    icon={faArrowTrendDown}
                    style={{ color: "#FFD43B" }}
                    className="comment-button"
                    onClick={() => handleClick(index, review.id)}
                  />
                  <div className="edit-delete-box">
                    <FontAwesomeIcon
                      icon={faMagicWandSparkles}
                      style={{
                        color: "firebrick",
                        display: review.user_id === userId ? "block" : "none",
                      }}
                      className="edit-button"
                      onClick={() => handleEditClick(index, review.id)}
                    />
                    <FontAwesomeIcon
                      icon={faSkullCrossbones}
                      style={{
                        color: "#ff8800",
                        display: review.user_id === userId ? "block" : "none",
                      }}
                      className="delete-button"
                    />
                  </div>
                </div>
              )}
              <div className="user-container">
                <div className="user-box">
                  <FontAwesomeIcon
                    icon={faStreetView}
                    style={{ color: "#ff0000" }}
                    className="user-icon"
                  />
                  <p className="reviews-username">{review.user.username}</p>
                </div>

                {showReviewUpdateForm && currentReviewIndex === index ? (
                  <div className="edit-review-container">
                    <form onSubmit={handleSubmit} className="edit-review-form">
                      <label className="edit-review-label">
                        <input
                          name="user_review"
                          value={newUserReview}
                          placeholder={review.user_review}
                          onChange={(evnt) =>
                            setNewUserReview(evnt.target.value)
                          }
                          className="edit-review-input"
                        />
                      </label>
                      <button className="edit-review-submit-button">
                        Submit
                      </button>
                    </form>
                  </div>
                ) : (
                  <p className="reviews-info">{review.user_review}</p>
                )}
              </div>
            </div>
            <div
              className="comment-form-container"
              style={{
                display:
                  showCommentForm && currentIndex === index ? "block" : "none",
              }}
            >
              <form onSubmit={handleSubmit} className="comment-form">
                <label className="comment-form-label">
                  <input
                    name="comment"
                    value={comment}
                    placeholder="Your comment here..."
                    onChange={(evnt) => setComment(evnt.target.value)}
                    className="comment-form-input"
                  />
                </label>
                <button className="comment-form-submit-button">Submit</button>
              </form>
            </div>
            <div className="comments-container">
              <Comments
                comments={review.comments}
                token={token}
                userId={userId}
              />
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

export default Reviews;
