import { useGetUserQuery } from "../api/index.js";
import { useNavigate } from "react-router-dom";

function UserAccount({ token }) {
  const navigate = useNavigate();

  if (!token) {
    navigate("/");
  }

  const { data = {}, error, isLoading, isSuccess } = useGetUserQuery(token);

  console.log(data);
  let message;

  if (isLoading) {
    message = "Loading your account details...";
  }

  if (error) {
    message = "Failed to load your account details. Please try again.";
  }

  return (
    <section id="user-account-page">
      <div id="account-intro-container">
        <h2 id="account-intro-title">My Account</h2>
        <p className="account-intro-descrip">
          All of your personal information is strictly confidential and will
          never be shared or sold.
        </p>
      </div>
      <div id="account-details-container" key={data.id}>
        <h3 id="account-details-title">My Information</h3>
        <p className="user-information">
          <strong>Username:</strong> {data.username}
        </p>
        <p className="user-information">
          <strong>First Name:</strong> {data.first_name}
        </p>
        <p className="user-information">
          <strong>Last Name:</strong> {data.last_name}
        </p>
        <p className="user-information">
          <strong>Email:</strong> {data.email}
        </p>
      </div>
      <div id="user-reviews-container">
        <div id="user-reviews-intro">
          <h3 id="user-reviews-title">My Reviews</h3>
        </div>
        {data?.reviews?.map((userReview) => (
          <div className="user-reviews" key={userReview.id}>
            <p className="user-reviews-info">
              <strong>Theory:</strong> {userReview.theory.title}
            </p>
            <p className="user-reviews-info">
              <strong>My Review:</strong> {userReview.user_review}
            </p>
            <p className="user-reviews-score">
              <strong>Score:</strong> {userReview.score}/5
            </p>
          </div>
        ))}
      </div>
      <div id="user-comments-container">
        <div id="user-comments-intro">
          <h3 id="user-comments-title">My Comments</h3>
        </div>
        {data?.comments?.map((userComment) => (
          <div className="user-comments" key={userComment.id}>
            <p className="user-comments-info">
              <strong>Theory:</strong> {userComment.review.theory.title}
            </p>
            <p className="user-comments-info">
              <strong>Original Review:</strong> {userComment.review.user_review}
            </p>
            <p className="user-comment-info">
              <strong>My Comment:</strong> {userComment.comment}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default UserAccount;
