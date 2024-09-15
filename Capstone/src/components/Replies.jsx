import {
  faMagicWandSparkles,
  faGhost,
  faSkullCrossbones,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Replies({ replies, token, userId }) {
  console.log(replies);
  if (!replies) {
    return <span></span>;
  }

  const [showReviewUpdateForm, updateShowReviewUpdateForm] = useState(false);
  const [currentReviewIndex, updateCurrentReviewIndex] = useState(null);

  const handleEditClick = (index, reviewId) => {
    updateShowReviewUpdateForm(!showReviewUpdateForm);
    updateCurrentReviewIndex(index);
    updateCurrentReviewId(reviewId);
  };
  
  return (
    <div id="reply-cards-container">
      {replies.length > 0 ? (
        replies?.map((comment_reply) => (
          <div className="replies-card" key={comment_reply.id}>
            {token && (
              <div className="edit-delete-container-3">
                <div className="edit-delete-box-3">
                  <FontAwesomeIcon
                    icon={faMagicWandSparkles}
                    style={{
                      color: "firebrick",
                      display:
                        comment_reply.replier_id === userId ? "block" : "none",
                    }}
                    className="edit-button"
                    onClick={() => handleEditClick(index, review.id)}
                  />
                  <FontAwesomeIcon
                    icon={faSkullCrossbones}
                    style={{
                      color: "#ff8800",
                      display:
                        comment_reply.replier_id === userId ? "block" : "none",
                    }}
                    className="delete-button"
                  />
                </div>
              </div>
            )}
            <div className="user-container">
              <div className="user-box">
                <FontAwesomeIcon
                  icon={faGhost}
                  style={{ color: "#7fff00" }}
                  className="user-icon"
                />
                <p className="replies-username">
                  {comment_reply.replier?.username}
                </p>
              </div>

              <p className="replies-info">{comment_reply.reply}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="replies-fireback-container">
          <div className="replies-fireback-sidebar-l"></div>
          <p className="replies-fireback">No replies</p>
          <div className="replies-fireback-sidebar-r"></div>
        </div>
      )}
    </div>
  );
}
