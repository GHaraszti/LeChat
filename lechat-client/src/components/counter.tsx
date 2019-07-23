/*eslint-disable no-unused-vars */
import * as React from 'react'

const Counter = (props:{value:any, onIncrement:any, onDecrement:any}) => {
    console.log('Properties: ', props);
    return       <div>
    <button onClick={props.onIncrement}>
      Increment
    </button>
    {' '}
    <button onClick={props.onDecrement}>
      Decrement
    </button>
    <hr />
    <div>
      Clicked: {props.value.counter} times
    </div>
  </div>
}



export default Counter