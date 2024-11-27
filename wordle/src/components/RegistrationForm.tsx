import { FormEvent, useState } from "react"
import { RegistrationHandler } from "./types";

interface RegistrationFormProps {
  register: RegistrationHandler;
  setUserid: (id: string) => void;
}

export default function RegistrationForm({ register, setUserid }: RegistrationFormProps) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState<Error | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const registerResponse = await register(username);
      setUserid(registerResponse.id);
      setUsername("");
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
      <input type="text" value={username} required={true} onChange={(e) => setUsername(e.target.value)} />
      <button type="submit">Register</button>
      {error?.message}
    </form>
  )
}