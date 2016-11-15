const models = require('../models');
var Page = models.Page;
var User = models.User;
const chai = require('chai');
const expect = chai.expect;
var spies = require('chai-spies');
chai.use(spies);

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
      it('gets pages with the search tag', function(){
        console.log(page)
        // Page.findByTag('foo')
        //   .then(function(pages){
        //     expect(pages).to.have.lengthOf(1);
        //     done();
        //   })
          // .catch(done);
      });

      it('does not get pages without the search tag');
    });
  });

  describe('Instance methods', function () {
    describe('findSimilar', function () {
      it('never gets itself');
      it('gets other pages with any common tags');
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