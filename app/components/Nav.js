var React = require('react');
var NavLink = require('react-router-dom').NavLink;
var CityInput = require('./CityInput');

function Nav () {
  return (
    <div className='navigation'>
          <NavLink exact to='/'><h2>Weather App</h2></NavLink>
          <div className='right'>
          <CityInput />
          </div>
    </div>
  )
}

module.exports = Nav;
