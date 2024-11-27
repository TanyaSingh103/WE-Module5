import { ChangeEvent, FormEvent, useState } from "react"
import { CreateGameRequest, GameCreationHandler } from "./types";

interface CreateFormProps {
  userid: string;
  createGame: GameCreationHandler;
}

export default function CreateForm({ userid, createGame }: CreateFormProps) {

  const [overwrite, setOverwrite] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  function handleRadioChange(e: ChangeEvent<HTMLInputElement>) {
    setOverwrite(e.target.value === 'true');
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const createGameRequest: CreateGameRequest = { id: userid, overwrite: overwrite };
      await createGame(createGameRequest);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(Error("an unknown error occurred"));
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      Overwrite?
      <label>Yes<input type="radio" name="overwrite" value="true" checked={overwrite} onChange={handleRadioChange} /></label>
      <label>No<input type="radio" name="overwrite" value="false" checked={!overwrite} onChange={handleRadioChange} /></label>
      <button type="submit">Create New Game!</button>
      {error?.message}
    </form>
  )
}