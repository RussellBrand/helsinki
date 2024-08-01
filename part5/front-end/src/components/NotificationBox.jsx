const NotficationBox = ({ notification, kind }) => {
  if (notification === null) {
    return null;
  }
  const style =
    kind === "success"
      ? {
          color: "green",
          backgroundColor: "lightgreen",
          border: "2px solid green",
        }
      : {
          color: "red",
          backgroundColor: "pink",
          border: "2px solid red",
        };

  return (
    <div className="notification" style={style}>
      {notification}
    </div>
  );
};

export default NotficationBox;
