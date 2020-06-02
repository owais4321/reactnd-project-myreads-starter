import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import BooksList from "./BooksList";
import Search from "./Search";
import { Route } from "react-router-dom";
class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" component={BooksList} />
        <Route exact path="/search" component={Search} />
      </div>
    );
  }
}
export default BooksApp;
