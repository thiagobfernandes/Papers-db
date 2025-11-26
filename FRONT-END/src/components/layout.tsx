import { Header } from "./haeder";
import { Sidebar } from "./sidebar";

interface Props {
  showHeader?: boolean;
}

export function Layout({
  children,
  showHeader,
}: React.PropsWithChildren<Props>) {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 ">
        {showHeader && <Header />}
        <main className="flex-1 p-4 ">{children}</main>
      </div>
    </div>
  );
}
