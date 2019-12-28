import React from 'react'

const BlogForm = ({
    handleBlog,
    title,
    author,
    url,
    handleTitle,
    handleAuthor,
    handleUrl
}) => (
        <div>
            <h1>Crate new</h1>
            <form onSubmit={handleBlog}>
                <p>title: <input value={title} onChange={handleTitle} /></p>
                <p>author: <input value={author} onChange={handleAuthor} /></p>
                <p>url: <input value={url} onChange={handleUrl} /></p>
                <button type="submit">create</button>
            </form>
        </div>
    )

export default BlogForm