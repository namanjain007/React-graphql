import { gql } from '@apollo/client';

const getAuthors = gql`
{
    authors{
        name
        age
        _id
    }
}`;

const getBooksQuery = gql`
{
    books{
        name
        genre
        authorid
        _id
    }
}`;

const getBookQuery = gql`
query($id : ID!){
    book(id : $id){
        name
        genre
        author{
            name
            age
            booksofthisauthor{
                name
                genre
                _id
            }
        }
    }   
    }`;

const addBookMutationQuery = gql`
 mutation($name : String!,$genre : String!,$authorid : ID!){
    addBook(name: $name,genre: $genre,authorid : $authorid){
        name
        genre
        authorid
    }
  }`;

export {getBooksQuery , getAuthors, addBookMutationQuery, getBookQuery};