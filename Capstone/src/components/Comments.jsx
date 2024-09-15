import {
  faMagicWandSparkles,
  faUserSecret,
  faArrowsTurnRight,
  faSkullCrossbones,
} from "@fortawesome/free-solid-svg-icons";
import {
  useCreateReplyMutation,
  useDeleteCommentMutation,
} from "../api/index.js";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Replies from "./Replies";

export default function Comments({ comments, token, userId }) {
  console.log(comments);
  if (!comments) {
    return <span></span>;
  }
  const [newUserComment, setNewUserComment] = useState("");
  const [showReplyForm, updateShowReplyForm] = useState(false);

  const [reply, setReply] = useState("");

  const [currentCommentId, updateCurrentCommentId] = useState(null);
  const [idForDelete, setIdForDelete] = useState("");

  const [showCommentUpdateForm, updateShowCommentUpdateForm] = useState(false);

  const handleEditCommentClick = (commentId) => {
    updateShowCommentUpdateForm(!showCommentUpdateForm);
    updateCurrentCommentId(commentId);
  };

  const [createReply] = useCreateReplyMutation();

  const handleReplySubmit = async (event) => {
    event.preventDefault();

    await createReply({ id: currentCommentId, body: { reply }, token });

    updateShowReplyForm(false);
  };

  const handleReplyClick = (commentId) => {
    updateShowReplyForm(!showReplyForm);
    updateCurrentCommentId(commentId);
  };

  const [deleteComment] = useDeleteCommentMutation();

  const handleDeleteCommentClick = async (commentId) => {
    setIdForDelete(commentId);
    await deleteComment({ id: idForDelete, token });
  };

  return (
    <div className="comment-cards-container">
      {comments.length > 0 ? (
        comments?.map((review_comment) => (
          <div className="comments-container">
            <article className="comments-card-box">
              <div className="comments-card" key={review_comment.id}>
                {token && (
                  <div className="edit-delete-container-2">
                    <FontAwesomeIcon
                      icon={faArrowsTurnRight}
                      flip="vertical"
                      style={{ color: "#ff7b00" }}
                      className="reply-button"
                      onClick={() => handleReplyClick(review_comment.id)}
                    />
                    <div className="edit-delete-box-2">
                      <FontAwesomeIcon
                        icon={faMagicWandSparkles}
                        style={{
                          color: "firebrick",
                          display:
                            review_comment.author_id === userId
                              ? "block"
                              : "none",
                        }}
                        className="edit-button"
                        onClick={() =>
                          handleEditCommentClick(review_comment.id)
                        }
                      />
                      <FontAwesomeIcon
                        icon={faSkullCrossbones}
                        style={{
                          color: "#ff8800",
                          display:
                            review_comment.author_id === userId
                              ? "block"
                              : "none",
                        }}
                        className="delete-button"
                        onClick={() =>
                          handleDeleteCommentClick(review_comment.id)
                        }
                      />
                    </div>
                  </div>
                )}
                <div className="user-container">
                  <div className="user-box">
                    <FontAwesomeIcon
                      icon={faUserSecret}
                      style={{ color: "#1100ff" }}
                      className="user-icon"
                    />
                    <p className="comments-username">
                      {review_comment.author?.username}
                    </p>
                  </div>

                  {showCommentUpdateForm &&
                  currentCommentId === review_comment.id ? (
                    <div className="edit-comment-container">
                      <form className="edit-comment-form">
                        <label className="edit-comment-label">
                          <input
                            name="user_review"
                            value={newUserComment}
                            placeholder={review_comment.comment}
                            onChange={(evnt) =>
                              setNewUserComment(evnt.target.value)
                            }
                            className="edit-comment-input"
                          />
                        </label>
                        <button className="edit-comment-submit-button">
                          Submit
                        </button>
                      </form>
                    </div>
                  ) : (
                    <p className="comments-info">{review_comment.comment}</p>
                  )}
                </div>
              </div>
              <div
                className="reply-form-container"
                style={{
                  display:
                    showReplyForm && currentCommentId === review_comment.id
                      ? "block"
                      : "none",
                }}
              >
                <form onSubmit={handleReplySubmit} className="reply-form">
                  <label className="reply-label">
                    <input
                      name="reply"
                      value={reply}
                      placeholder="Your reply here..."
                      onChange={(evnt) => setReply(evnt.target.value)}
                      className="reply-input"
                    />
                  </label>
                  <button className="reply-submit-button">Submit</button>
                </form>
              </div>
              <div className="replies-container">
                <Replies
                  replies={review_comment.replies}
                  token={token}
                  userId={userId}
                />
              </div>
            </article>
          </div>
        ))
      ) : (
        <div className="comments-fireback-container">
          <div className="comments-fireback-sidebar-l"></div>
          <p className="comments-fireback">No comments</p>
          <div className="comments-fireback-sidebar-r"></div>
        </div>
      )}
    </div>
  );
}
