import React, { Component } from "react";
import Card from "./Card";
import Loader from "./Loader";

export default class News extends Component {
  articles = [
    
  ];
  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
    };
  }
  async componentDidMount() {
    let link =
      "https://newsapi.org/v2/everything?q=tesla&from=2023-08-08&sortBy=publishedAt&apiKey=0d1a56b2d6eb4e558db235451907ce54&pageSize=21";
      this.setState({loading:true})
    let data = await fetch(link);
    let parseddata = await data.json();
    this.setState({
      articles: parseddata.articles,
      totalResults: parseddata.totalResults,
      loading:false,
    });
    console.log({ articles: parseddata.articles });
  }
  getnext = async () => {
    console.log("next");
    let link = `https://newsapi.org/v2/everything?q=tesla&from=2023-08-08&sortBy=publishedAt&apiKey=0d1a56b2d6eb4e558db235451907ce54&page=${
      this.state.page + 1
    }&pageSize=21`;
    this.setState({loading:true})
    let data = await fetch(link);
    let parseddata = await data.json();
    console.log({ parseddata });
    this.setState({
      page: this.state.page + 1,
      articles: parseddata.articles,
      loading:false,
    });
  };
  getprevious = async () => {
    console.log("previous");
    let link = `https://newsapi.org/v2/everything?q=tesla&from=2023-08-08&sortBy=publishedAt&apiKey=0d1a56b2d6eb4e558db235451907ce54&page=${
      this.state.page - 1
    }&pageSize=21`;
    this.setState({loading:true})
    let data = await fetch(link);
    let parseddata = await data.json();
    console.log({ parseddata });
    this.setState({
      page: this.state.page - 1,
      articles: parseddata.articles,
      loading:false,
    });
  };
  render() {
    return (

      <div>
        <h1 className="text-centre">Today's Top News</h1>
        <div className="container my-5">
       {this.state.loading && <Loader/>}
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4 my-2" key={element.url}>
                  <Card
                    title={element.title ? element.title.slice(0, 40) : " "}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : " "
                    }
                    url={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://tse1.mm.bing.net/th?id=OIP.B0TNuc95OtPu6BzEhSRFOwAAAA&pid=Api&P=0&h=180"
                    }
                    newsurl={element.url}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="container d-flex justify-content-between my-3">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.getprevious}
          >
            Previous
          </button>
          <button
            type="button"
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / 21)
            }
            className="btn btn-success"
            onClick={this.getnext}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
