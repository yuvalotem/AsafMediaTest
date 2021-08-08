import React, { Fragment, useState } from 'react'
import {
    Snackbar,
    Alert
  } from '@material-ui/core';
  import './Board.css';
  import pirate from './assets/pirate.jpg'
  import Dragon from './assets/Dragon.png'
  import bottel from './assets/bottel.png'
  import island from './assets/island.png'
  import treasue from './assets/treasue.png'
  import barrel from './assets/barrel.png'

  function Board(props) {
      const { number, screen } = props
      const fullScreen = {
        backgroundSize: 'auto'
    }
      const leftPartScreen = {
        backgroundSize: 'cover'
    }
      const rightPartScreen = {
        backgroundPosition: "0px 0px"
    }
      const lowPartScreen = {
        backgroundPosition: "200px -100px"
    }
      const lowRightPartScreen = {
        backgroundPosition: "0px -100px"
    }
    const changeScreenPosition = (x, y) =>{

    }
      const positionsSmallScreen =[
          {
            top: "15%",
            left: "25%",
          },
          {
            top: "15%",
            left: "25%",
          },
          {
            top: "15%",
            left: "65%",
          },
          {
            top: "70%",
            left: "25%",
          },
          {
            top: "70%",
            left: "25%",
          },
          {
            top: "70%",
            left: "65%",
          }
      ]
      const positionsFullScreen =[
          {
            top: "15%",
            left: "25%",
          },
          {
            top: "20%",
            left: "55%",
          },
          {
            top: "25%",
            left: "80%",
          },
          {
            top: "70%",
            left: "53%",
          },
          {
            top: "75%",
            left: "25%",
          },
          {
            top: "70%",
            left: "75%",
          }
      ]
    return (
      <div id="board" style={
          screen === 'full' ? fullScreen :
          number === 5 ? leftPartScreen && lowPartScreen :
          number === 6 ? lowRightPartScreen :
          number !== 1 ? leftPartScreen && rightPartScreen : leftPartScreen}>
        <img style={screen === 'full' ?
        positionsFullScreen[number-1]:
        positionsSmallScreen[number-1]}
        src={pirate} class="pirate" />
        {/* {(number === 1 ||  number === 5)  & screen !== 'full' ?
            <Fragment>
                <div class="cell"></div>
                <div class="cell"><img src={barrel} id="barrel" /></div>
                <div class="cell"><img src={bottel} id="bottel" /></div>
                <div class="cell"><img src={treasue} id="treasue" /></div>
            </Fragment>
            : screen !== 'full' ?
            <Fragment>
                <div class="cell"><img src={barrel} id="barrel" /></div>
                <div class="cell"><img src={Dragon} id="Dragon" /></div>
                <div class="cell"><img src={treasue} id="treasue" /></div>
                <div class="cell"><img src={island} id="island" /></div>
            </Fragment>
            :
            <Fragment>
                <div class="cell"></div>
                <div class="cell"><img src={barrel} id="barrel" /></div>
                <div class="cell"><img src={Dragon} id="Dragon" /></div>
                <div class="cell"><img src={bottel} id="bottel" /></div>
                <div class="cell"><img src={treasue} id="treasue" /></div>
                <div class="cell"><img src={island} id="island" /></div>
            </Fragment>
            } */}

      </div>
    );
  }

  export default Board;
