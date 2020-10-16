const graphql = require('graphql');
const _ = require('lodash');
const Book = require('./database/book');
const Author = require('./database/author');

//ES6 Syntax of named import
const { GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID , 
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
    }  = graphql;

//create types of records
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({// arrow funtion because the order of BookType and Authtype will always create errors if executed from one flow..
        name : {type : GraphQLString},
        genre : {type : GraphQLString},
        authorid : {type : GraphQLID},
        _id : {type : GraphQLID},
        author : {
            type: AuthorType,
            resolve(parent,args){
                //console.log(parent);//parent contains all the data from the previouis node in graph
                return Author.findById(parent.authorid);
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({// arrow funtion because the order of BookType and Authtype will always create errors if executed from one flow..
        name : {type : GraphQLString},
        age : {type : GraphQLInt},
        _id : {type : GraphQLString},
        booksofthisauthor : {
            type : new GraphQLList(BookType),
            resolve(parent,args){
                return Book.find({authorid : parent._id});
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book : {
            type : BookType,
            args : {
                id: { 
                    type: GraphQLID
                }
            },
            resolve(parent,args){
                //Code to get the data from db/
                return Book.findById(args.id);
            }
        },
        author : {
            type : AuthorType,
            args : {
                id: { 
                    type: GraphQLID
                }
            },
            resolve(parent,args){
                //Code to get the data from db/
                return Author.findById(args.id);
            }
        },
        books : {
            type : new GraphQLList(BookType),
            resolve(parent,args){
                return Book.find({});
            }
        },
        authors : {
            type : new GraphQLList(AuthorType),
            resolve(parent,args){
                return Author.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name : 'Mutation',
    fields: () => ({
        addAuthor:{
            type: AuthorType,
            args: {
                name: {type : new GraphQLNonNull(GraphQLString) },
                age: {type :new GraphQLNonNull( GraphQLInt) }
            },
            resolve(parent,args){
                let author = new Author({
                    name : args.name,
                    age : args.age,
                });
                return author.save();
            }
        },
        addBook:{
            type: BookType,
            args: {
                name: {type : new GraphQLNonNull(GraphQLString) },
                genre: {type : new GraphQLNonNull(GraphQLString) },
                authorid: {type : new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent,args){
                let book = new Book({
                    name : args.name,
                    genre : args.genre,
                    authorid: args.authorid
                });
                return book.save();
            }
        }
    })
});

module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation : Mutation
});