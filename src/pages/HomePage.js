import React, { Component } from 'react';
import ArticleList from '../components/ArticleList.js';
import FanclubForm from '../components/FanclubForm.js';
import Prismic from 'prismic-javascript';

import '../App.css';

class Home extends Component {

  state = {
    pagetitle: '',
    pagesubtitle: '',
    articles: [],
    copyright: ''
  }

  componentWillMount(){
    const apiEndPoint = 'https://jadevtest.cdn.prismic.io/api/v2';
    const accessToken = 'MC5XeTZuMmo0QUFBQlRRMGJY.OBbvv70uGnBjKO-_ve-_vUw177-9WErvv73vv73vv73vv70j77-9fO-_vUnvv71UJmwhSe-_vR4';

    Prismic.api(apiEndPoint, {accessToken}).then(api =>{
      api.query(Prismic.Predicates.at('document.type', 'homepage')).then(response => {
        if (response){

          var results = response.results[0];

          //Article Listings
          for(var i = 0; i < results.data.articlegroup.length; i++){
              var articleID = results.data.articlegroup[i].articles.id;

              this.setState(prevState => ({
                articles: prevState.articles.concat({ id: articleID })
              }));
          }

          //copyright
          this.setState({ copyright: results.data.copyright[0].text });
        }
      });
    });
  }

  render() {
    return (
      <div id="parent">

          { /* Article content */ }
          {this.state.articles.length > 0 &&
            <section id="second" className="main">

      				<div className="content dark style2">
      					<div className="container">

                  { /* custom article repeater */}
                  <ArticleList articles={this.state.articles} size="list" />

      					</div>
      				</div>
            </section>
          }

          { /* Simple React Contact Form for our fanclub */ }
    			<FanclubForm />

    			<section id="footer">
            {/*
    				<ul className="icons">
    					<li><a href="#" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
    					<li><a href="#" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
    					<li><a href="#" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
    					<li><a href="#" className="icon fa-dribbble"><span className="label">Dribbble</span></a></li>
    					<li><a href="#" className="icon fa-github"><span className="label">GitHub</span></a></li>
    				</ul>
            */}

            { this.state.copyright.length > 0 &&
      				<div className="copyright">
      					<ul className="menu">
      						<li>&copy; {this.state.copyright}</li>
                  <li>Design: <a href="http://html5up.net">HTML5 UP</a></li>
      					</ul>
      				</div>
            }

    			</section>

    			<script src="assets/js/jquery.min.js"></script>
    			<script src="assets/js/jquery.scrolly.min.js"></script>
    			<script src="assets/js/browser.min.js"></script>
    			<script src="assets/js/breakpoints.min.js"></script>
    			<script src="assets/js/util.js"></script>
    			<script src="assets/js/main.js"></script>
        </div>
    );
  }
}

export default Home;
