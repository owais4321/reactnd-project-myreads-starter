import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";
import Book from "./Book";
class Search extends Component {
  state = {
    books: [],
    query: "",
    shelf:[]
  };
  changeTextHandler = (event) => {
    if(event.target.value.trim()!==''){ 
    BooksAPI.search(event.target.value.trim(), 20).then((books) => {
      this.setState({ books: books });
    });
    }
    else if(event.target.value.trim()===''){
        this.setState({ books: [] });
    }
  };
  changeSelectionHandler = (event, book) => {
    BooksAPI.update(book, event.target.value).then(() => console.log('done'));
  };
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              onChange={(event) => {
                this.changeTextHandler(event);
              }}
              type="text"
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {typeof this.state.books === "object" &&
            this.state.books.constructor === Array ? (
              this.state.books
                .filter((book) => book.authors && book.imageLinks)
                .map((book) => (
                  <Book
                    select={book.shelf?book.shelf:'none'}
                    imageLink={
                      book.imageLinks ? book.imageLinks.smallThumbnail : ""
                    }
                    key={book.industryIdentifiers[0].identifier}
                    title={book.title}
                    author={book.authors ? book.authors.join(" ") : ""}
                    changeHandler={(event) => {
                      this.changeSelectionHandler(event, book);
                    }}
                  />
                ))
            ) : (
              <p>No Results Found</p>
            )}
          </ol>
        </div>
      </div>
    );
  }
}
export default Search;