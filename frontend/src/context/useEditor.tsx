import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context state
interface EditorContextType {
  content: string;
  setContent: (content: string) => void;
}

// Create the context with a default value of `undefined`
const EditorContext = createContext<EditorContextType | undefined>(undefined);

// Props for the Provider component
interface EditorProviderProps {
  children: ReactNode;
}

// Provider component
export const EditorProvider: React.FC<EditorProviderProps> = ({ children }) => {
  const [content, setContent] = useState<string>("");

  return (
    <EditorContext.Provider value={{ content, setContent }}>
      {children}
    </EditorContext.Provider>
  );
};

// Custom hook to use the EditorContext
export const useEditor = (): EditorContextType => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditor must be used within an EditorProvider");
  }
  return context;
};
