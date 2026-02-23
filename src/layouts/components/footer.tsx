export const Footer = () => {
  return (
    <footer className="bg-[#121212] pt-16 pb-10 px-8 text-white font-sans">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <div className="flex flex-wrap gap-16 md:gap-24">
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-sm">Company</h3>
            <ul className="flex flex-col gap-2 text-text-subdued text-sm font-medium">
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:underline transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:underline transition-colors"
                >
                  Jobs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:underline transition-colors"
                >
                  For the Record
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-sm">Communities</h3>
            <ul className="flex flex-col gap-2 text-text-subdued text-sm font-medium">
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:underline transition-colors"
                >
                  For Artists
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:underline transition-colors"
                >
                  Developers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:underline transition-colors"
                >
                  Advertising
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:underline transition-colors"
                >
                  Investors
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:underline transition-colors"
                >
                  Vendors
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-sm">Useful links</h3>
            <ul className="flex flex-col gap-2 text-text-subdued text-sm font-medium">
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:underline transition-colors"
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:underline transition-colors"
                >
                  Free Mobile App
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:underline transition-colors"
                >
                  Popular by Country
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:underline transition-colors"
                >
                  Import your music
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 4 */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-sm">Spotify Plans</h3>
            <ul className="flex flex-col gap-2 text-text-subdued text-sm font-medium">
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:underline transition-colors"
                >
                  Premium Lite
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:underline transition-colors"
                >
                  Premium Standard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:underline transition-colors"
                >
                  Premium Platinum
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:underline transition-colors"
                >
                  Premium Student
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-white hover:underline transition-colors"
                >
                  Spotify Free
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex gap-4">
          <a
            href="#"
            className="w-10 h-10 bg-[#292929] hover:bg-[#727272] rounded-full flex items-center justify-center transition-colors"
          >
            {/* Instagram Icon */}
            <svg
              className="w-5 h-5 fill-white"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </a>
          <a
            href="#"
            className="w-10 h-10 bg-[#292929] hover:bg-[#727272] rounded-full flex items-center justify-center transition-colors"
          >
            {/* Twitter/X Icon */}
            <svg
              className="w-5 h-5 fill-white"
              viewBox="0 0 24 24"
            >
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
          </a>
          <a
            href="#"
            className="w-10 h-10 bg-[#292929] hover:bg-[#727272] rounded-full flex items-center justify-center transition-colors"
          >
            {/* Facebook Icon */}
            <svg
              className="w-5 h-5 fill-white"
              viewBox="0 0 24 24"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
        </div>
      </div>

      <hr className="my-10 border-[#292929]" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-text-subdued text-[13px] gap-6">
        <ul className="flex flex-wrap gap-4 md:gap-6">
          <li>
            <a
              href="#"
              className="hover:text-white transition-colors"
            >
              Legal
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-white transition-colors"
            >
              Safety & Privacy Center
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-white transition-colors"
            >
              Cookies
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-white transition-colors"
            >
              About Ads
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-white transition-colors"
            >
              Accessibility
            </a>
          </li>
        </ul>
        <span className="shrink-0">&copy; 2026 Spotify AB</span>
      </div>
    </footer>
  );
};
