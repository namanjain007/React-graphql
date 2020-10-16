import React from 'react';
import { graphql} from '@apollo/react-hoc' ;
import { getBookQuery } from '../queries/queries' ;

class BookDetails extends React.Component{
    showDetails(){
        const { book } = this.props.data;
        if(book){
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>{book.author.age}</p>
                    <p>All other books of this author are</p>
                    <ul className="other-books">
                        {book.author.booksofthisauthor.map(thisbook => {
                            return (<li key={thisbook._id} >{thisbook.name}</li>);
                        })}
                    </ul>
                </div>
            )
        }
        else {
            return (
                <div>No book selected...</div>
            )
        }
    }
    render(){
        return (
            <div>
                {this.showDetails()}
            </div>
        );
    }
}

export default graphql(getBookQuery,{
    options : (props) => {
        return {
            variables: {
                id : props.bookid
            }
        }
    }
})(BookDetails);