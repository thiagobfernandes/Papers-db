import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { File,  User2 } from "lucide-react";
import { useAuth } from "../lib/auth-context";

export function Sidebar() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="h-screen w-54 bg-gray-900 text-white p-4 flex flex-col">
      <NavigationMenu.Root className="flex flex-col gap-4 list-none">
        <NavigationMenu.Item>
          <NavigationMenu.Link
            href="/"
            className="flex items-center gap-2 p-3 rounded-lg text-xl font-bold hover:bg-gray-700"
          >
            Exploits JT
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        <span className="border-1"></span>
       
        <NavigationMenu.Item>
          <NavigationMenu.Link
            href="/papers"
            className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-700"
          >
            <File size={20} />
            Papers
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      
        <span className="border-1"></span>
        <NavigationMenu.Item>
          <NavigationMenu.Link
            href={isAuthenticated ? "/user" : "/login"}
            className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-700"
          >
            <User2 size={20} />
            {isAuthenticated ? "Perfil" : "Login"}
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.Root>
    </div>
  );
}
