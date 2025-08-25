import React from "react";

/**
 * Footer component displays the site footer.
 * @returns {JSX.Element} The rendered footer.
 *
 *Privacy page is currently non existent. It will require a new page to be made once a privacy policy is in place.
*/
export default function Footer() {
  return (
    <footer className="w-full bg-[#012a4a] text-center text-sm text-gray-300 py-4 mobile-footer">
      <div className="mobile-footer-content">
        <span className="mobile-footer-text">
          © 2025 SaaSka Software, Inc. All rights reserved.
        </span>
        <span className="mobile-footer-divider"> | </span>

        <a href="#" className="hover:underline ml-4 mobile-footer-link">
          Privacy 
        </a>
      </div>
      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-footer {
            padding: 20px 15px !important;
            margin-top: 40px !important;
          }

          .mobile-footer-content {
            display: flex;
            flex-direction: column;
            gap: 8px;
            align-items: center;
          }

          .mobile-footer-text {
            font-size: 12px !important;
            line-height: 1.4 !important;
          }

          .mobile-footer-divider {
            display: none;
          }

          .mobile-footer-link {
            font-size: 12px !important;
            margin: 0 !important;
            padding: 8px 15px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .mobile-footer {
            padding: 15px 10px !important;
          }

          .mobile-footer-text {
            font-size: 11px !important;
          }

          .mobile-footer-link {
            font-size: 11px !important;
          }
        }
      `}</style>
    </footer>
  );
}
