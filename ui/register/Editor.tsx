"use client";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface EditorProps {
  name: string;
  defaultValue?: string; // ✅ 기본값 받을 수 있도록 추가
}

const Editor: React.FC<EditorProps> = ({ name, defaultValue }) => {
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  const handleChange = (newValue: string | undefined) => {
    setValue(newValue ?? "");
  };

  return (
    <div>
      <MDEditor value={value} onChange={handleChange} />
      <input type='hidden' name={name} value={value} />
    </div>
  );
};

export default Editor;
