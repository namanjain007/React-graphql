import React from 'react';
import { getAuthors , addBookMutationQuery, getBooksQuery}  from '../queries/queries';
import { graphql} from '@apollo/react-hoc' ;
import {flowRight as compose} from 'lodash';



class AddBook extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name : "",
            genre : "",
            authorid : ""
        };
    }
    showAuthors() {
        if(this.props.getAuthors.loading){
            return  <option>Loading...</option>;
        }
        else {
            return this.props.getAuthors.authors.map(author => {
                return (
                    <option value={author._id} key={author._id}>{author.name}</option>
                );
            });
        }
    };
    submitForm(e){
        e.preventDefault();
        //this.props.addBookMutationQuery();we have to invoke this mutation query function as it has parameters
        this.props.addBookMutationQuery({
            variables : {
                name : this.state.name,
                genre : this.state.genre,
                authorid : this.state.authorid
            },
            refetchQueries: [{query : getBooksQuery}]    // as we want to list all the books again after updating  and BookList component is rendering that data
        });
    }
    render(){
        return (
            <form className="ui form" onSubmit = {this.submitForm.bind(this)}>
                <div className="field">
                    <label>Book Name</label>
                    <input type="text" name="first-name" placeholder="Book Name" onChange = {(e) => this.setState({ name : e.target.value })}/>
                </div>
                <div className="field">
                    <label>Book Genre</label>
                    <input type="text" name="last-name" placeholder="Book Genre" onChange = {(e) => this.setState({ genre : e.target.value })}/>
                </div>
                <div className="field">
                    <label>Book Author</label>
                    <select name="authors" multiple="" className="ui fluid dropdown" onChange = {(e) => this.setState({ authorid : e.target.value })}>
                        {this.showAuthors()}
                    </select>
                </div>
                <button className="ui button" type="submit">Submit</button>
            </form>
        );
    }
}

export default compose(
    graphql(getAuthors,{name : "getAuthors"}),
    graphql(addBookMutationQuery,{name : "addBookMutationQuery"})
)(AddBook);