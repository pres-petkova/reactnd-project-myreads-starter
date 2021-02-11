import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import SearchBar from "./SearchBar";
import BooksList from "./BooksList";

class BooksApp extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Switch>
            <Route exact path="/">
              <BooksList />
            </Route>
            <Route exact path="/search">
              <SearchBar />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default BooksApp;
