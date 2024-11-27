import { Attempt } from "../types";

function AttemptWithFeedback({ attempt }: { attempt: Attempt }) {
  const classes: Record<string, string> = { R: "not-present", Y: "wrong-pos", G: "correct-pos" };

  return (
    <>
      {attempt.guess.split("").map((char, idx) => (
        <span key={idx} className={classes[attempt.feedback[idx]]}>
          {char}
        </span>
      ))}
    </>
  );
}

export function AttemptHistory({ attempts }: { attempts: Attempt[] }) {
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
