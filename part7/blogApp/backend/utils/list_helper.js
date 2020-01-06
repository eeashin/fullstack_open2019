
var lodash = require('lodash')
const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => blogs.reduce((n, blog) => n + blog.likes, 0)

const favoriteBlog = (blogs) => {
    let favBlog = {likes: 0}
    blogs.filter(blog => {
      if (blog.likes > favBlog.likes) {
        favBlog = blog
      }
    })
    return favBlog
  }

  const mostBlogs = (blogs) => {
    let maxAuthor = []
    const blogArr = lodash.groupBy(blogs, 'author')
    lodash.map(blogArr, author => {
        if(author.length > maxAuthor.length) {
            maxAuthor = author
        }
    })
    return {
        author: maxAuthor[0].author,
        blogs: maxAuthor.length
    }
}

const mostLikes = (blogs) => {
    let  blogArr = []
    
    blogs = lodash.groupBy(blogs, 'author')
    
    lodash.map(blogs, auth => {
        let count = 0
        
        auth.map(blog => count += blog.likes)
        blogArr.push({
            author: auth[0].author,
            likes: count
        }) 
    })

    blogArr = lodash.maxBy(blogArr, author => author.likes)

    console.log(blogArr)
    return blogArr
}


module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }