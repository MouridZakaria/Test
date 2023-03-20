import React from "react";
import NewsItem from "./NewsItem";


class NewsFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      countries: [],
      sortOrder: "asc",
      error: null,
    };
    this.toggleSortOrder = this.toggleSortOrder.bind(this);
    this.filterByArea = this.filterByArea.bind(this);
    this.filterByRegion = this.filterByRegion.bind(this);
  }

  componentDidMount() {
    setTimeout(() =>
      fetch("https://restcountries.com/v2/all?fields=name,region,area")
        .then((res) => res.json())
        .then((data) => this.setState({ countries: data }))
        .catch((e) => this.setState({ error: e }))
        .finally(() => this.setState({ isLoading: false })), 1000
    );
  }

  toggleSortOrder() {
    const { countries, sortOrder } = this.state;
    const sortedCountries = countries.sort((a, b) =>
      sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    this.setState({
      countries: sortedCountries,
      sortOrder: sortOrder === "asc" ? "desc" : "asc",
    });
  }
  filterByArea() {
    const { countries } = this.state;
    const lithuania = countries.find((country) => country.name === "Lithuania");
    if (lithuania) {
      const lithuaniaArea = lithuania.area;
      const filteredCountries = countries.filter((country) => country.area < lithuaniaArea);
      this.setState({ countries: filteredCountries });
    }
  }
  

  filterByRegion(){
    const {countries}=this.state;
    const filteredCountries = countries.filter(country => country.region === "Oceania");
    this.setState({
      countries:filteredCountries});
  }

  render() {
    if (this.state.isLoading) {
      return <div><p>Chargement en cours .... </p></div>;
    }
    if (this.state.error) {
      return <div><p>Une erreur est survenue</p></div>;
    }
    return (
      <div>
        <h1>Countries</h1>
        <button onClick={this.toggleSortOrder}>
          Sort by name of the countries ({this.state.sortOrder})
        </button>
        <button onClick={this.filterByArea}>
          Filter by area (smaller than Lithuania)
        </button>
        <button onClick={this.filterByRegion}>
          Filter by region (Oceania)
        </button>
        <div>
          {this.state.countries.map((p, i) => (
            <NewsItem
              key={i}
              Name={p.name}
              Region={p.region}
              Area={p.area}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default NewsFeed;
