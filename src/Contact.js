import React, { Component } from 'react';
import './css/style.css';
import './css/bootstrap.min.css';

class Contact extends Component {

render() {

    return (
  		<div className="container">
  			<div className="row marginbot-80">
  				<div className="col-md-8 col-md-offset-2">
  				    <div id="sendmessage">Your message has been sent. Thank you!</div>
                  <div id="errormessage"></div>
                  <form action="" method="post" role="form" className="contactForm">
                      <div className="form-group">
                        <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                        <div className="validation"></div>
                      </div>
                      <div className="form-group">
                        <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
                        <div className="validation"></div>
                      </div>
                      <div className="form-group">
                        <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" />
                        <div className="validation"></div>
                      </div>
                      <div className="form-group">
                        <textarea className="form-control" name="message" rows="5" data-rule="required" data-msg="Please write something for us" placeholder="Message"></textarea>
                        <div className="validation"></div>
                      </div>
                      <div className="text-center"><button type="submit" className="btn btn-skin btn-lg btn-block">Send Message</button></div>
                  </form>
  				   </div>
  			  </div>
            <script src="contactform/contactform.js"></script>
  		</div>
    );
  }
}

export default Contact;
