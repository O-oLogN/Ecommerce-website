import React from "react"
import plusIcon from "assets/plus.png"
import minusIcon from "assets/minus.png"

const ShippingAndReturns = () => {
    const [isExpanding, setIsExpanding] = React.useState<boolean>(false)

    return (
        <div className="relative mt-[20px] mb-[20px]">
            <div className="flex justify-between">
                <span className="text-[0.95rem] text-gray-400">Shopping & Returns</span>
                { !isExpanding && <button className="p-[5px] ml-[5px] bg-white hover:bg-gray-800" onClick={ () => setIsExpanding(!isExpanding) }>
                    <img src={ plusIcon } className="h-3 w-3" alt="expand-icon"/>
                </button> }
                { isExpanding && <button className="p-[5px] ml-[5px] bg-white hover:bg-gray-800" onClick={ () => setIsExpanding(!isExpanding) }>
                    <img src={ minusIcon } className="h-3 w-3" alt="collapse-icon" />
                </button> }
            </div>
            { isExpanding ? <div data-state="open" data-orientation="vertical"
                  className="last:mb-0 py-3">
                <h3 data-orientation="vertical" data-state="open" className="px-1">
                    <div className="flex flex-col">
                        <div className="flex w-full items-center justify-between">
                            <button type="button" aria-controls="radix-:R6irrrqnnla:" aria-expanded="true"
                                    data-state="open" data-orientation="vertical" id="radix-:R2irrrqnnla:"
                                    data-radix-collection-item="">
                                <div
                                    className="text-grey-90 hover:bg-grey-5 active:bg-grey-5 active:text-violet-60 focus:border-violet-60 disabled:text-grey-30 bg-transparent disabled:bg-transparent rounded-rounded group relative p-[6px]">
                                    <div className="h-5 w-5">
                                        <span
                                            className="bg-grey-50 rounded-circle group-radix-state-open:rotate-90 absolute inset-y-[31.75%] left-[48%] right-1/2 w-[1.5px] duration-300"></span>
                                        <span
                                            className="bg-grey-50 rounded-circle group-radix-state-open:rotate-90 group-radix-state-open:left-1/2 group-radix-state-open:right-1/2 absolute inset-x-[31.75%] top-[48%] bottom-1/2 h-[1.5px] duration-300"></span>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </h3>
                <div data-state="open" id="radix-:R6irrrqnnla:" role="region" aria-labelledby="radix-:R2irrrqnnla:"
                     data-orientation="vertical"
                     className="radix-state-closed:animate-accordion-close radix-state-open:animate-accordion-open radix-state-closed:pointer-events-none px-1"
                >
                    <div className="inter-base-regular group-radix-state-closed:animate-accordion-close">
                        <div className="w-full">
                            <div className="text-small-regular py-8 -mt-[50px]">
                                <div className="grid grid-cols-1 gap-y-8">
                                    <div className="flex items-start gap-x-2">
                                        <svg className="mt-[3px]" width="16" height="16" viewBox="0 0 24 24" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.63462 7.35205H2.70508" stroke="currentColor" strokeWidth="1.5"
                                                  strokeLinecap="round" strokeLinejoin="round"
                                                  data-darkreader-inline-stroke=""
                                            ></path>
                                            <path d="M4.56416 4.56348H2.70508" stroke="currentColor" strokeWidth="1.5"
                                                  strokeLinecap="round" strokeLinejoin="round"
                                                  data-darkreader-inline-stroke=""
                                            ></path>
                                            <path d="M16.6483 19.4365H3.63477" stroke="currentColor" strokeWidth="1.5"
                                                  strokeLinecap="round" strokeLinejoin="round"
                                                  data-darkreader-inline-stroke=""
                                            ></path>
                                            <path
                                                d="M16.9034 4.56348L15.9868 7.61888C15.8688 8.01207 15.5063 8.28164 15.0963 8.28164H12.2036C11.5808 8.28164 11.1346 7.68115 11.3131 7.08532L12.0697 4.56348"
                                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                strokeLinejoin="round" data-darkreader-inline-stroke=""
                                            ></path>
                                            <path d="M8.28125 12.9297H10.2612" stroke="currentColor" strokeWidth="1.5"
                                                  strokeLinecap="round" strokeLinejoin="round"
                                                  data-darkreader-inline-stroke=""
                                            ></path>
                                            <path
                                                d="M17.055 15.718H7.21305C5.71835 15.718 4.64659 14.2772 5.07603 12.8457L7.08384 6.15299C7.36735 5.20951 8.23554 4.56348 9.22086 4.56348H19.0638C20.5585 4.56348 21.6302 6.00426 21.2008 7.43576L19.193 14.1284C18.9095 15.0719 18.0403 15.718 17.055 15.718Z"
                                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                strokeLinejoin="round" data-darkreader-inline-stroke=""
                                            ></path>
                                        </svg>
                                        <div><span className="font-semibold">Fast delivery</span><p
                                            className="max-w-sm">Your package will arrive in 3-5 business days at your
                                            pick up location or in the comfort of your home.</p></div>
                                    </div>
                                    <div className="flex items-start gap-x-2">
                                        <svg className="mt-[3px]" width="16" height="16" viewBox="0 0 24 24" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19.8007 3.33301V8.53308H14.6006" stroke="currentColor"
                                                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                                  data-darkreader-inline-stroke=""
                                            ></path>
                                            <path
                                                d="M4.2002 12C4.20157 10.4949 4.63839 9.02228 5.45797 7.75984C6.27755 6.4974 7.44488 5.49905 8.81917 4.8852C10.1935 4.27135 11.716 4.06823 13.2031 4.30034C14.6903 4.53244 16.0785 5.18986 17.2004 6.19329L19.8004 8.53332"
                                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                strokeLinejoin="round" data-darkreader-inline-stroke=""
                                            ></path>
                                            <path d="M4.2002 20.6669V15.4668H9.40027" stroke="currentColor"
                                                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                                  data-darkreader-inline-stroke=""
                                            ></path>
                                            <path
                                                d="M19.8004 12C19.799 13.5051 19.3622 14.9778 18.5426 16.2402C17.7231 17.5026 16.5557 18.501 15.1814 19.1148C13.8072 19.7287 12.2846 19.9318 10.7975 19.6997C9.31033 19.4676 7.9221 18.8102 6.80023 17.8067L4.2002 15.4667"
                                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                strokeLinejoin="round" data-darkreader-inline-stroke=""
                                            ></path>
                                        </svg>
                                        <div><span className="font-semibold">Simple exchanges</span><p
                                            className="max-w-sm">Is the fit not quite right? No worries - we'll exchange
                                            your product for a new one.</p></div>
                                    </div>
                                    <div className="flex items-start gap-x-2">
                                        <svg className="mt-[3px]" width="16" height="16" viewBox="0 0 24 24" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 3.5V9.5H10" stroke="currentColor" strokeWidth="1.5"
                                                  strokeLinecap="round" strokeLinejoin="round"
                                                  data-darkreader-inline-stroke=""
                                            ></path>
                                            <path
                                                d="M4.09714 14.014C4.28641 15.7971 4.97372 16.7931 6.22746 18.0783C7.4812 19.3635 9.13155 20.1915 10.9137 20.4293C12.6958 20.6671 14.5064 20.301 16.0549 19.3898C17.6033 18.4785 18.8 17.0749 19.4527 15.4042C20.1054 13.7335 20.1764 11.8926 19.6543 10.1769C19.1322 8.46112 18.0472 6.97003 16.5735 5.94286C15.0997 4.91569 13.3227 4.412 11.5275 4.51261C9.73236 4.61323 8.02312 5.31232 6.6741 6.4977L4 8.89769"
                                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                strokeLinejoin="round" data-darkreader-inline-stroke=""
                                            ></path>
                                        </svg>
                                        <div><span className="font-semibold">Easy returns</span><p
                                            className="max-w-sm">Just return your product and we'll refund your money.
                                            No questions asked – we'll do our best to make sure your return is
                                            hassle-free.</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            : ''}
        </div>

    )
}

export default ShippingAndReturns