import React, { Component } from 'react';
import Prismic from 'prismic-javascript';
import { Link } from 'react-router-dom';

import '../App.css';

const articleListImage = {
  width: '100%'
};

class Article extends Component{

  state = {
    id: '',
    size: 'feature',
    title: '',
    body: '',
    image: '',
    author: '',
    publishdate: ''
  }

  constructor(props){
    super(props);

    var id = props.id;

    if(id === undefined){
      this.state = {
        id: props.match.params.id,
        size: "feature",
        title: '',
        body: '',
        image: '',
        author: '',
        publishdate: ''
      }
    }
    else{
      this.state = {
        id: props.id,
        size: props.size,
        title: '',
        body: '',
        image: '',
        author: '',
        publishdate: ''
      }
    }
  }

  componentDidMount(){

    const apiEndPoint = 'https://jadevtest.cdn.prismic.io/api/v2';
    const accessToken = 'MC5XeTZuMmo0QUFBQlRRMGJY.OBbvv70uGnBjKO-_ve-_vUw177-9WErvv73vv73vv73vv70j77-9fO-_vUnvv71UJmwhSe-_vR4';

    if(this.state.id != null){
      Prismic.api(apiEndPoint, {accessToken}).then(api =>{
        api.query(Prismic.Predicates.at('document.id', this.state.id )).then(response => {

          if (response)
          {
            var results = response.results[0];
            var trueBody = "";

            this.setState({title: results.data.title[0].text });
            this.setState({image: results.data.image.url });

              var offset = 0;
              var listCapture = "";
              var eleCount = 0;
              results.data.body.forEach(element =>{

                if(element.type === "paragraph")
                {
                  var el = element.text;

                  element.spans.forEach(span =>{
                    var spanStart = span.start + offset;
                    var spanEnd = span.end + offset;

                    if(span.type === "strong"){
                      el = el.slice(0, spanStart) + "<strong>" + el.slice( spanStart, spanEnd) + "</strong>" + el.slice(spanEnd);
                      offset += 17;
                    }
                    else if(span.type === "em"){
                      el = el.slice(0, spanStart) + "<em>" + el.slice( spanStart, spanEnd) + "</em>" + el.slice(spanEnd);
                      offset += 9;
                    }
                    else if(span.type === "hyperlink"){
                      el = el.slice(0, spanStart) + "<a href='" + span.data.url + "'>" + el.slice( spanStart, spanEnd) + "</a>" + el.slice(spanEnd);
                      offset += (15 + span.data.url.length);
                    }
                  });

                  trueBody += el + "\n";
                }
                else if(element.type === "o-list-item"){
                  //check to see if first in list
                  if(!listCapture.includes("<ol>")){
                    listCapture += "<ol>";
                  }

                  listCapture += "<li>" + element.text + "</li>";

                  //check to see if last olist
                  if(eleCount + 1 >= results.data.body.length || results.data.body[eleCount + 1].type !== "o-list-item"){
                    listCapture += "</ol>";
                    trueBody += listCapture;
                    listCapture = "";
                  }
                }
                else if(element.type === "list-item"){
                  //check to see if first in list
                  if(!listCapture.includes("<ul>")){
                    listCapture += "<ul>";
                  }

                  listCapture += "<li>" + element.text + "</li>";

                  //check to see if last olist
                  if(eleCount + 1 >= results.data.body.length || results.data.body[eleCount + 1].type !== "list-item"){
                    listCapture += "</ul>";
                    trueBody += listCapture;
                    listCapture = "";
                  }
                }
                else if(element.type === "image"){
                  trueBody += "<img src='" + element.url + "' alt='" + element.alt + "' />"
                }
                else if(element.type === "embed"){
                  var embval = element.oembed.embed_url.substr(element.oembed.embed_url.lastIndexOf("v=") + 2);
                  trueBody += "<iframe height='" + element.oembed.height + "' src='https://www.youtube.com/embed/" + embval + "' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe>";
                }

                eleCount+= 1;
              });
            }

            this.setState({body: trueBody });
            this.setState({publishdate: results.data.publishdate });
        });
      });
    }
  }

  render(){
    return(
      <div>

        { /* Simple view for content listings */ }
        {this.state.size === "list" &&
          <div key={this.state.id} className="article row">
            <div className="col-md-4 col-xs-12"><img src={ this.state.image } style={articleListImage} alt="" /></div>
            <div className="articleTextBlock col-md-8 col-xs-12">
              <div>
                <h2><Link to={{ pathname: '/article/' + this.state.id }}> {this.state.title} </Link></h2>
                <p dangerouslySetInnerHTML={{__html: this.state.body.substring(0, 325) + "..."}}></p>
              </div>
            </div>
          </div>
        }

        { /* Expanded view for feature listings */ }
        {this.state.size === "feature" &&
          <div key={this.state.id} className="article feature">
          
            <img className="articlePicture" src={ this.state.image } alt="" />
              <div>
                <h1>{this.state.title}</h1>
                <div>
                      {this.state.body.split("\n").map((i,key) => {
                            return <p key={key} dangerouslySetInnerHTML={{__html: i}}></p>;
                      })}
                </div>
              </div>

              <div><Link to="/">Back to main page</Link></div>

          </div>
        }
      </div>
    );
  }
}

export default Article;
