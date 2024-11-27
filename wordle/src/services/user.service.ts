import { RegisterRequest, RegisterResponse } from "../types";

const BASE_URL = "https://we6.talentsprint.com/wordle/game";
const HEADERS = { "Content-Type": "application/json" };

export async function registerUser(request: RegisterRequest): Promise<RegisterResponse> {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(request),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Registration failed: ${error.message}`);
  }

  return response.json();
}
