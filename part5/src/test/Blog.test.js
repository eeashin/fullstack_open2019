import React from 'react'
import Blog from '../components/Blog'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

const testBlog = [{

    title: "Test Title",
    author: "Test Writer",
    url: "https://www.test.fi",
    likes: 99,
    user: {
        username: "user"
    }
}];


const mocFunction = jest.fn()

test("name and author of the blog post shown",() => {
    testBlog.map( blog =>{
        const component = render(
            <Blog blogs={testBlog} user={thisUserName} deleteList={mocFunction} />  
        );

        expect(component.container).toHaveTextContent(`${m.title}${m.author}`);
        expect(component.getByTestId("visible")).toBeVisible(); 


    })

});