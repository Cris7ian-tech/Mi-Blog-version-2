
export type HistoryItem =
  | { type: "text"; command: string; output: string }
  | { type: "list"; command: string; output: string[] };
  // | { type: "component"; command: string; output: React.ReactNode };

export interface Post {
  id: string;
  filename: string;
  content: string;
  type?: string;
}