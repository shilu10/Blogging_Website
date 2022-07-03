import { useState } from "react";
import './comment.css';
import toast, { Toaster } from "react-hot-toast";

const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
  isUser
}) => {
  
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };

  const isLoggedIn = () => {
    if(!isUser){
      return true
    }
    return false
  }

  return (
    <div>
      <Toaster />
      <form onSubmit={onSubmit}>
        <textarea
          className="comment-form-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isLoggedIn()}
          onMouseOver={()=>{
            var count = 0
            if(!isUser && count===0){
              console.log("clicked")
              toast('Please Login to Make an comment',
                  {
                    icon: '👏',
                    style: {
                      borderRadius: '10px',
                      background: '#333',
                      color: '#fff',
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    }}
                )};  
                count+=1;}}
        />
        <button className="comment-form-button" disabled={isTextareaDisabled}>
          {submitLabel}
        </button>
        {hasCancelButton && (
          <button
            type="button"
            className="comment-form-button comment-form-cancel-button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default CommentForm;