import { useState, useEffect } from "react";
import GuessForm from "./components/GuessForm";
import "./App.css";
import {
  Attempt,
  CreateGameResponse,
  GameCreationHandler,
  GuessHandler,
  GuessRequest,
  GuessResponse,
  RegisterRequest,
  RegisterResponse,
  RegistrationHandler,
} from "./types";
import CreateForm from "./components/CreateForm";
import RegistrationForm from "./components/RegistrationForm";
import { getCookie, setCookie } from "./utils/cookie"; // Import cookie utility

function Header({ title }: { title: string }) {
  return <h1>{title}</h1>;
}

function AttemptWithFeedback({ attempt }: { attempt: Attempt }) {
  const classes: Record<string, string> = {
    R: "not-present",
    Y: "wrong-pos",
    G: "correct-pos",
  };
  return (
    <div>
      {attempt.guess.split("").map((char, idx) => (
        <span key={idx} className={classes[attempt.feedback[idx]]}>
          {char}
        </span>
      ))}
    </div>
  );
}

function AttemptHistory({ attempts }: { attempts: Array<Attempt> }) {
  return (
    <ol>
      {attempts.map((attempt, idx) => (
        <li key={idx}>
          <AttemptWithFeedback attempt={attempt} />
        </li>
      ))}
    </ol>
  );
}

function App() {
  const [userid, setUserid] = useState<string>(""); // Default to empty string
  const [attempts, setAttempts] = useState<Array<Attempt>>([]);
  const [registered, setRegistered] = useState(false);
  const [created, setCreated] = useState(false);
  const [gameLost, setGameLost] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const VICTORY = "GGGGG";
  const gameOver = gameWon || gameLost;

  const baseURL = "https://we6.talentsprint.com/wordle/game/";
  const registerURL = baseURL + "register";
  const createGameURL = baseURL + "create";
  const guessURL = baseURL + "guess";

  const postHeaders = new Headers();
  postHeaders.append("Content-Type", "application/json");

  // Reset game state
  function resetGameState() {
    setAttempts([]);
    setGameLost(false);
    setGameWon(false);
    setAnswer("");
  }

  // Check if user is already registered (check cookie on page load)
  useEffect(() => {
    const storedUserId = getCookie("userid");
    if (storedUserId) {
      setUserid(storedUserId);
      setRegistered(true); // Automatically register if cookie exists
    }
  }, []);

  const submitGuess: GuessHandler = async (guess) => {
    setLoading(true);
    const request: GuessRequest = { id: userid, guess };
    try {
      const response = await fetch(guessURL, {
        method: "POST",
        body: JSON.stringify(request),
        headers: postHeaders,
        credentials: "include",
      });
      if (response.status === 422) setGameLost(true);

      const data = (await response.json()) as GuessResponse;
      setAttempts([...attempts, { guess, feedback: data.feedback }]);
      if (data.feedback === VICTORY) setGameWon(true);
      setAnswer(data.answer ?? "");
      return data;
    } finally {
      setLoading(false);
    }
  };

  const register: RegistrationHandler = async (username) => {
    setLoading(true);
    const request: RegisterRequest = { name: username, mode: "wordle" };
    try {
      const response = await fetch(registerURL, {
        method: "POST",
        body: JSON.stringify(request),
        headers: postHeaders,
        credentials: "include",
      });
      if (response.status !== 201) {
        throw new Error(
          `The server says: ${response.status} - ${await response.json()}`
        );
      }
      const data = (await response.json()) as RegisterResponse;
      setUserid(data.id); // Set user ID from response
      setRegistered(true);
      setCookie("userid", data.id); // Save user ID in cookie
      resetGameState();
      return data;
    } finally {
      setLoading(false);
    }
  };

  const createGame: GameCreationHandler = async (createGameRequest) => {
    setLoading(true);
    try {
      const response = await fetch(createGameURL, {
        method: "POST",
        headers: postHeaders,
        body: JSON.stringify(createGameRequest),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(
          `The server says: ${response.status} - ${await response.json()}`
        );
      }
      setCreated(true);
      resetGameState();
      const data = (await response.json()) as CreateGameResponse;
      return data;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header title="Wordle" />
      <AttemptHistory attempts={attempts} />
      {gameWon && (
        <div className="message victory">
          🎉 Congratulations! The correct answer was {answer}.
        </div>
      )}
      {gameLost && (
        <div className="message defeat">
          😢 Try again! The correct answer was {answer}.
        </div>
      )}
      <Header
        title={
          created && !gameOver
            ? "Guess"
            : registered
            ? "Create a New Game"
            : "Register Yourself"
        }
      />
      {loading && <p>Loading...</p>}
      {!gameOver &&
        (created ? (
          <GuessForm submitGuess={submitGuess} />
        ) : registered ? (
          "Create a game first"
        ) : (
          "Register first"
        ))}
      {registered ? (
        <CreateForm userid={userid} createGame={createGame} />
      ) : (
        <RegistrationForm register={register} setUserid={setUserid} />
      )}
    </div>
  );
}

export default App;
