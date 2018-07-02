import React from 'react';
class FanclubForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {value: ''};

    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleReset(event){
    document.getElementById('FCName').value = '';
    document.getElementById('FCEmail').value = '';
    document.getElementById('FCMessage').value = '';
  }

  handleSubmit(event){
    var name = document.getElementById('FCName').value;
    var email = document.getElementById('FCEmail').value;
    var msg = document.getElementById('FCMessage').value;

    alert('A new fanclub submission was entered: ' + name + ' ' + email + ' ' + msg);
    event.preventDefault();
  }

  render(){
    return(
      <section id="fourth" className="main">
        <header>
          <div className="container">
            <h2>Roasters fan club</h2>
            <p>Sign up below to receive exclusive offers on our best products and the inside scoop on new roasts.</p>
          </div>
        </header>
        <div className="content style4 featured">
          <div className="container medium">
            <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
              <div className="row gtr-50">
                <div className="col-6 col-12-mobile"><input id="FCName" type="text" placeholder="Name" /></div>
                <div className="col-6 col-12-mobile"><input id="FCEmail" type="text" placeholder="Email" /></div>
                <div className="col-12"><textarea id="FCMessage" name="message" placeholder="Message"></textarea></div>
                <div className="col-12">
                  <ul className="actions special">
                    <li><input type="submit" className="button" value="Send Message" /></li>
                    <li><input type="reset" className="button alt" value="Clear Form" /></li>
                  </ul>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

    );
  }
}

export default FanclubForm;
