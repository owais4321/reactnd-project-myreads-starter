import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./BookShelf";
class BooksList extends Component {
  state = {
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      let cr = books.filter((book) => book.shelf === "currentlyReading");
      let w2r = books.filter((book) => book.shelf === "wantToRead");
      let r = books.filter((book) => book.shelf === "read");
      this.setState({
        books: books,
        currentlyReading: cr,
        wantToRead: w2r,
        read: r,
      });
    });
  }

  changeHandler = (event, book) => {
    event.persist();
    BooksAPI.update(book, event.target.value).then((updateBook) => {
      let cr = this.state.currentlyReading.filter(
        (b) => b.title !== book.title
      );
      let w2r = this.state.wantToRead.filter((b) => b.title !== book.title);
      let r = this.state.read.filter((b) => b.title !== book.title);

      if (event.target.value === "currentlyReading") {
        this.setState((prevState) => ({
          currentlyReading: prevState.currentlyReading.concat(book),
          wantToRead: w2r,
          read: r,
        }));
      } else if (event.target.value === "wantToRead") {
        this.setState((prevState) => ({
          currentlyReading: cr,
          wantToRead: prevState.wantToRead.concat(book),
          read: r,
        }));
      } else if (event.target.value === "read") {
        this.setState((prevState) => ({
          currentlyReading: cr,
          wantToRead: w2r,
          read: prevState.read.concat(book),
        }));
      } else if (event.target.value === "none") {
        this.setState((prevState) => ({
          currentlyReading: cr,
          wantToRead: w2r,
          read: r,
        }));
      }
    });
  };
  render() {
    let { currentlyReading, wantToRead, read } = this.state;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              shelfName="Curently Reading"
              shelfTypeBooks={currentlyReading}
              select={"curentlyReading"}
              changeHandler={(event, book) => {
                this.changeHandler(event, book);
              }}
            />
            <BookShelf
              shelfName="Want To Read"
              shelfTypeBooks={wantToRead}
              select={"wantToRead"}
              changeHandler={(event, book) => {
                this.changeHandler(event, book);
              }}
            />
            <BookShelf
              shelfName="Read"
              shelfTypeBooks={read}
              select={"read"}
              changeHandler={(event, book) => {
                this.changeHandler(event, book);
              }}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search"><button className='btn-search'>Add a book</button></Link>
        </div>
      </div>
    );
  }
}
export default BooksList;
