import './Header.css'
import { useState, useEffect, useContext, useRef } from "react"
import { UserContext } from "../Providers/UserContext"
// import svg
import treeSvg from '../assets/tree.svg'
// importing ambience
import forestAmbiencePath from '../assets/forest-ambience.mp3'
import beachAmbiencePath from '../assets/beach-ambience.mp3'
import mountainAmbiencePath from '../assets/mountain-ambience.mp3'
import cafeAmbiencePath from '../assets/cafe-ambience.mp3'
import libraryAmbiencePath from '../assets/library-ambience.mp3'
import terraceAmbiencePath from '../assets/terrace-ambience.mp3'
import spaceAmbiencePath from '../assets/space-ambience.mp3'
import hauntedHouseAmbiencePath from '../assets/haunted-house-ambience.mp3'


export default function Header() {
  const { backgroundImage, setBackgroundImage, ambience, setAmbience, isAmbience, setIsAmbience } = useContext(UserContext);

  // ==================== HANDLING SELECTS ==================== //
  const handleBackgroundImageChange = (event) => {
    setBackgroundImage(event.target.value);
  };
  
  useEffect(() => {
    document.body.className = backgroundImage;
  }, [backgroundImage]);

  // ==================== AMBIENCE ==================== //
  const forestAmbience = useRef(new Audio(forestAmbiencePath));
  const beachAmbience = useRef(new Audio(beachAmbiencePath));
  const mountainAmbience = useRef(new Audio(mountainAmbiencePath));
  const cafeAmbience = useRef(new Audio(cafeAmbiencePath));
  const libraryAmbience = useRef(new Audio(libraryAmbiencePath));
  const terraceAmbience = useRef(new Audio(terraceAmbiencePath));
  const spaceAmbience = useRef(new Audio(spaceAmbiencePath));
  const hauntedHouseAmbience = useRef(new Audio(hauntedHouseAmbiencePath));

  useEffect(() => {
    if (isAmbience && backgroundImage === 'forest') {
      forestAmbience.current.loop = true;
      forestAmbience.current.volume = 1;
      forestAmbience.current.play();
    } else {
      forestAmbience.current.pause();
    }
    if (isAmbience && backgroundImage === 'beach') {
      beachAmbience.current.loop = true;
      beachAmbience.current.volume = 1;
      beachAmbience.current.play();
    } else {
      beachAmbience.current.pause();
    }
    if (isAmbience && backgroundImage === 'mountain') {
      mountainAmbience.current.loop = true;
      mountainAmbience.current.volume = 1;
      mountainAmbience.current.play();
    } else {
      mountainAmbience.current.pause();
    }
    if (isAmbience && backgroundImage === 'cafe') {
      cafeAmbience.current.loop = true;
      cafeAmbience.current.volume = 1;
      cafeAmbience.current.play();
    } else {
      cafeAmbience.current.pause();
    }
    if (isAmbience && backgroundImage === 'library') {
      libraryAmbience.current.loop = true;
      libraryAmbience.current.volume = 1;
      libraryAmbience.current.play();
    } else {
      libraryAmbience.current.pause();
    }
    if (isAmbience && backgroundImage === 'terrace') {
      terraceAmbience.current.loop = true;
      terraceAmbience.current.volume = 1;
      terraceAmbience.current.play();
    } else {
      terraceAmbience.current.pause();
    }
    if (isAmbience && backgroundImage === 'space') {
      spaceAmbience.current.loop = true;
      spaceAmbience.current.volume = 1;
      spaceAmbience.current.play();
    } else {
      spaceAmbience.current.pause();
    }
    if (isAmbience && backgroundImage === 'haunted-house') {
      hauntedHouseAmbience.current.loop = true;
      hauntedHouseAmbience.current.volume = 1;
      hauntedHouseAmbience.current.play();
    } else {
      hauntedHouseAmbience.current.pause();
    }
  }, [isAmbience]);

  const enableAmbience = () => {
    setIsAmbience(!isAmbience);
  }

  return (
    <header className="header">
      <h2><img src={treeSvg} className='svg-image'/>PomoQuest</h2>
      <div className="navigation">
        <select value={backgroundImage} onChange={handleBackgroundImageChange}>
          <option value="forest">Forest</option>
          <option value="beach">Beach</option>
          <option value="mountain">Mountain</option>
          <option value="cafe">Cafe</option>
          <option value="library">Library</option>
          <option value="terrace">Terrace</option>
          <option value="space">Space</option>
          <option value="haunted-house">Haunted House</option>
        </select>
        <button onClick={enableAmbience}>{!isAmbience ? 'Enable Ambience' : 'Mute Ambience'}</button>
      </div>
    </header>
  )
}
