import React from "react";
import Book from "./Book";
const BookShelf = (props) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{props.shelfName}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {props.shelfTypeBooks.map((book) => (
          <Book
            select={props.select}
            imageLink={book.imageLinks.smallThumbnail}
            key={book.id}
            title={book.title}
            author={book.authors.join(" ")}
            changeHandler={(e) => {
              props.changeHandler(e, book);
            }}
          />
        ))}
      </ol>
    </div>
  </div>
);
export default BookShelf;
