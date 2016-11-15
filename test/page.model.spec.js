const models = require('../models');
var Page = models.Page;
var User = models.User;
const chai = require('chai');
const expect = chai.expect;
var spies = require('chai-spies');
chai.use(spies);
chai.should();
chai.use(require('chai-things'));

describe('Page model', function () {

  describe('Virtuals', function () {

      var page;

      beforeEach('Build page', function(){
        page = Page.build();
      })

    describe('route', function () {
      it('returns the url_name prepended by "/wiki/"', function(){
        page.urlTitle = 'some_title';
        expect(page.route).to.equal('/wiki/some_title');
      });
    });
    describe('renderedContent', function () {
      it('converts the markdown-formatted content into HTML', function(){
        page.content = "The largest heading";
        expect(page.renderedContent).to.equal("<p>The largest heading</p>\n");
      });
    });
  });

  describe('Class methods', function () {
      var page;

      before(function (done) {
          Page.create({
            title: 'foo',
            content: 'bar',
            tags: ['foo', 'bar']
          })
          .then(function (val) {
            page = val;
            done();
          })
            .catch(done);
          });

    describe('findByTag', function () {
      it('gets pages with the search tag', function(done){
        console.log(page)
        Page.findByTag('foo')
          .then(function(pages){
            expect(pages).to.have.lengthOf(1);
            done();
          })
          .catch(done);
      });

      it('does not get pages without the search tag');
    });
  });

  describe('Instance methods', function () {
    describe('findSimilar', function () {

      before(function(){

        var firstPage =  Page.create({
          title: 'hello',
          content: 'how are you',
          tags: ['hello', 'greeting']
        });

        var secondPage =  Page.create({
          title: 'howdy',
          content: 'im a cowboy',
          tags: ['greeting', 'wildwest']
         });

        var thirdPage =  Page.create({
          title: 'random',
          content: 'this is not a greeting',
          tags: ['bye', 'fool']
        });

        return Promise.all([
          firstPage,
          secondPage,
          thirdPage
        ]);

      });

      it('never gets itself', function(done){
        var newPage = Page.create({
          title: 'aloha',
          content: 'hawaii is nice... nodemon',
          tags: ['greeting', 'hawaii']
        }).then(function(page){
          [page.findSimilar()].should.not.include(newPage);
          done();
        })
      });

      it('gets other pages with any common tags', function(done){
        var newPage = Page.create({
          title: 'hola',
          content: 'me gusta madrid',
          tags: ['greeting', 'madrid']
        }).then(function(page){
          page.findSimilar()
          .then(function(similiarPages){
            expect(similiarPages).to.have.lengthOf(3);
          })

          done();
        })
        
      });


      it('does not get other pages without any common tags');
    });
  });

  describe('Validations', function () {
    it('errors without title');
    it('errors without content');
    it('errors given an invalid status');
  });

  describe('Hooks', function () {
    it('it sets urlTitle based on title before validating');
  });

});