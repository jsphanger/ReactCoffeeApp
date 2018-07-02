import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Prismic from 'prismic-javascript';
import HomePage from '../pages/HomePage.js';
import Article from '../pages/Article.js';

import '../App.css';

class Header extends Component{

  state = {
    pagetitle: '',
    pagesubtitle: ''
  }

  componentWillMount(){
    const apiEndPoint = 'https://jadevtest.cdn.prismic.io/api/v2';
    const accessToken = 'MC5XeTZuMmo0QUFBQlRRMGJY.OBbvv70uGnBjKO-_ve-_vUw177-9WErvv73vv73vv73vv70j77-9fO-_vUnvv71UJmwhSe-_vR4';

    Prismic.api(apiEndPoint, {accessToken}).then(api =>{
      api.query(Prismic.Predicates.at('document.type', 'homepage')).then(response => {
        if (response){

          var results = response.results[0];

          //set the header
          var banner = document.getElementById('header');
          banner.style.backgroundImage = "url('" + results.data.bannerimage.url +"')";
          banner.style.backgroundSize = "cover, auto";
          banner.style.backgroundPosition = 'top left, center center';
          banner.style.backgroundRepeat = 'repeat, no-repeat';

          this.setState({ pagetitle: results.data.title[0].text });
          this.setState({ pagesubtitle: results.data.subtitle[0].text });
        }
      });
    });
  }

  render(){
    return(
      <div>
        { /* Main Header section */ }
        <section id="header" className="dark">
          <header>
            <h1>{this.state.pagetitle}</h1>
            <p>{this.state.pagesubtitle}</p>
          </header>
        </section>
      </div>
    );
  }
}

export default Header;
