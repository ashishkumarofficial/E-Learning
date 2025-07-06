import React, { useRef, useEffect, useCallback } from 'react';

const RichTextEditor = ({ input, setInput }) => {
  const editorRef = useRef(null);
  const debounceTimeout = useRef(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== input.description) {
      editorRef.current.innerHTML = input.description || '';
    }
  }, [input.description]);

  const handleInput = useCallback(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      if (editorRef.current) {
        setInput((prev) => ({
          ...prev,
          description: editorRef.current.innerHTML,
        }));
      }
    }, 200); // Debounce by 200ms
  }, [setInput]);

  const handleCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    handleInput();
  };

  return (
    <div className="border rounded-lg shadow-md w-full max-w-3xl mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:border-gray-600 ">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-2 border-b bg-gray-50 rounded-t-lg dark:bg-gray-800 dark:border-gray-700" >
        {[
          { label: 'B', command: 'bold' },
          { label: 'I', command: 'italic' },
          { label: 'U', command: 'underline' },
          { label: 'Clear', command: 'removeFormat' },
        ].map(({ label, command, value }) => (
          <button
            key={label}
            onClick={() => handleCommand(command, value)}
            className="px-2 w-16 py-1 bg-white border rounded hover:bg-gray-200 text-sm font-medium "
          >
            {label}
          </button>
        ))}
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="p-4 min-h-[200px] text-base focus:outline-none prose max-w-none dark:text-white"
        spellCheck={true}
      ></div>
    </div>
  );
};

export default RichTextEditor;
