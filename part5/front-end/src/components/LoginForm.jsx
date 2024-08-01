const LoginForm = ({
  username,
  handleUsernameChange,
  password,
  handlePasswordChange,
  handleSubmit,
}) => {
  return (
    <div style={{ background: "yellow" }}>
      I am the login form -- root -- Sekret"
      <form>
        <div>
          Username:{" "}
          <input
            type="text"
            value={username}
            onChange={(e) => handleUsernameChange(e)}
          />
        </div>
        <div>
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => handlePasswordChange(e)}
          />
        </div>
        <button
          type="submit"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Login
        </button>
      </form>
      <br />
    </div>
  );
};

export default LoginForm;
