import Link from "next/link";
import React from "react";

function Sidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r bg-background p-4 sm:flex">
      <div className="flex-1 overflow-auto">
        <div className="space-y-2">
          <div className="flex items-center gap-2 rounded-md p-2 hover:bg-muted">
            <div className="font-medium">John Doe</div>
            <div className="text-sm text-muted-foreground">
              Hey, how&apos;s it going?
            </div>
          </div>

          <Link
            href="#"
            className="flex items-center gap-2 rounded-md p-2 hover:bg-muted"
            prefetch={false}
          >
            <div>
              <div className="font-medium">Jane Smith</div>
              <div className="text-sm text-muted-foreground">
                Did you see the new update?
              </div>
            </div>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md p-2 hover:bg-muted"
            prefetch={false}
          >
            <div>
              <div className="font-medium">Bob Johnson</div>
              <div className="text-sm text-muted-foreground">
                Let&apos;s discuss the project details.
              </div>
            </div>
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 rounded-md p-2 hover:bg-muted"
            prefetch={false}
          >
            <div>
              <div className="font-medium">Emily Davis</div>
              <div className="text-sm text-muted-foreground">
                I have a question about the feature.
              </div>
            </div>
          </Link>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
