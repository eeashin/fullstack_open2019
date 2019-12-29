import React from 'react'
import SimpleBlog from './SimpleBlog'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent  } from '@testing-library/react'

test('renders content', () => {

  const testBlog = {
    title: 'test simple blog',
    author: 'hki eash',
    likes: 1000
  }

  const component = render(
    <SimpleBlog blog={testBlog}></SimpleBlog>
  )
//   expect(component.container).toHaveTextContent('test simple blog')
//   expect(component.container).toHaveTextContent('hki eash')
//   expect(component.container).toHaveTextContent(1000)
  expect(component.container).toHaveTextContent(`${testBlog.title}`)
  expect(component.container).toHaveTextContent(`${testBlog.author}`)
  expect(component.container).toHaveTextContent(`blog has ${testBlog.likes}`)
})

test('like button of a component is pressed twice', () => {
    
    const testBlog = {
        title: 'test simple blog',
        author: 'hki eash',
        likes: 1000
      }
  
    const mockFunction = jest.fn()
  
    const { getByText } = render(
      <SimpleBlog blog={testBlog} onClick={mockFunction}/>
    )
  
    const button = getByText('like')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockFunction.mock.calls.length).toBe(2)
  
  })