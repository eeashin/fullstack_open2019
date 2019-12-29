import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'


afterEach(cleanup)

describe('<Blog />', () => {
  let component

  const blog = {
    title: 'its a blog testing!',
    author: 'eash',
    url: 'eash.fi',
    likes: 1,
    user: {
      name: 'eash'
    }
  }

  beforeEach(() => {

    component = render(
      <Blog blog={blog} />
    )
  })

  test(' Blog component invisible toggleable', () => {
    const div =  component.container.querySelectorAll('div')
    expect(div[2]).toHaveStyle('display: none')
  })

  test('title and author shown', () => {
    const div =  component.container.querySelectorAll('div')

    expect(div[0]).toHaveStyle('display: block')
    expect(div[1]).toHaveTextContent('its a blog testing!')
  })

  test('on click visible', () => {
    const fire = component.container.querySelector('div')
    fireEvent.click(fire)
    const div =  component.container.querySelectorAll('div')

    expect(div[2]).toHaveStyle('display: none')
    expect(div[1]).toHaveStyle('display: block')
    expect(div[1]).toHaveTextContent('its a blog testing!')

  })

 
})