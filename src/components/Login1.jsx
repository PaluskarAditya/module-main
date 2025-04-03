import React from "react";

export default function Login1({
  selectedScenario,
  handleAnswerClick,
  handleElementClick,
  selectedElement,
  clickedElements,
  handleSusClick,
  susAnswer
}) {
  const handleClick = (element) => {
    if (!element) return;

    const elementData = selectedScenario?.scene?.[0]?.[element];
    if (elementData) {
      handleElementClick({
        ...elementData,
        name: element,
      });
    }
  };

  const content = selectedScenario?.scene?.[0] || {};

  return (
    <div className="flex sim w-full flex-col gap-2">
      <div className="bg-black/50 p-3 rounded-xl border border-purple-500/30">
        <h2 className="text-purple-400 text-xs mb-1">{selectedScenario.instructions}</h2>
        <p className="text-gray-400 text-xs">Click on suspicious elements to investigate them.</p>
      </div>
      <div className="sim flex flex-col bg-gray-100 w- h-full overflow-hidden rounded-lg">
        {/* Browser Chrome */}
        <div className="bg-gray-200 p-2 border-b border-gray-300">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 bg-white rounded px-3 py-1 flex items-center">
              <span
                className="font-mono text-xs text-gray-600 flex-1 cursor-pointer"
                onClick={() => handleClick("url")}
              >
                {content?.url?.value || ""}
              </span>
              <div>
                <svg
                  className="h-4 w-4 text-gray-400 cursor-pointer"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  onClick={() => handleClick("securityIndicators")}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-[#fafafa] flex items-center justify-center overflow-hidden">
          <div className="container flex max-w-3/4 w-3/4 mx-auto items-center">
            {/* Phone mockup */}
            <div className="hidden md:block relative mr-8 z-10">
              <img
                src="https://www.instagram.com/static/images/homepage/phones/home-phones.png/1dc085cdb87d.png"
                alt="phones"
                className="w-[268px] cursor-pointer"
                onClick={() => handleClick("logo")}
              />
            </div>

            {/* Login Form */}
            <div className="w-[250px] flex flex-col gap-2">
              <div className="bg-white border border-gray-300 p-4 mb-2">
                <img
                  src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png"
                  alt="Instagram"
                  className="mx-auto mb-3 h-[21px] cursor-pointer"
                  onClick={() => handleClick("logo")}
                />

                <form
                  className="flex flex-col gap-2"
                  onSubmit={(e) => e.preventDefault()}
                  onClick={() => handleClick("loginForm")}
                >
                  <input
                    type="text"
                    placeholder="Phone number, username, or email"
                    className="w-full px-2 py-[5px] border border-gray-300 rounded-[3px] bg-[#fafafa] text-xs focus:outline-none focus:border-gray-400"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-2 py-[5px] border border-gray-300 rounded-[3px] bg-[#fafafa] text-xs focus:outline-none focus:border-gray-400"
                  />
                  <button
                    className="bg-[#0095f6] text-white font-light py-[5px] rounded-[4px] mt-2 text-xs hover:bg-[#1877f2] transition"
                    onClick={(e) => {
                      e.preventDefault();
                      if (!susAnswer && !selectedElement) {
                        // No specific answer passed; sus options will appear due to updated condition
                      }
                    }}
                  >
                    Log In
                  </button>
                </form>

                <div className="flex items-center my-4">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="px-4 text-xs text-gray-500">
                    OR
                  </span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                <button
                  className="w-full flex items-center justify-center gap-2 text-xs text-[#385185] font-light cursor-pointer"
                  onClick={() => handleClick("facebookButton")}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0022 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                  </svg>
                  Log in with Facebook
                </button>

                <p
                  className="text-center text-xs text-[#385185] mt-4 cursor-pointer"
                  onClick={() => handleClick("forgotPassword")}
                >
                  Forgot password?
                </p>
              </div>

              <div
                className="bg-white text-black border border-gray-300 p-5 text-xs text-center cursor-pointer"
                onClick={() => handleClick("visualDesign")}
              >
                Don't have an account?{" "}
                <span className="text-[#0095f6] font-light">Sign up</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}