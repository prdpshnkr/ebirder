import React, { Component, Fragment } from 'react'
import axios from 'axios'

class Logger extends Component {
  constructor(props) {
    super(props)
    this.state = {
      entrys: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8000/entrys')
      .then(response => {
        this.setState(() => ({
          entrys: response.data
        }))
      })
  }

  render() {
    return (
      <Fragment>
        <h2>Entries - {this.state.entrys.length}</h2>
        <ul>
          {this.state.entrys.map(entry => {
            return <li key={entry._id}>{entry.bird}</li>
          })}
        </ul>
      </Fragment>
    )
  }
}

export default Logger