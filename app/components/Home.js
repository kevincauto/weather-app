var React = require('react');
var Link = require('react-router-dom').Link;
var PropTypes = require('prop-types');
var api = require('../utils/api');

class CityInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    console.log("handle change fired.")
    var value = event.target.value;

    this.props.onChange(value);
  }
  handleSubmit(event) {
    event.preventDefault();


  }
  render() {
    return (
      <form className='column' onSubmit={this.handleSubmit}>

        <input
          id='city'
          placeholder='Philadelphia, PA'
          type='text'
          value={this.props.text}
          autoComplete='off'
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        />

      </form>
    )
  }
}

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
    };
    this.handleTextChange = this.handleTextChange.bind(this);
  }

  handleTextChange(city) {
    this.setState({
      city: city
    });
  }

  // handleReset() {
  //   this.setState(function () {
  //     var newState = {};
  //     city = '';
  //     return newState;
  //   })
  // }
  render() {
    var match = this.props.match;
    var city = this.state.city;
    console.log(city);

    return (
      <div>
        <div className='row'>
          {

              <CityInput
                text={this.state.city}
                onChange={this.handleTextChange}
              />


          }
        </div>

        {
          <Link
            className='button'
            to={{
              pathname: '/forecast',
              search: '?city=' + city
            }}>
              Get the Weather
          </Link>
        }
      </div>
    )
  }
}

class Home extends React.Component {
  render() {
    return (
      <div className='home-container'>
        <h1>Five Day Forecast: Enter a City</h1>
        <Weather />
      </div>
    )
  }
}

module.exports = Home;
