import React, { Component } from "react";
import { getAll } from "./BooksAPI.js";
import { BOOK_SHELVES } from "./constants.js";
import { Link } from "react-router-dom";
import Shelf from "./Shelf";

class BooksList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentlyReading: [],
      read: [],
      wantToRead: [],
    };
  }

  componentDidMount() {
    getAll().then((books) => {
      const currentlyReading = books
        .filter((book) => book.shelf === BOOK_SHELVES.CURRENTLY_READING)
        .map((book) => book.id);
      const read = books
        .filter((book) => book.shelf === BOOK_SHELVES.READ)
        .map((book) => book.id);
      const wantToRead = books
        .filter((book) => book.shelf === BOOK_SHELVES.WANT_TO_READ)
        .map((book) => book.id);

      this.setState({ currentlyReading, read, wantToRead });
    });
  }

  handleBookUpdate = (categorizedBookIds) => {
    const { currentlyReading, read, wantToRead } = categorizedBookIds;

    this.setState({ currentlyReading, read, wantToRead });
  };

  render() {
    const { currentlyReading, read, wantToRead } = this.state;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf
              bookIds={currentlyReading}
              title="Currently Reading"
              onBookUpdate={this.handleBookUpdate}
            />
            <Shelf
              bookIds={wantToRead}
              title="Want To Read"
              onBookUpdate={this.handleBookUpdate}
            />
            <Shelf
              bookIds={read}
              title="Read"
              onBookUpdate={this.handleBookUpdate}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default BooksList;
