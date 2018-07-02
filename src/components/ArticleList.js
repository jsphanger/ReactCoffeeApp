import React from 'react';
import Article from '../pages/Article.js';

export default function ArticleList (props){
    return(
        <div> { props.articles.map(article => <Article key={article.id} id={article.id} size={props.size} />) } </div>
    );
}
