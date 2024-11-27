import {ChangeEvent, FormEvent, useState} from 'react';
import { GuessHandler } from './types';

export default function GuessForm({ submitGuess }: { submitGuess: GuessHandler }) {
  const [guess, setGuess] = useState('');
  const [error, setError] = useState<Error | null>(null);
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await submitGuess(guess);
      setGuess("");
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error('An unknown error occurred'));
      }
    }
  }
  function handleTextInputChange(e: ChangeEvent<HTMLInputElement>) {
    setGuess(e.target.value);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={guess} onChange={handleTextInputChange} />
      <button type="submit">Guess!</button>
      {error?.message}
    </form>
  )
}