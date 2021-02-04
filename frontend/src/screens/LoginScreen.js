import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { login } from '../actions/userActions';
import {
  StyledContainerDiv,
  StyledContainerDiv2,
  StyledHeader,
} from '../util/StyledComponents';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search
    ? location.search.split('=')[1]
    : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <StyledContainerDiv>
      <StyledContainerDiv2>
        <StyledHeader>LOGIN</StyledHeader>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="danger" block>
            LOGIN
          </Button>
        </Form>

        <div style={{ textAlign: 'center' }}>
          <Row className="py-3">
            <Col>
              <a
                href="/"
                style={{
                  color: 'black',
                  textDecoration: 'underline',
                }}
              >
                Forgot Password?
              </a>
            </Col>
          </Row>

          <Row className="py-1">
            <Col>
              {`Don't have an account?`}{' '}
              <Link
                to={
                  redirect
                    ? `/register?redirect=${redirect}`
                    : '/register'
                }
                style={{ color: 'blue', textDecoration: 'underline' }}
              >
                Sign Up
              </Link>
            </Col>
          </Row>
        </div>
      </StyledContainerDiv2>
    </StyledContainerDiv>
  );
};

export default LoginScreen;
