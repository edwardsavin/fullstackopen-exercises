const Notification = ({ message, notificationType }) => {
  let defaultStyle = {
    color: "green",
    background: "lightgray",
    fontSize: 20,
    border: "5px solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  if (notificationType === "error") {
    defaultStyle = {
      ...defaultStyle,
      color: "red",
    };
  } else {
    defaultStyle = defaultStyle;
  }

  if (message === null) {
    return null;
  }
  return (
    <div style={defaultStyle} className={notificationType}>
      {message}
    </div>
  );
};

export default Notification;
