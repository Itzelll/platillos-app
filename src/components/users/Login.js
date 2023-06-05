import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Alert } from "./Alert";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
export function Login() {

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { login, loginWithGoogle} = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = ({ target: { value, name } }) =>
    setUser({ ...user, [name]: value });

  const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };


  return (
    <Container>
    {error && <Alert message={error} />}

    <Row className="justify-content-center">
      <Col md={6}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="youremail@company.tld"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="*************"
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" style={{ margin: '10px, 10px, 5px, 5px' }}>
            Sign In
          </Button>
        </Form>

        <Button variant="secondary" onClick={handleGoogleSignin} style={{ margin: '10px, 10px, 5px, 5px'}}>
          Google Login
        </Button>

        <p>
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-700 hover:text-blue-900">
            Register
          </Link>
        </p>
      </Col>
    </Row>
  </Container>
  );
}