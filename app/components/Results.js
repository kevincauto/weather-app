var React = require('react');
var PropTypes = require('prop-types');
var queryString = require('query-string');
var api = require('../utils/api');
var Link = require('react-router-dom').Link;
var PlayerPreview = require('./PlayerPreview');
var Loading = require('./Loading');

// function Profile (props) {
//   var info = props.info;
//
//   return (
//     <PlayerPreview username={info.login} avatar={info.avatar_url}>
//       <ul className='space-list-items'>
//         {info.name && <li>{info.name}</li>}
//         {info.location && <li>{info.location}</li>}
//         {info.company && <li>{info.company}</li>}
//         <li>Followers: {info.followers}</li>
//         <li>Following: {info.following}</li>
//         <li>Public Repos: {info.public_repos}</li>
//         {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
//       </ul>
//     </PlayerPreview>
//   )
// }
//
// Profile.propTypes = {
//   info: PropTypes.object.isRequired,
// }
//
// function Player (props) {
//   return (
//     <div>
//       <h1 className='header'>{props.label}</h1>
//       <h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
//       <Profile info={props.profile} />
//     </div>
//   )
// }
//
// Player.propTypes = {
//   label: PropTypes.string.isRequired,
//   score: PropTypes.number.isRequired,
//   profile: PropTypes.object.isRequired,
// }

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loading: true,
      data: undefined
    }

  }
  componentDidMount() {
    var city = queryString.parse(this.props.location.search).city;



    api.getWeather(city)
      .then(function(data){


          if (data === null) {
            return this.setState(function () {
              return {
                error: 'Looks like there was an error. Check that both users exist on Github.',
                loading: false,
              }
            });
          } else{
            this.setState({
              error: null,
              loading: false,
              data
            });
            console.log(this.state.data);
            
          }
      }.bind(this));



  }
  render() {
    var error = this.state.error;
    var loading = this.state.loading;

    if (loading === true) {
      return <Loading />
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      )
    }

    return (
      <div className='row'>
        Hello working!
      </div>
    )
  }
}

module.exports = Results;
