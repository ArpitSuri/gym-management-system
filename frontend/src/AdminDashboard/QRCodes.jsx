import React from 'react'

const QRCodes = () => {
  return (
      <section>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
              <header className="text-center">
                  <h2 className="text-xl font-bold text-white sm:text-3xl">QR CODES</h2>
              </header>

              <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <li>
                      <a href="#" className="group block ">
                          <img
                              src="/attendance.png"
                              alt=""
                              className="h-full w-full object-contain transition duration-500 group-hover:scale-105 sm:h-[450px]"
                          />

                          <div className="relative bg-white pt-3">
                              <h3 className="text-xs text-black group-hover:underline group-hover:underline-offset-4">
                                  Attendance QR Code
                              </h3>
                          </div>
                      </a>
                  </li>

                  <li>
                      <a href="#" className="group block overflow-hidden">
                          <img
                              src="/register.png"
                              alt=""
                              className="h-full w-full object-contain transition duration-500 group-hover:scale-105 sm:h-[450px]"
                          />

                          <div className="relative bg-white pt-3">
                              <h3 className="text-xs text-black group-hover:underline group-hover:underline-offset-4">
                                  Registration QR Code
                              </h3>

                          </div>
                      </a>
                  </li>

              </ul>
          </div>
      </section>
  )
}

export default QRCodes
