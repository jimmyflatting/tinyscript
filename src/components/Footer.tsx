import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-muted-foreground">
        Tiny<span className="font-bold">Script</span> &copy; 2024. All rights
        reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link
          href="https://x.com/foreversegfault"
          className="text-xs hover:underline underline-offset-4"
          prefetch={false}
        >
          Twitter / X
        </Link>
        <Link
          href="https://www.hjart-lungfonden.se/"
          className="text-xs hover:underline underline-offset-4"
          prefetch={false}
        >
          Donate to the Heart-Lung Foundation
        </Link>
      </nav>
    </footer>
  );
}

export default Footer;
