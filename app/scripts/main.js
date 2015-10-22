/* global $ */
'use strict';

$(function() {

  // Book-related functionality

  var Book = function(bookUuid){
    this.bookUuid = bookUuid;
  };

  Book.prototype.setBookProperties = function(data){
    this.uuid = data.uuid;
    this.title = data.title;
    this.authors = data.authors;
    this.cover = data.cover;
  };

  Book.prototype.findByUuid = function(uuid){
    var self = this;
    var bookUuid = uuid || this.bookUuid;
    var url = 'https://bookmate.com/a/4/books/smart_show?book_uuid=' + bookUuid;
    $.get(url, function(data) {
      self.setBookProperties(data);
      self.display();
    });
  };

  Book.prototype.display = function(){
    var self = this;
    $('.book').empty();
    var authorsBlock = $('<div>').addClass('authors').html(this.authors);
    var cover = '<img src="' + this.cover.url + '" alt="' + this.title +
      '" width="' + this.cover.width + '" height="' + this.cover.height + '"/>';
    var coverBlock = $('<div>').append(cover).click(function(){
        self.findRelated(self.uuid);
    });
    $('.book').append(authorsBlock);
    $('.book').append(coverBlock);
  };

  Book.prototype.findRelated = function(uuid){
    var self = this;
    var url = 'https://bookmate.com/a/4/d/' + uuid + '/related.json';
    $.get(url, function(data) {
      console.log(data);
      console.log(data[0]);
      self.setBookProperties(data[0]);
      self.display();
    });
  };

  // Interface elements
  $('.submit-uuid').click(function(){
    var uuid = $('.manual-uuid input').val();
    // check that the entered uuid is not empty
    if (uuid) {
      book = new Book('v0pjeMxn');
      book.findByUuid();
    }
    });

  // Initialization
  var book = new Book('v0pjeMxn');
  book.findByUuid();

});
