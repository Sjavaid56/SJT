const user = {
  _id: '1',
  name: "shawn",
  email: "shawnjavaid@gmail.com",
  picture: "https://cloudinary.com//asdf"
}


module.exports = {
  Query:{
    me: () => user
  }
}