import React from 'react';
import { getBooksQuery } from '../queries/queries';
import {graphql} from '@apollo/react-hoc';
import BookDetails from './BookDetails';


class BookList extends React.Component{ 
    constructor(props){
        super(props);
        this.state = {
            selected_id : null
        }
    }
    displayBooks(){
        if(this.props.data.loading){
            return (
                <div>Loading....</div>
            );
        }
        else {
            return this.props.data.books.map(book => {
                return (
                    <li key={book._id} onClick={e => this.setState({selected_id : book._id})}>
                        {book.name}
                    </li>
                )
            });
        }
    }
    render(){
        return (
            <div className="ui container">
                <h1 className="ui header">Books</h1>
                <ul id="book-list">
                    {this.displayBooks()}
                </ul>
                <BookDetails bookid={this.state.selected_id}/>
            </div>
        );
    }
}

export default graphql(getBooksQuery)(BookList);