import { useRef } from "react";

const LoginForm = ({ postLogin }) => {
  const nameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = () => {
    // TODO: Hier Login implementieren
  };
  return (
    <form onSubmit={handleSubmit}>
      <input ref={nameRef} type="text" name="username" placeholder="Username" />
      <input
        ref={passwordRef}
        type="password"
        name="password"
        placeholder="Passwort"
      />
      <button>Submit</button>
    </form>
  );
};

export default LoginForm;
