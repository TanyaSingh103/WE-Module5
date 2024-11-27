import { CreateGameRequest, CreateGameResponse, GuessRequest, GuessResponse } from "../types";

const BASE_URL = "https://we6.talentsprint.com/wordle/game";
const HEADERS = { "Content-Type": "application/json" };

export async function createGame(request: CreateGameRequest): Promise<CreateGameResponse> {
  const response = await fetch(`${BASE_URL}/create`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(request),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Game creation failed: ${error.message}`);
  }

  return response.json();
}

export async function submitGuess(request: GuessRequest): Promise<GuessResponse> {
  const response = await fetch(`${BASE_URL}/guess`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(request),
    credentials: "include",
  });

  if (!response.ok) {
    if (response.status === 422) {
      throw new Error("Game over: You've exhausted all attempts.");
    }
    const error = await response.json();
    throw new Error(`Guess submission failed: ${error.message}`);
  }

  return response.json();
}
