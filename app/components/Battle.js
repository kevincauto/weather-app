var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;
var PlayerPreview = require('./PlayerPreview');
var api = require('../utils/api');



// class PlayerInput extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: ''
//     };
//
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//   handleChange(event) {
//     var value = event.target.value;
//
//     this.setState(function () {
//       return {
//         username: value
//       }
//     });
//   }
//   handleSubmit(event) {
//     event.preventDefault();
//
//     this.props.onSubmit(
//       this.props.id,
//       this.state.username
//     );
//   }
//   render() {
//     return (
//       <form className='column' onSubmit={this.handleSubmit}>
//         <label className='header' htmlFor='username'>{this.props.label}</label>
//         <input
//           id='username'
//           placeholder='github username'
//           type='text'
//           value={this.state.username}
//           autoComplete='off'
//           onChange={this.handleChange}
//         />
//         <button
//           className='button'
//           type='submit'
//           disabled={!this.state.username}>
//             Submit
//         </button>
//       </form>
//     )
//   }
// }
//
// PlayerInput.propTypes = {
//
//   label: PropTypes.string.isRequired,
//   onSubmit: PropTypes.func.isRequired,
// }
//
// PlayerInput.defaultProps = {
//   label: 'Username',
// }



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
              pathname: match.url + '/results',
              search: '?city=' + city
            }}>
              Get the Weather
          </Link>
        }
      </div>
    )
  }
}

// class Battle extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       playerOneName: '',
//       playerTwoName: '',
//       playerOneImage: null,
//       playerTwoImage: null,
//     };
//
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//   handleSubmit(id, username) {
//     this.setState(function () {
//       var newState = {};
//       newState[id + 'Name'] = username;
//       newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200'
//       return newState;
//     });
//   }
//   handleReset(id) {
//     this.setState(function () {
//       var newState = {};
//       newState[id + 'Name'] = '';
//       newState[id + 'Image'] = null;
//       return newState;
//     })
//   }
//   render() {
//     var match = this.props.match;
//     var playerOneName = this.state.playerOneName;
//     var playerOneImage = this.state.playerOneImage;
//     var playerTwoName = this.state.playerTwoName;
//     var playerTwoImage = this.state.playerTwoImage;
//
//     return (
//       <div>
//         <div className='row'>
//           {!playerOneName &&
//             <PlayerInput
//               id='playerOne'
//               label='Player One'
//               onSubmit={this.handleSubmit}
//             />}
//
//           {playerOneImage !== null &&
//             <PlayerPreview
//               avatar={playerOneImage}
//               username={playerOneName}>
//                 <button
//                   className='reset'
//                   onClick={this.handleReset.bind(this, 'playerOne')}>
//                     Reset
//                 </button>
//             </PlayerPreview>}
//
//           {!playerTwoName &&
//             <PlayerInput
//               id='playerTwo'
//               label='Player Two'
//               onSubmit={this.handleSubmit}
//             />}
//
//           {playerTwoImage !== null &&
//             <PlayerPreview
//               avatar={playerTwoImage}
//               username={playerTwoName}>
//                 <button
//                   className='reset'
//                   onClick={this.handleReset.bind(this, 'playerTwo')}>
//                     Reset
//                 </button>
//             </PlayerPreview>}
//         </div>
//
//         {playerOneImage && playerTwoImage &&
//           <Link
//             className='button'
//             to={{
//               pathname: match.url + '/results',
//               search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
//             }}>
//               Battle
//           </Link>}
//       </div>
//     )
//   }
// }





module.exports = Weather;
