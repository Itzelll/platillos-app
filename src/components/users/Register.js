import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Alert, Button, Form, Container, Row, Col } from "react-bootstrap";

export function Register() {
  const { signup } = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(user.email, user.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6}>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="youremail@company.tld"
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="*************"
              />
            </Form.Group>

            <Button variant="primary" type="submit" style={{ margin: '5px, 10px, 5px, 5px'}}>
              Register
            </Button>
          </Form>

          <p>
            Already have an Account? 
            <br/>
            <Link to="/login" className="text-blue-700 hover:text-blue-900">
              Login
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}