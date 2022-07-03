import CommentForm from "./commentform";
import './comment.css'
const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId = null,
  currentUsername,
  isUser
}) => {
  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  
// we should take care after the users login if the current user name === comment.username 
// then they can delete or edit the comment.
  const canDelete = currentUsername === comment.username ;
  const canReply = false ? currentUsername === comment.username : true;
  const canEdit = currentUsername === comment.username ;
  const replyId = parentId ? parentId : comment.id;
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  console.log(isUser, "from comment")
  return (
    <div className="comment-container">
      <div key={comment.id} className="comment">
        <div className="comment-image-container">
          <img src="https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg" 
          style={{height:"20px", width:"20px"}}
          />
        </div>
        <div className="comment-right-part">
          <div className="comment-content">
            <div className="comment-author">{comment.username}</div>
            <div>{createdAt}</div>
          </div>
          {!isEditing && <div className="comment-text">{comment.body}</div>}
          {isEditing && (
            <CommentForm
              isUser={isUser}
              submitLabel="Update"
              hasCancelButton
              initialText={comment.body}
              handleSubmit={(text) => updateComment(text, comment.id)}
              handleCancel={() => {
                setActiveComment(null);
              }}
            />
          )}
          <div className="comment-actions">
            {canReply && (
              <div
                className="comment-action"
                onClick={() =>
                  setActiveComment({ id: comment.id, type: "replying" })
                }
              >
                Reply
              </div>
            )}
            {canEdit && (
              <div
                className="comment-action"
                onClick={() =>{
                  
                  setActiveComment({ id: comment.id, type: "editing" });
                  
                }     }
              >
                Edit
              </div>
            )}
            {canDelete && (
              <div
                className="comment-action"
                onClick={() => {deleteComment(comment.id)
                  
                }
            }
              >
                Delete
              </div>
            )}
          </div>
          {isReplying && (
            <CommentForm
              submitLabel="Reply"
              handleSubmit={(text) => addComment(text, replyId)}
              isUser={isUser}
            />
          )}
          {replies.length > 0 && (
            <div className="replies">
              {replies.map((reply) => (
                <Comment
                  comment={reply}
                  key={reply.id}
                  setActiveComment={setActiveComment}
                  activeComment={activeComment}
                  updateComment={updateComment}
                  deleteComment={deleteComment}
                  addComment={addComment}
                  parentId={comment.id}
                  replies={[ ]}
                  currentUsername={currentUsername}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;