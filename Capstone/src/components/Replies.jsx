import {
  faMagicWandSparkles,
  faGhost,
  faSkullCrossbones,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import {
  useDeleteReplyMutation,
  useUpdateReplyMutation,
} from "../api/index.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Replies({ replies, token, userId }) {
  // console.log(replies);
  const [newUserReply, setNewUserReply] = useState("");

  const [currentReplyId, updateCurrentReplyId] = useState(null);

  const [showReplyUpdateForm, updateShowReplyUpdateForm] = useState(false);

  const handleEditReplyClick = (reply) => {
    updateShowReplyUpdateForm(!showReplyUpdateForm);
    updateCurrentReplyId(reply.id);
    setNewUserReply(reply.reply);
  };

  const [deleteReply] = useDeleteReplyMutation();

  const handleDeleteReplyClick = async (replyId) => {
    await deleteReply({ id: replyId, token });
  };

  const textAreaRef = useRef(null);

  const resizeTextArea = () => {
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  };

  useEffect(() => {
    textAreaRef.current = { style: { height: "auto" }, scrollHeight: 10 };
  }, []);
  useEffect(resizeTextArea, [newUserReply]);

  const [newReply] = useUpdateReplyMutation();

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    await newReply({
      id: currentReplyId,
      body: { reply: newUserReply },
      token,
    });

    updateShowReplyUpdateForm(false);
  };

  if (!replies) {
    return <span></span>;
  }

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
                    onClick={() => handleEditReplyClick(comment_reply)}
                  />
                  <FontAwesomeIcon
                    icon={faSkullCrossbones}
                    style={{
                      color: "#ff8800",
                      display:
                        comment_reply.replier_id === userId ? "block" : "none",
                    }}
                    className="delete-button"
                    onClick={() => handleDeleteReplyClick(comment_reply.id)}
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

              {showReplyUpdateForm && currentReplyId === comment_reply.id ? (
                <div className="edit-reply-container">
                  <form
                    className="edit-reply-form"
                    onSubmit={handleUpdateSubmit}
                  >
                    <label className="edit-reply-label">
                      <textarea
                        name="user_reply"
                        value={newUserReply}
                        ref={textAreaRef}
                        onChange={(evnt) => setNewUserReply(evnt.target.value)}
                        className="edit-reply-input"
                      />
                    </label>
                    <button className="edit-reply-submit-button">Submit</button>
                  </form>
                </div>
              ) : (
                <p className="replies-info">{comment_reply.reply}</p>
              )}
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
