function DeleteTask({ id, onDelete }) {
  return (
    <button onClick={() => onDelete(id)}>
      Delete
    </button>
  );
}
 
export default DeleteTask;