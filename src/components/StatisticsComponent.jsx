import React from "react"


function StatisticsComponent({ score, totalScore }) {
    
    return (
        <>
            {/* <div className="form-content"> */}
                <div className="header-fm"><h1>Results</h1></div>
                <div className="form-content">
                    <div className="question-container">
                        <div class="flex-wrapper">
                            <div class="single-chart">
                                <div >
                                    <svg viewBox="0 0 36 36" class="circular-chart purple">
                                    <path class="circle-bg"
                                        d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <path class="circle"
                                        stroke-dasharray={`${(totalScore / totalScore) * 100}, 100`}
                                        d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <text x="18" y="20.35" class="percentage">{totalScore}</text>
                                    </svg>
                                </div>
                                <div>Total Points</div>
                            </div>
                            
                            <div class="single-chart">
                                <div >
                                    <svg viewBox="0 0 36 36" class="circular-chart orange">
                                    <path class="circle-bg"
                                        d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <path class="circle"
                                        stroke-dasharray={`${(score / totalScore) * 100}, 100`}
                                        d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <text x="18" y="20.35" class="percentage">{score}</text>
                                    </svg>
                                </div>
                                <div>Scored Points</div>
                            </div>

                            <div class="single-chart">
                                <div >
                                    <svg viewBox="0 0 36 36" class="circular-chart red">
                                    <path class="circle-bg"
                                        d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <path class="circle"
                                        stroke-dasharray={`${(score / totalScore) * 100}, 100`}
                                        d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <text x="18" y="20.35" class="percentage">{((score / totalScore) * 100).toFixed(1)}</text>
                                    </svg>
                                </div>
                                <div>Performance</div>
                            </div>
                        </div>
                    </div>
                </div>
            {/* </div> */}
        </>
    )
}

export default StatisticsComponent