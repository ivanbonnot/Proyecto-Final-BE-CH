
const { buildSchema } = require('graphql')

const schemaProduct = buildSchema (`
    type Product {
        timestamp: String!,
        title: String!, 
        thumbnail: String!,
        description: String,
        stock: Int,
        code: String,
        price: Int!
    }

    input ProductInput {
        timestamp: String!,
        title: String!, 
        thumbnail: String!,
        description: String,
        stock: Int,
        code: String,
        price: Int!
    }

    type Query {
        getProduct(_id: id)
    }
    
    
    
    `
)

const schemaUser = buildSchema (`
  
    
    type User {
        timestamp: String!,
        username: String!,
        password: String!
        email: String!,
        adress: String!,
        phone: String!,
        avatar: String,
        cartId: String!
    }

    
    `
)

const schemaChat = buildSchema (`
   

    type Chat {
        author: Author!
        text: String!
        date: String!
      }
      
      type Author {
        email: String!
        name: String!
        lastname: String!
        age: Int!
        nickname: String!
        avatar: String!
      }
    
    `
)