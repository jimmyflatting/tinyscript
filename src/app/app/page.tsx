import Interface from "@/components/Chat/Interface";
import Sidebar from "@/components/Chat/Sidebar";

function page() {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <Interface />
    </div>
  );
}

export default page;
