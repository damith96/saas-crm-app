"use client";

import { Loader2, SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";

export function AsyncFilter() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="w-full d-flex items-center justify-center">
      <SearchIcon className="mr-2 h-4 w-4 text-muted-foreground" />
      <Input
        className="flex-1"
        type="text"
        // placeholder={placeholder || "Search..."}
        value={inputValue}
        onChange={(e) => {
          const value = e.target.value;
          setInputValue(value);
          // onChange(value);
        }}
      />
      {isLoading && (
        <Loader2 className="ml-2 h-4 w-4 animate-spin text-muted-foreground" />
      )}
    </div>
  );
}
