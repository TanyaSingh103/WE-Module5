// types.ts

export interface RegisterRequest {
    name: string;
    mode?: string;
  }
  
  export interface RegisterResponse {
    id: string;
    message: string;
  }
  
  export interface CreateGameRequest {
    id: string;
    overwrite?: boolean;
  }
  
  export interface CreateGameResponse {
    created: boolean;
    message: string;
  }
  
  export interface GuessRequest {
    id: string;
    guess: string;
  }
  
  export interface GuessResponse {
    feedback: string;
    message: string;
    answer?: string;
  }
  
  export interface Attempt {
    guess: string;
    feedback: string;
  }
  
  // Type definitions for handler functions
  export type GuessHandler = (guess: string) => Promise<GuessResponse>;
  export type RegistrationHandler = (username: string) => Promise<RegisterResponse>;
  export type GameCreationHandler = (request: CreateGameRequest) => Promise<CreateGameResponse>;
  