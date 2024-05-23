import React from "react"


function StatisticsComponent() {
    
    return (
        <>
            {/* <div className="form-content"> */}
                <div className="header-fm"><h1>Results</h1></div>
                <div className="form-content">
                    <div className="question-container">
                        <div class="flex-wrapper">
                            <div class="single-chart">
                                <div >
                                    <svg viewBox="0 0 36 36" class="circular-chart red">
                                    <path class="circle-bg"
                                        d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <path class="circle"
                                        stroke-dasharray={`${1 * 100}, 100`}
                                        d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <text x="18" y="20.35" class="percentage">{50}</text>
                                    </svg>
                                </div>
                                <div>Wrong Answer</div>
                            </div>
                            
                            <div class="single-chart">
                                <div >
                                    <svg viewBox="0 0 36 36" class="circular-chart green">
                                    <path class="circle-bg"
                                        d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <path class="circle"
                                        stroke-dasharray={`${0.5 * 100}, 100`}
                                        d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <text x="18" y="20.35" class="percentage">score</text>
                                    </svg>
                                </div>
                                <div>Correct Answer</div>
                            </div>

                            <div class="single-chart">
                                <div >
                                    <svg viewBox="0 0 36 36" class="circular-chart blue">
                                    <path class="circle-bg"
                                        d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <path class="circle"
                                        stroke-dasharray={`${0.5 * 100}, 100`}
                                        d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <text x="18" y="20.35" class="percentage">svsd</text>
                                    </svg>
                                </div>
                                <div>Score</div>
                            </div>
                        </div>
                    </div>
                </div>
            {/* </div> */}
        </>
    )
}

export default StatisticsComponent