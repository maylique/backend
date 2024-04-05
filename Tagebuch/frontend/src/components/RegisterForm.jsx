import { useRef } from "react";

const RegisterForm = ({ postRegistration }) => {
  const emailRef = useRef();
  const nameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const password = passwordRef.current.value;

    postRegistration(email, name, password);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input ref={emailRef} type="email" name="email" placeholder="Email" />
        <input
          ref={nameRef}
          type="text"
          name="username"
          placeholder="Username"
        />
        <input
          ref={passwordRef}
          type="password"
          name="password"
          placeholder="Passwort"
        />
        <button>Submit</button>
      </form>
    </>
  );
};

export default RegisterForm;
