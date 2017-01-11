class SimpleComponent {
  constructor(props, ctx) {
    super(props, ctx);
  }
  render() {
    return (
      <div> Simple text. </div>
    )
  }
}
 
SimpleComponent = require('clear-render')(SimpleComponent)