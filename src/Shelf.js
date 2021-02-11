import React, { Component } from 'react';
import Book from './Book';

class Shelf extends Component{
    renderShelf(bookIds) {
      const {onBookUpdate} = this.props;
        
      return (
        <div className="bookshelf">
          {
            bookIds.map(bookId => (
              <li key={bookId}>
                <Book 
                  bookId={bookId} 
                  onBookUpdate={onBookUpdate}
                />
              </li>
              )
            )
          }
        </div>);
     }

    render(){
        const {bookIds, title} = this.props;

        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.renderShelf(bookIds)}
                    </ol>
                </div>
            </div>
        )
    }    
}


export default Shelf;