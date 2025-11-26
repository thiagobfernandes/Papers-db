import { useState } from "react";
import { Input } from "@material-tailwind/react";
import { Search as SearchIcon } from "lucide-react";

export function Search() {
  const [search, setSearch] = useState("");

  return (
    <div className="relative w-full max-w-md">
      <Input
        type="text"
        placeholder="Pesquisar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pl-10 pr-4 py-2 w-full border rounded-lg shadow focus:ring focus:ring-blue-300"
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        crossOrigin={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
      />
      <SearchIcon
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        size={20}
      />
    </div>
  );
}
