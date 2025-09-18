import { create } from "zustand";

type SessionState = {
  studentCode: string;
  email: string;
  sessionId?: string;
  setStudentCode: (v: string) => void;
  setEmail: (v: string) => void;
  setSessionId: (v?: string) => void;
  reset: () => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  studentCode: "",
  email: "",
  sessionId: undefined,
  setStudentCode: (v) => set({ studentCode: v }),
  setEmail: (v) => set({ email: v }),
  setSessionId: (v) => set({ sessionId: v }),
  reset: () => set({ studentCode: "", email: "", sessionId: undefined }),
}));
