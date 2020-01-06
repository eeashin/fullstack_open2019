const blogs = [
    {
        title: "test blog 2",
        author: "eash",
        url: "www.eash.com",
        user: {
          username: "eash",
          name: "eash",
          _id: "5e08efb60a81d85f3475c165"
        },
        likes: 2,
        id: "5e08f0720a81d85f3475c167"
      },
      {
        title: "test blog 3",
        author: "eash",
        url: "www.eash.com",
        user: {
          username: "eash",
          name: "eash",
          id: "5e08efb60a81d85f3475c165"
        },
        likes: 0,
        id: "5e08f0760a81d85f3475c168"
      }
  ]
  const getAll = () => {
    return Promise.resolve(blogs)
  }
  const setToken = newToken => {
    let token = `bearer ${newToken}`
  }
  
  export default { getAll, setToken }
  
  