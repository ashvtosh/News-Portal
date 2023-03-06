import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page:1
        }
    }
    async componentDidMount(){
        let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=e6b2125eb4a247618ab3ccf06cb05c2b&page=1&pagesize=20";
        let data = await fetch(url);
        let parseddata = await data.json()
        console.log(parseddata);
        this.setState({articles:parseddata.articles, totalResults: parseddata.totalResults})
    }
    handlePrevClick = async()=>{
        console.log("Previous")
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=e6b2125eb4a247618ab3ccf06cb05c2b&page=${this.state.page - 1}&pagesize=20`;
        let data = await fetch(url);
        let parseddata = await data.json()
        console.log(parseddata);
        this.setState({
            page: this.state.page - 1,
            articles:parseddata.articles
        })
    }
    handleNextClick = async()=>{
        console.log("Next")
        if(this.state.page + 1 > Math.ceil(this.state.totalResults/20)){

        }else{
            let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=e6b2125eb4a247618ab3ccf06cb05c2b&page=${this.state.page + 1}&pagesize=20`;
            let data = await fetch(url);
            let parseddata = await data.json()
            console.log(parseddata);
            this.setState({
                page: this.state.page + 1,
                articles:parseddata.articles
        })
    }}
    render() {
        return (
            <div className="container my-3">
                <h2>NewsMonkey - Top Headlines</h2>
                <div className="row">
                {this.state.articles.map((element)=>{
                    return <div className="col-md-4"  key={element.url}>
                        <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
                    </div>
                })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                    <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}
export default News
