import React from "react";

/**
 * Footer component displays the site footer.
 * @returns {JSX.Element} The rendered footer.
 * @precondition Should be used at the bottom of a page layout.
 */
export default function Footer() {
  return (
    <footer className="w-full bg-[#012a4a] text-center text-sm text-gray-300 py-4">
      © 2025 SaaSka Software, Inc. All rights reserved.  | {"  "}
      <a href="#" className="hover:underline ml-4">Privacy</a>
    </footer>
  );
}
