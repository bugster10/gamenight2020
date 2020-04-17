import React, { Component } from 'react';
import $ from './vendor/js/jquery-3.4.1.min.js'
import jQuery from './vendor/js/jquery-3.4.1.min.js';
import './vendor/css/bootstrap.min.css';
import './css/styles.css';

import data from './data.json';

var music = new Audio('src/media/music.mp3');
var select = new Audio('src/media/select.mp3'); 
music.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);


class App extends React.Component {
  constructor(props) {
    super(props)
    // Bind the this context to the handler function
    this.handler = this.handler.bind(this);
    // Set some state
    this.state = {
      id: null,
      "name": null,
      "class": null,
      "tier": null,
      "anime": null,
      "gay": null,
      "cummie": null,
      "ontime": null,
      "afk": null,
      "chaos": null,
      "retard": null,
      "user": {
        "image": null,
        "quote": null,
        "intro": null,
        "moments": [null]
        }
    };
  }
  // This method will be sent to the child component
  handler(index) {
    music.play();
    select.pause();
    select.currentTime = 0;
    select.play();
    this.setState({
      id: index,
      name: data[index].name, 
      class: data[index].class, 
      tier: data[index].tier, 
      anime: data[index].anime,
      gay: data[index].gay,
      cummie: data[index].cummie, 
      ontime: data[index].ontime, 
      afk: data[index].afk, 
      chaos: data[index].chaos, 
      retard: data[index].retard, 
      user: data[index].user,
    });
  }
  render() {
    return (
      <React.Fragment>
      <CharacterDisplay data={this.state}/>
      <CharacterSelection action={this.handler} parentIndex={this.state.id}/>
      </React.Fragment>
    );
  }
}

class CharacterDisplay extends React.Component {
  render() {
    const data = this.props.data;
    if (data.id === null) return <div id="character-display" className="nes-container is-dark with-title">
      <p id="title" className="title">CHOOSE YOUR CHARACTER</p>
    </div>
    return (
      <div id="character-display" className="nes-container is-dark with-title">
        <p id="title" className="title">{data.name}</p>
        <div className="row">
          <div className="col-4 nopadding">
            <div className="nes-container is-dark with-title is-centered" id="stats">
              <p className="title">STATS</p>
              <p>TIER {data.tier}</p>
              <p>CUMMIE {data.cummie}/5</p>
              <p>ONTIME {data.ontime}/5</p>
              <p>AFK {data.afk}/5</p>
              <p>CHAOS {data.chaos}/5</p>
              <p>RETARD {data.retard}/5</p>
              <p>ANIME {data.anime}/5</p>
              <p>GAY {data.gay}/5</p>
            </div>
          </div>
          <div className="col-8 nopadding">
            <div className="nes-container is-dark with-title" id="skills">
              <p className="title">INFO</p>
                <img className="is-primary" id="player-icon" src={data.user.image}></img>
                <p><i>"{data.user.quote}"</i></p>
                <p>CLASS : {data.class}</p>
              <p>{data.user.intro}</p>
              <br></br>
              <p>MOMENTS</p>
              <ul>
              {data.user.moments.map(function(e, index){
                return (
                  <li key={index}>
                    {e}
                  </li>
                )
              })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


class CharacterSelection extends React.Component {
  render() {
    var that = this;
    return (
  <div id="character-selection">
    <div className="nes-container is-dark">
      <div className="row justify-content-start is-dark">
        {data.map(function(e, index){
          return (
            <button onClick={() => that.props.action(index)} key={index} 
            className={that.props.parentIndex == index 
              ? "character nes-btn is-primary" 
              : "character nes-btn"}
            style={{ backgroundImage: `url(${e.user.image})`}}>
            </button>
          )
        })}
      </div>
    </div>
  </div>
    );
  }
}



export {App};
