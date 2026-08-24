"use client";

import { Loader2, SearchIcon } from "lucide-react";
import { useState, ComponentProps, useRef } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "./ui/card";

type AsyncFilterProps = {
  placeholder?: string;
  debounceTime?: number;
  fetchOptions: (query: string) => Promise<any[]>;
  onSelect: (item: any) => void;
};

export function AsyncFilter({
  placeholder,
  className,
  debounceTime,
  fetchOptions,
  onSelect,
  ...props
}: AsyncFilterProps & ComponentProps<typeof Card>) {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<any[]>([]);
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  return (
    <Card className={cn("rounded-md p-0 gap-0", className)} {...props}>
      <CardContent className="px-2">
        <div className="flex flex-row items-center gap-2 px-1 py-2">
          <SearchIcon className="mr-2 h-4 w-4 text-muted-foreground" />
          <input
            className="flex-1 border-none outline-none bg-transparent"
            type="text"
            placeholder={placeholder || "Search..."}
            value={inputValue}
            onChange={(e) => {
              const value = e.target.value;
              setInputValue(value);

              clearTimeout(timerRef.current);
              timerRef.current = setTimeout(() => {
                setIsLoading(true);
                fetchOptions(value)
                  .then((options) => {
                    setOptions(options);
                  })
                  .catch()
                  .finally(() => setIsLoading(false));
              }, debounceTime || 2000);
            }}
          />
          {isLoading && (
            <Loader2 className="ml-2 h-4 w-4 animate-spin text-muted-foreground" />
          )}
        </div>
      </CardContent>
      <CardFooter className="p-0">
        {options.length > 0 && (
          <ul className="mt-2 max-h-60 overflow-y-auto">
            {options.map((option, index) => (
              <li
                key={index}
                className="px-3 py-2 hover:bg-muted"
                onClick={() => {
                  onSelect(option);
                }}
              >
                {option.value}
              </li>
            ))}
          </ul>
        )}
      </CardFooter>
    </Card>
  );
}
