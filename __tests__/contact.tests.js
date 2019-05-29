const request = require("supertest")
const express = require("express")
const app = require("../src/app")
// const {spawn} = require("child-process-promise")
const {spawn,exec,execSync} =require("child_process")
const sinon = require("sinon")
const spawnOptions = { stdio: 'inherit' };
const ContactsController = require("../src/controllers/contactControllers")
const {validateMessage,validateContact} = require("../src/utils/validation")
const db = require("../src/models")
describe('Test Contacts Endpoints', () => {
  beforeEach(() => {
    res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() }) // to spy res.status(500).end()
            };
  });
  beforeAll(async ()=>{
          // await spawn('yarn', ['test:migrate'], spawnOptions);
      
            // execSync('yarn test:migrate', function(err, stdout, stderr) {
            //     // console.log("stdout");
            // });
            // execSync('yarn test:seed', function(err, stdout, stderr) {
            //     // console.log("stdout");
            // });
            
  })
  afterAll(async (done) => {
            execSync('yarn test:seed:undo', function(err, stdout, stderr) {
                console.log(stdout);
                
            });

          //   await db.Contact.destroy({
          //     where: {id:'2e77e154-3568-11e9-b210-d663bd873d91'},
          //     truncate: false
          //   })
            done()
          })
  it('should respond with json containing all contacts ',(done) => {
      return request(app).get("/contacts").then(response => {
          expect(response.statusCode).toBe(200)
          expect(Object.keys(response.body).length).toBe(0)
          done()
      },10000)
  });
  it('should respond with 404 when searching for contact not existing',(done) => {
      return request(app).get("/contacts/32").then(response => {
          expect(response.statusCode).toBe(404)
          done()
      },10000)
  });
  });
  it('should respond with 404 when searching for contact not existing',(done) => {
      return request(app).get("/contacts/42").then(response => {
          expect(response.statusCode).toBe(404)
          done()
      },10000)
  });
  it('should respond with 404 when searching for contact not existing',(done) => {
      return request(app).get("/contacts/432").then(response => {
          expect(response.statusCode).toBe(404)
          done()
      },10000)
  });
  it('should respond with 404 when deleting  contact not existing',(done) => {
      return request(app).delete("/contacts/432").then(response => {
          expect(response.statusCode).toBe(404)
          done()
      },10000)
  });
      let missingPhone = {
      "name": "dummy",
      id:19,
  }
  
      let missingName = {
      "phone": "02938439854899845",
      id:24,
  }
  const correctData = {
      id:1000,
    name:"awesomeness",
    phone:"5900893540984598009"
  }
  const incorrectData = {
      id:3,
    name:"awesomeness",
    phone:"5900893540984598009"
  }
  it('respond with 400 Bad request with proper error message when phone is missing', function (done) {
      request(app)
          .post('/contacts')
          .send(missingPhone)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .expect(res=> res.body.message === "Phone field is required")
          .end((err) => {
              if (err) return done(err);
              done();
          });
  });

  it('respond with 400 Bad request with proper error message when phone is missing', function (done) {
      request(app)
          .post('/contacts')
          .send(missingPhone)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400)
          .expect(res=> res.body.message === "Phone field is required")
          .end((err) => {
              if (err) return done(err);
              done();
          });
  });

  // it('respond with 201 When correct data is provided', function (done) {
  //     request(app)
  //         .post('/contacts')
  //         .send(correctData)
  //         .set('Accept', 'application/json')
  //         .expect('Content-Type', /json/)
  //         .expect(201)
  //         .end((err) => {
  //             if (err) return done(err);
  //             done();
  //         });
  // });

//Messages  TESTS 
  describe('SMS TESTS', () => {
    const fakeMessage = {
      status:"849",
      id:29,
    }
    const fakeStatus = {
      "message":"this is awessome",
      id:433,
    }

    const missingSenderId = {
      status:"unread",
      message:"this is awe",
      id:65,
    }
    const missingReceiverId = {
      status:"unread",
      message:"this is awe",
      senderId:1000,
      id:65,
    }
    const correctMessage = {
      status:"unread",
      message:"this is awe",
      senderId:1000,
      receiverId:1000,
      id:10001,
    }
    const correctWithoutStatus = {
      message:"this is awe",
      senderId:1000,
      receiverId:1000,
      id:10003,
    }
    it('respond with 400 Bad request with proper error message when message field is missing', function (done) {
    request(app)
        .post('/messages')
        .send(fakeMessage)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err) => {
            if (err) return done(err);
            done();
        });
  });
    it('add status by default if it is not in the list ', function (done) {
    request(app)
        .post('/messages')
        .send(fakeStatus)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err) => {
            if (err) return done(err);
            done();
        });
  });
    it('throw an error when sender id is missing ', function (done) {
    request(app)
        .post('/messages')
        .send(missingSenderId)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err) => {
            if (err) return done(err);
            done();
        });
  });
    it('throw an error when receiver id is missing ', function (done) {
    request(app)
        .post('/messages')
        .send(missingReceiverId)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end((err) => {
            if (err) return done(err);
            done();
        });
  });
  //   it('respond with 201 When correct data is provided', function (done) {
  //   request(app)
  //       .post('/messages')
  //       .send(correctMessage)
  //       .set('Accept', 'application/json')
  //       .expect('Content-Type', /json/)
  //       .expect(201)
  //       .end((err) => {
  //           if (err) return done(err);
  //           done();
  //       });
  // });
  //   it('adds status as read if it is empty', function (done) {
  //   request(app)
  //       .post('/messages')
  //       .send(correctWithoutStatus)
  //       .set('Accept', 'application/json')
  //       .expect('Content-Type', /json/)
  //       .expect(201)
  //       .end((err) => {
  //           if (err) return done(err);
  //           done();
  //       });
  // });

    it('should respond with 404 when bad id is provided single message ',(done) => {
    return request(app).get("/messages/32").then(response => {
        expect(response.body.message).toBe("Message with ID 32 was not found")
        done()
    },10000)
  });

  it('should respond with 404 when bad id is provided single message ',(done) => {
  return request(app).get("/messages/sent/54").then(response => {
      expect(response.statusCode).toBe(404)
      expect(response.body.message).toBe("No messages from a sender with id 54")
      done()
  },10000)
  });
  it('should respond with 404 when bad id is provided single message ',(done) => {
  return request(app).get("/messages/received/65").then(response => {
      expect(response.statusCode).toBe(404)
      done()
  },10000)
  });
  it('Deletion should respond with 404 when bad id is provided single message ',(done) => {
  return request(app).delete("/messages/42").then(response => {
      expect(response.statusCode).toBe(404)
      done()
  },10000)
  });
});

