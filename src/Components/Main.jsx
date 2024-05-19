import './Main.css'
import { useState, useEffect, useContext } from "react"
import { UserContext } from "../Providers/UserContext"
// importing sounds
import levelUpSound from '../assets/level-up-sound.mp3'
// importing components


export default function Main() {
  const { timer, setTimer, workTime, setWorkTime, restTime, setRestTime, workIsRunning, setWorkIsRunning, restTimer, setRestTimer, restIsRunning, setRestIsRunning, treesArray, setTreesArray, } = useContext(UserContext);

  

  // ==================== SOUNDS ==================== //
  const levelUpAudio = new Audio(levelUpSound);

  // ==================== HANDLING SELECTS ==================== //

  const handleWorkTimeChange = (event) => {
    setWorkTime(event.target.value);
  };

  const handleRestTimeChange = (event) => {
    setRestTime(event.target.value);
  };

  // ==================== FORMATING TIME ==================== //

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }

  useEffect(() => {
    setTimer(workTime * 60); // Update timer when workTime changes
    setRestTimer(restTime * 60); // Update restTimer when restTime changes
  }, [workTime, restTime]);

  // ==================== WORK TIMER ==================== //
  useEffect(() => {
    let intervalId
    let startTime;
    if (workIsRunning && timer > 0) {
      startTime = Date.now();
      intervalId = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        setTimer(timer => Math.max(timer - elapsedTime, 0));
        startTime = Date.now();
      }, 1000);

      return () => clearInterval(intervalId); // Clean up on unmount or if dependencies change
    } else if (timer === 0) {
      const newTreesArray = [...treesArray, '🌲'];
      setTreesArray(newTreesArray);
      localStorage.setItem('treesArray', JSON.stringify(newTreesArray));
      setWorkIsRunning(false);
      setWorkTime(25);
      setRestIsRunning(true);
      levelUpAudio.play();
    }
  }, [workIsRunning, timer]);

  // ==================== REST TIMER ==================== //
  useEffect(() => {
    let intervalId;
    let startTime;
    if (restIsRunning && restTimer > 0) {
      startTime = Date.now();
      intervalId = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        setRestTimer(restTimer => Math.max(restTimer - elapsedTime, 0));
        startTime = Date.now();
      }, 1000);
    } else if (restTimer === 0) {
      setRestIsRunning(false);
      setRestTime(5);
      levelUpAudio.play();
    }

    return () => clearInterval(intervalId); // Clean up on unmount or if dependencies change
  }, [restIsRunning, restTimer]);

  // ==================== TREES ==================== //
  useEffect(() => {
    return () => {
      localStorage.setItem('treesArray', JSON.stringify(treesArray));
    };
  }, [treesArray]);

  // ==================== BUTTON LOGIC ==================== //

  // ==================== WORK TIMER ======================= //
  const startWorkTimer = () => {
    setWorkIsRunning(true);
    setRestIsRunning(false);
  };

  const pauseWorkTimer = () => {
    setWorkIsRunning(false);
  };

  const resetWorkTimer = () => {
    setWorkIsRunning(false);
    setTimer(workTime * 60);
  };

  // ==================== REST TIMER ======================= //
  const startRestTimer = () => {
    setRestIsRunning(true);
    setWorkIsRunning(false);
  };

  const pauseRestTimer = () => {
    setRestIsRunning(false);
  };

  const resetRestTimer = () => {
    setRestIsRunning(false);
    setRestTimer(restTime * 60);
  };

  // ==================== TITLE ==================== //
  document.title = `PomoQuest - ${workIsRunning ? formatTime(timer) : 'Paused' || restIsRunning ? formatTime(restTimer) : 'Paused'}`;
  
  return (
    <div className='main-section'>
      <div className="timer-section">
        <div className="work-section">
          <h3>Work</h3>
          <h1>{formatTime(timer)}</h1>
          <select value={workTime} onChange={handleWorkTimeChange}>
            <option value="1">1 minute</option>
            <option value="5">5 minutes</option>
            <option value="10">10 minutes</option>
            <option value="15">15 minutes</option>
            <option value="20">20 minutes</option>
            <option value="25">25 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">60 minutes</option>
          </select>
          <div className='button-section'>
            <button className='start-btn' onClick={startWorkTimer}>Start</button>
            <button className='pause-btn' onClick={pauseWorkTimer}>Pause</button>
            <button className='reset-btn' onClick={resetWorkTimer}>Reset</button>
          </div>
        </div>
        <div className="rest-section">
          <h3>Rest</h3>
          <h1>{formatTime(restTimer)}</h1>
          <select value={restTime} onChange={handleRestTimeChange}>
            <option value="1">1 minute</option>
            <option value="5">5 minutes</option>
            <option value="10">10 minutes</option>
            <option value="15">15 minutes</option>
          </select>
            <div className="button-section">
              <button className='start-btn' onClick={startRestTimer}>Start</button>
              <button className='pause-btn' onClick={pauseRestTimer}>Pause</button>
              <button className='reset-btn' onClick={resetRestTimer}>Reset</button>
            </div>
        </div>
      </div>
      <div className="tree-section">
        <div>Each work session plants a tree!</div>
        <div>Trees planted: {treesArray.map(tree => tree)} </div>
      </div>
    </div>
  )
}
