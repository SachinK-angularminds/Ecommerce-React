import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { getFundAvailablity, getUserProfileDetails } from "../api/userapi/user";
import { useSelector } from "react-redux";
// import { Accordion } from "@material-tailwind/react";

const Users = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [fundAvailableData,setFundAvailableData]=useState({})

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const authDetails = useSelector((state) => state.authReducer?.authData);

  useEffect(() => {
    getUserDetails();
    getFundAvailableDataFunc();
  }, []);

  async function getUserDetails() {
    const response = await getUserProfileDetails();
    console.log(response);
  }
  async function getFundAvailableDataFunc() {
    const response = await getFundAvailablity();
    console.log(response);
    setFundAvailableData(response?.data?.data)
  }

  return (
    <>
      <h1 className="bold mb-5">Users</h1>

      <div className="rounded border overflow-hidden p-5 mb-10">
        <div className="user-profile-header pb-4">
          <div className="text-lg font-semibold text-gray-800">
            Personal and Account Activation Details
          </div>
        </div>
        <div class="px-6 grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-3 mb-5">
          <div>
            <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              User Name
            </p>
            <p class="text-sm font-medium text-gray-800">
              {authDetails?.user_name}
            </p>
          </div>

          <div>
            <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Broker
            </p>
            <p class="text-sm font-medium text-gray-800 ">
              {authDetails?.broker}
            </p>
          </div>

          <div>
            <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Email address
            </p>
            <p class="text-sm font-medium text-gray-800 ">
              {authDetails?.email}
            </p>
          </div>

          <div>
            <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Exchange
            </p>
            <p class="text-sm font-medium text-gray-800 ">
              {authDetails?.exchanges?.join(", ")}
            </p>
          </div>

          <div className="pb-4">
            <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400 ">
              Bio
            </p>
            <p class="text-sm font-medium text-gray-800 ">Team Manager</p>
          </div>

          <div>
            <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              User Type
            </p>
            <p class="text-sm font-medium text-gray-800 ">
              {authDetails?.user_type}
            </p>
          </div>

          <div>
            <p class="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Products
            </p>
            <p class="text-sm font-medium text-gray-800 ">
              {authDetails?.products?.join(", ")}
            </p>
          </div>
        </div>
      </div>
      <div className="rounded border overflow-hidden p-5">
        <div class="px-2 mb-5">
          <div className="text-lg font-semibold text-gray-800">
            Fund Availablities
          </div>

          <div className="mb-3">Commodites</div>
          <div>
            <div className="accordion-group" data-accordion="default-accordion">
              {/* Accordion Item 1 */}
              <div
                className="accordion pb-4 border-b border-solid border-gray-200"
                id="basic-heading-one-default"
              >
                <button
                  className="accordion-toggle group accordion-active:text-indigo-600 inline-flex items-center justify-between leading-8 text-gray-600 w-full transition duration-500 hover:text-indigo-600 active:text-indigo-600"
                  aria-controls="basic-collapse-one-default"
                  onClick={() => toggleAccordion(1)}
                >
                  <h5>Commodities</h5>
                  <svg
                    className="text-gray-900 transition duration-500 group-hover:text-indigo-600 accordion-active:text-indigo-600 accordion-active:rotate-180"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {activeIndex === 1 && (
                  <div
                    id="basic-collapse-one-default"
                    className="accordion-content w-full px-0 overflow-hidden pr-4"
                    aria-labelledby="basic-heading-one-default"
                  >
                    <p className="text-base text-gray-600 leading-6">
                        Used Fund : {fundAvailableData?.commodity?.used_margin}
                    </p>
                    <p className="text-base text-gray-600 leading-6">
                        Available Fund :{fundAvailableData?.commodity?.available_margin}
                    </p>
                    <p className="text-base text-gray-600 leading-6">
                        PayIn Fund :{fundAvailableData?.commodity?.payin_amount}
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion Item 2 */}
              <div
                className="accordion py-4 border-b border-solid border-gray-200"
                id="basic-heading-two-default"
              >
                <button
                  className="accordion-toggle group inline-flex items-center justify-between leading-8 text-gray-600 w-full transition duration-500 hover:text-indigo-600 accordion-active:text-indigo-600"
                  aria-controls="basic-collapse-two-default"
                  onClick={() => toggleAccordion(2)}
                >
                  <h5>Equity</h5>
                  <svg
                    className="text-gray-900 transition duration-500 group-hover:text-indigo-600 accordion-active:text-indigo-600 accordion-active:rotate-180"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {activeIndex === 2 && (
                  <div
                    id="basic-collapse-two-default"
                    className="accordion-content w-full px-0 overflow-hidden pr-4"
                    aria-labelledby="basic-heading-two-default"
                  >
                    <p className="text-sm text-gray-500 leading-6">
                    <p className="text-base text-gray-600 leading-6">
                        Used Fund : {fundAvailableData?.equity?.used_margin}
                    </p>
                    <p className="text-base text-gray-600 leading-6">
                        Available Fund :{fundAvailableData?.equity?.available_margin}
                    </p>
                    <p className="text-base text-gray-600 leading-6">
                        PayIn Fund :{fundAvailableData?.equity?.payin_amount}
                    </p>
                    </p>
                  </div>
                )}
              </div>

             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
