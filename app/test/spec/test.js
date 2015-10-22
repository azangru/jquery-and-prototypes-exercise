/* global jasmine, describe, it, expect, beforeEach, Book, spyOn*/

(function () {
  'use strict';

  describe('Book', function () {

    var book;

    beforeEach(function() {
      book = new Book('v0pjeMxn');
    });


    describe('Initialization', function () {

      it('has the bookUuid property if this property is passed during initialization', function () {
        expect(book).toBeTruthy();
        expect(book.bookUuid).toEqual('v0pjeMxn');
      });

    });

    describe('Book.prototype.setBookProperties', function () {

      var data;

      beforeEach(function() {
        data = {
          uuid: 'bpyIJf3P',
          title: 'Исчезнувшая',
          authors: 'Гиллиан Флинн',
          cover: {
            url: 'test-url.jpg?1429546004',
            width: 135,
            height: 200
          }
        };
        book.setBookProperties(data);
      });

      it('sets book title', function () {
        expect(book.title).toEqual('Исчезнувшая');
      });

      it('sets book uuid', function () {
        expect(book.uuid).toEqual('bpyIJf3P');
      });

      it('sets book authors', function () {
        expect(book.authors).toEqual('Гиллиан Флинн');
      });

      it('sets book cover', function () {
        expect(book.cover).toEqual(data.cover);
      });

    });

    describe('Book.prototype.findByUuid', function () {

      var $spy;

      beforeEach(function() {
        $spy = spyOn($, 'get');
      });

      it ('makes a get request using jQuery’s get function', function(){
        book.findByUuid();
        expect($.get).toHaveBeenCalled();
      });

      it ('sends a request using bookUuid if not provided with uuid', function(){
        // the book was initialized with bookUuid = 'v0pjeMxn'
        var url = 'https://bookmate.com/a/4/books/smart_show?book_uuid=v0pjeMxn';
        book.findByUuid();
        expect($.get).toHaveBeenCalledWith(url, jasmine.any(Function));
      });

      it ('sends a request using uuid if uuid is provided', function(){
        var testUuid = 'test';
        var url = 'https://bookmate.com/a/4/books/smart_show?book_uuid=' + testUuid;
        book.findByUuid('test');
        expect($.get).toHaveBeenCalledWith(url, jasmine.any(Function));
      });

      // Couldn't test the callback. Ran out of time...

      // it ('calls Book.prototype.setBookProperties', function(){
      //   $spy.and.callThrough();
      //   spyOn(Book.prototype, 'setBookProperties');
      //   book.findByUuid();
      //   expect(Book.prototype.setBookProperties).toHaveBeenCalled();
      // });

    });

    describe('Book.prototype.findRelated', function () {

      beforeEach(function() {
        spyOn($, 'get');
      });

      it ('makes a get request using jQuery’s get function', function(){
        book.findRelated('gibberish');
        expect($.get).toHaveBeenCalled();
      });


      it ('uses uuid correctly to build a url for request', function(){
        var testUuid = 'test';
        var url = 'https://bookmate.com/a/4/d/' + testUuid + '/related.json';
        book.findRelated('test');
        expect($.get).toHaveBeenCalledWith(url, jasmine.any(Function));
      });


    });

  });
})();
