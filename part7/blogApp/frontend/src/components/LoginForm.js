import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ handleLogin, username, password, setUsername, setPassword }) => (

    <Form onSubmit={handleLogin}>
        <h1>log in to application</h1>
        <Form.Group>
            <Form.Label>username</Form.Label>
            <Form.Control
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
            />
            
            <Form.Label> password </Form.Label>

            <Form.Control
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
            />

        </Form.Group>

        <Button variant="primary" type="submit">login</Button>
    </Form>
)
LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired
}

export default LoginForm