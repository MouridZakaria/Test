import React from "react";

class NewsItem extends React.Component {
    render(){
        return (
        <div style= {{ margin: 50, padding:20, borderStyle:"solid"}}>
            <p>Name : {this.props.Name}</p>
            <p>Region : {this.props.Region}</p>
            <p>Area : {this.props.Area}</p>
        </div>
        )
    }
}

export default NewsItem;