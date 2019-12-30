import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

const originalError = console.error;
beforeAll(() => {
    console.error = (...args) => {
        if (/Warning.*not wrapped in act/.test(args[0])) {
            return;
        }
        originalError.call(console, ...args);
    };
});

afterAll(() => {
    console.error = originalError;
});


describe('<App />', () => {
  test('if no user logged in', async () => {
    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )
    expect(component.container.getElementsByClassName('blog').length).toBe(0)
  })

  test('if a user is logged in', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedUser', JSON.stringify(user))
    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )
    expect(component.container.toHaveStyle('blogStyle').length).toBe(6)
  })
})