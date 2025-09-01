import { useState, useEffect, useRef } from "react";
import { FaCheck, FaTimes, FaEdit, FaTrash, FaUndo, FaSpinner } from "react-icons/fa";
import PropTypes from 'prop-types';

function TodoCard({ todo, onToggle, onDelete, onUpdate }) {
  const { id, title, description, completed } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const titleInputRef = useRef(null);

  useEffect(() => {
    if (isEditing && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = async () => {
    if (!editTitle.trim()) {
      alert("Title cannot be empty");
      return;
    }
    setIsLoading(true);
    try {
      await onUpdate(id, { title: editTitle, description: editDescription });
      setIsEditing(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
      setEditTitle(title);
      setEditDescription(description);
    }
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSave();
    }
  };

  const handleToggle = async () => {
    const originalCompleted = completed;
    try {
      await onToggle(id, !completed);
    } catch {
      // Revert if API call fails
      onToggle(id, originalCompleted);
    }
  };

  return (
    <div className={`todo-card ${completed ? "completed" : ""}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={titleInputRef}
            aria-label="Edit todo title"
            maxLength={100}
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Edit todo description"
            maxLength={500}
          />
          <div className="actions">
            <button 
              onClick={handleSave} 
              className="success tooltip" 
              disabled={isLoading}
              aria-label="Save changes"
            >
              {isLoading ? <FaSpinner className="spin" /> : <FaCheck />}
              <span className="tooltip-text">Save changes (Ctrl+Enter)</span>
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditTitle(title);
                setEditDescription(description);
              }}
              className="secondary tooltip"
              disabled={isLoading}
              aria-label="Cancel editing"
            >
              <FaTimes />
              <span className="tooltip-text">Cancel (Esc)</span>
            </button>
          </div>
        </>
      ) : (
        <>
          <h3>{title}</h3>
          <p>{description}</p>
          <div className="actions">
            <button
              onClick={handleToggle}
              className="success tooltip"
              aria-label={completed ? "Mark as incomplete" : "Mark as complete"}
            >
              {completed ? <FaUndo /> : <FaCheck />}
              <span className="tooltip-text">
                {completed ? "Mark as Incomplete" : "Mark as Complete"}
              </span>
            </button>

            <button
              onClick={() => setIsEditing(true)}
              className="secondary tooltip"
              aria-label="Edit todo"
            >
              <FaEdit />
              <span className="tooltip-text">Edit Todo</span>
            </button>

            <button 
              onClick={() => setShowDeleteConfirm(true)} 
              className="danger tooltip"
              aria-label="Delete todo"
            >
              <FaTrash />
              <span className="tooltip-text">Delete Todo</span>
            </button>
          </div>
        </>
      )}

      {showDeleteConfirm && (
        <div className="confirmation-modal">
          <p>Are you sure you want to delete this todo?</p>
          <div className="modal-actions">
            <button 
              onClick={() => {
                onDelete(id);
                setShowDeleteConfirm(false);
              }}
              className="danger"
            >
              Yes, Delete
            </button>
            <button 
              onClick={() => setShowDeleteConfirm(false)}
              className="secondary"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

TodoCard.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    completed: PropTypes.bool.isRequired
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default TodoCard;