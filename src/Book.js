import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { update } from './BooksAPI.js';
import {BOOK_SHELVES} from './constants.js'
import { get } from './BooksAPI';

class Book extends Component{
    state = {
        book: null
    };

    
    componentDidMount() {
        const {bookId} = this.props;
            get(bookId).then(book => this.setState({book}));
    }

    handleBookUpdate = (event, book) => {        
        const {onBookUpdate} = this.props;

        const newShelf = event.target.value;
        if (newShelf === 'move') return;

        update(book, newShelf)
            .then(res => onBookUpdate(res))
      }

    renderOption = (shelf, currentShelf, shelfTitle) => {
        if (shelf === currentShelf) {
            return <option className="current-option" value={shelf}>{shelfTitle}</option>
        } else {
            return <option value={shelf}>{shelfTitle}</option>
        }
    }

    render(){
        const {book} = this.state;
        if (!book) return null;

        const {title, authors, imageLinks} = book;

        let backgroundImageURL = '';
        if (imageLinks && imageLinks.smallThumbnail) {
          backgroundImageURL = imageLinks.smallThumbnail
        }

        return(
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={
                        {
                            width: 128,
                            height: 192,
                            backgroundImage: `url(${backgroundImageURL})`
                            }
                        }>
                </div>
                <div className="book-shelf-changer">
                    <select onChange={event => this.handleBookUpdate(event, book)}>
                        <option value="move">Move to...</option>                        
                        {this.renderOption(BOOK_SHELVES.CURRENTLY_READING, book.shelf, 'Currently Reading')}
                        {this.renderOption(BOOK_SHELVES.WANT_TO_READ, book.shelf, 'Want to Read')}
                        {this.renderOption(BOOK_SHELVES.READ, book.shelf, 'Read')}
                        {this.renderOption(BOOK_SHELVES.NONE, book.shelf, 'None')}
                    </select>
                </div>
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{authors}</div>
        </div>
        )
    }
}

Book.propTypes = {
    bookId: PropTypes.string.isRequired,
    onBookUpdate: PropTypes.func
}

export default Book;

