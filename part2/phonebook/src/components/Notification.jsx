const Notification = ({ message }) => {
  const notificationStyle = {
    color: "green",
    background: "lightgray",
    fontSize: 20,
    border: "5px solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  if (message === null) {
    return null;
  }

  return (
    <div style={notificationStyle} className="error">
      {message}
    </div>
  );
};

export default Notification;
