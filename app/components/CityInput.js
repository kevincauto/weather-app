var React = require('react');

class CityInput extends React.Component {
  render() {
  return (
    <form>
      <input type="text" placeholder="Philadelpha, PA" />
      <input type = "submit" name = "submit" value = "Get the Weather" />
    </form>

  )
}
}



module.exports = CityInput;
