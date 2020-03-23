  const {ApolloServer} = require('apollo-server')

  const typeDefs = require('./typeDefs')
  const resolvers = require('./resolvers')
  
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Shaian:<password>@sjtravels-ofgck.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true  });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


  const server = new ApolloServer({
    typeDefs,
    resolvers
  })

  server.listen().then(({url}) => {
    console.log(`Server listening on ${url}`)
  })