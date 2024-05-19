import { useState, createContext } from "react"

export const UserContext = createContext();

export function UserContextProvider({children}) {
  // statistics
  const [completedSessions, setCompletedSessions] = useState(0);
  const [workMinutes, setWorkMinutes] = useState(0);
  const [restMinutes, setRestMinutes] = useState(0);
  const [plantedTrees, setPlantedTrees] = useState(0);
  // app
  const [workTime, setWorkTime] = useState(25);
  const [restTime, setRestTime] = useState(5);
  const [timer, setTimer] = useState(workTime * 60);
  const [workIsRunning, setWorkIsRunning] = useState(false);
  const [restTimer, setRestTimer] = useState(restTime * 60);
  const [restIsRunning, setRestIsRunning] = useState(false);
  // trees
  const [treesArray, setTreesArray] = useState(() => {
    const savedTrees = localStorage.getItem('treesArray');
    return savedTrees ? JSON.parse(savedTrees) : [];
  });
  // settings
  const [backgroundImage, setBackgroundImage] = useState("forest");
  const [ambience, setAmbience] = useState("forest");
  const [isAmbience, setIsAmbience] = useState(false);

  return (
    <UserContext.Provider value={{
      completedSessions, setCompletedSessions,
      workMinutes, setWorkMinutes,
      restMinutes, setRestMinutes,
      plantedTrees, setPlantedTrees,
      workTime, setWorkTime,
      restTime, setRestTime,
      timer, setTimer,
      workIsRunning, setWorkIsRunning,
      restTimer, setRestTimer,
      restIsRunning, setRestIsRunning,
      treesArray, setTreesArray,
      backgroundImage, setBackgroundImage,
      ambience, setAmbience,
      isAmbience, setIsAmbience,
    }}>
      {children}
    </UserContext.Provider>
  )
}
