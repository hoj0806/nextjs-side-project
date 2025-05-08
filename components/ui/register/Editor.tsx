"use client";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface EditorProps {
  name: string;
}

const Editor: React.FC<EditorProps> = ({ name }) => {
  const [value, setValue] = useState<string>("");

  const handleChange = (newValue: string | undefined) => {
    setValue(newValue ?? "");
  };

  return (
    <div>
      <MDEditor value={value} onChange={handleChange} />

      {/* form 데이터와 함께 제출할 수 있도록 hidden input 추가 */}
      <input type='hidden' name={name} value={value} />
    </div>
  );
};

export default Editor;
