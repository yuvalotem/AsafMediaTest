import React, { Fragment, useState } from 'react'
import WindowDimensions from './hooks/WindowDimensions'
import './Board.css';
import pirate from './assets/pirate.png'


  function Board(props) {
      const { number, screen } = props
      const { width } = WindowDimensions();
      const isMobile = width < 1000

      const imageSize = {
        backgroundSize: isMobile ? "2000px 800px" : '2500px 1200px'
      }
      const fullScreen = {
        backgroundSize: isMobile ? '1050px 548px': '1500px 848px',
        backgroundPosition: isMobile ? "-100px -50px" : null
    }
      const leftPartScreen = {
        ...imageSize,
        backgroundPosition: isMobile ? "-200px -100px" : null
    }
      const rightPartScreen = {
        ...imageSize,
        backgroundPosition: isMobile ? "-600px -80px" : "-400px 0px"
    }
      const lowPartScreen = {
        ...imageSize,
        backgroundPosition: isMobile ? "-200px -120px" : "200px -100px"
    }
      const lowRightPartScreen = {
        ...imageSize,
        backgroundPosition: isMobile ? "-630px -120px" :"-400px -100px"
    }

      const positionsSmallScreen =[
          {
            top: isMobile ? "-10%" : "23%",
            left: isMobile ? "5%" : "430px",
          },
          {
            top: isMobile ? "-10%" : "15%",
            left: isMobile ? "5%" :"400px",
          },
          {
            top: isMobile ? "5%" : "35%",
            left:  isMobile ? "68%" : "1000px",
          },
          {
            top: isMobile ? "28%" : "50%",
            left: isMobile ? "8%" :"450px",
          },
          {
            top: isMobile ? "45%" : "60%",
            left: isMobile ? "8%" : "550px",
          },
          {
            top: isMobile ? "40%" : "58%",
            left: isMobile ? "480px" : "1000px",
          }
      ]
      const pirateSizeFullScreen =
        {
            width: "500px",
            height: "250px"
        }
      const positionsFullScreen =[
          {
            ...pirateSizeFullScreen,
            top: isMobile? "13%" : "23%",
            left: isMobile? "1%" : "290px",
          },
          {
            ...pirateSizeFullScreen,
            top: isMobile? "7%" : "18%",
            left: isMobile? "31%" : "570px",
          },
          {
            ...pirateSizeFullScreen,
            top: isMobile? "20%" :"25%",
            left: isMobile? "70%" :"930px",
          },
          {
            ...pirateSizeFullScreen,
            top: isMobile? "40%" : "45%",
            left: isMobile? "33%" : "600px",
          },
          {
            ...pirateSizeFullScreen,
            top: "55%",
            left: isMobile? "2%" :"300px",
          },
          {
            ...pirateSizeFullScreen,
            top: "55%",
            left: isMobile? "65%" :"920px"
          }
      ]

      if(window.innerHeight < window.innerWidth){
          return (
            <div id="board" style={
                screen === 'full' ? fullScreen :
                number === 5 ? lowPartScreen :
                number === 6 ? lowRightPartScreen :
                number !== 1 ? leftPartScreen && rightPartScreen : leftPartScreen}>
              <img style={screen === 'full' ?
              positionsFullScreen[number-1]:
              positionsSmallScreen[number-1]}
              src={pirate} className="pirate" />
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
      }else{
          return(
              <div>
                  game is not availabe in portarit mode
              </div>
          )
      }
  }

  export default Board;
