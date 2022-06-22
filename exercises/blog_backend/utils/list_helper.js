// eslint-disable-next-line no-unused-vars
const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = blogs => {
  const initalLike = 0
    
  return blogs.reduce((previousValue, currentValue) => previousValue + currentValue.likes, initalLike)
}

const favoriteBlogs = (blogs => {
  let initalLike = 0
  let favBlog = { title:'', author:'', likes:0 }

  blogs.reduce((previousValue, currentValue, index) => {
    if(initalLike < currentValue.likes){
      initalLike = currentValue.likes
      favBlog.title=  blogs[index].title
      favBlog.author = blogs[index].author
      favBlog.likes = blogs[index].likes
    }
  }, initalLike)

  return favBlog
})

const mostBlogs = blogs => {
  let maxBlogs = 0
  let maxBlogsIndex = 0
  const authorsMap = []

  // populates authorsMap
  blogs.map((blog) => {
    // returns the index of the current blog author from authorsMap array; if -1 then no author exists
    let authorIndex = _.findIndex(authorsMap, element => _.isEqual(element.author, blog.author))

    if( authorIndex !== -1){
      authorsMap[authorIndex].blogs += 1

      // checks if the current author has the most blogs
      if(maxBlogs < authorsMap[authorIndex].blogs){
        maxBlogs = authorsMap[authorIndex].blogs
        maxBlogsIndex = authorIndex
      }

    }
    else {
      authorsMap.push({ author: blog.author, blogs: 1 })
    }
  })

  // console.log(authorsMap)

  return authorsMap[maxBlogsIndex]
}

const mostBlogLikes = blogs => {
  let mostLikes = 0
  let authorIndex = 0

  blogs.forEach((blog, index) => {
    if(mostLikes < blog.likes){
      mostLikes = blog.likes
      authorIndex = index
    }
  })

  return { title: blogs[authorIndex].title,
    author: blogs[authorIndex].author,
    likes: blogs[authorIndex].likes }
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlogs,
  mostBlogs,
  mostBlogLikes,
}
