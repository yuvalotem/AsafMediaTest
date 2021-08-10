import React from 'react'
import WindowDimensions from './hooks/WindowDimensions'
import './Board.css';
import pirate from './assets/pirate.png'


  function Board(props) {
      const { number, screen } = props
      const { width, height } = WindowDimensions();
      const isMobile = width < 1000

      const imageSize = {
        backgroundSize: isMobile ? "275% 230%" : '165% 180%'
      }
      const fullScreen = {
        backgroundSize: isMobile ? '150% 180%': '98% 120%',
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
            top: isMobile ? "5%" : "34%",
            left: isMobile ? "15%" : "34%",
          },
          {
            top: isMobile ? "5%" : "26%",
            left: isMobile ? "8%" :"32%",
          },
          {
            top: isMobile ? "17%" : "42%",
            left:  isMobile ? "73%" : "72%",
          },
          {
            top: isMobile ? "41%" : "60%",
            left: isMobile ? "12%" :"35%",
          },
          {
            top: isMobile ? "60%" : "70%",
            left: isMobile ? "20%" : "43%",
          },
          {
            top: isMobile ? "50%" : "65%",
            left: "70%",
          }
      ]
      const pirateSizeFullScreen =
        {
            width: "41px",
            height: "70px"
        }
      const positionsFullScreen =[
          {
            ...pirateSizeFullScreen,
            top: isMobile? "25%" : "28%",
            left: isMobile? "10%" : "23.5%",
          },
          {
            ...pirateSizeFullScreen,
            top: isMobile? "18%" : "24%",
            left: isMobile? "38%" : "41.5%",
          },
          {
            ...pirateSizeFullScreen,
            top: isMobile? "31%" :"32%",
            left: isMobile? "75%" :"65%",
          },
          {
            ...pirateSizeFullScreen,
            top: isMobile? "49%" : "46%",
            left: isMobile? "42%" : "44%",
          },
          {
            ...pirateSizeFullScreen,
            top: isMobile? "75%" : "62%",
            left: isMobile? "12%" :"24%",
          },
          {
            ...pirateSizeFullScreen,
            top: isMobile? "68%" : "60%",
            left: isMobile? "74%" :"65%"
          }
      ]

      if(height < width){
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
