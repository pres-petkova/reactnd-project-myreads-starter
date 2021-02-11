import React, { Component } from "react";
import Book from "./Book.js";
import { search } from "./BooksAPI.js";
import { Link } from "react-router-dom";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      error: "",
    };
  }

  handleSearchTermChange = (event) => {
    const query = event.target.value.trim();
    if (query === "") {
      this.setState({
        books: [],
        error: "",
      });

      return;
    }

    search(query).then((response) => {
      const { error } = response;

      if (error && error === "empty query") {
        this.setState({
          book: [],
          error: "No results found.",
        });

        return;
      }

      this.setState({ books: response, error: "" });
    });
  };

  renderSearchResults() {
    const { books, error } = this.state;

    if (error) {
      return <div>{error}</div>;
    }

    if (!books || books.length === 0) return null;

    return books.map((book) => (
      <li key={book.id}>
        <div className="bookshelf">
          <Book bookId={book.id} />
        </div>
      </li>
    ));
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper" />
          <input
            type="text"
            placeholder="Search by title or author"
            onChange={this.handleSearchTermChange}
          />
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.renderSearchResults(this.state.searchTerm)}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBar;
