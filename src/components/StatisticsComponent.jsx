import React from "react"


function StatisticsComponent({ score, totalScore}) {
    
    return (
        <>
            <div className="question-compose-form">
                <div className="header"><h1>Results</h1></div>
                <div className="question-section">
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
                                        stroke-dasharray={`${((totalScore-score )/ totalScore) * 100}, 100`}
                                        d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <text x="18" y="20.35" class="percentage">{totalScore-score}</text>
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
                                        stroke-dasharray={`${(score / totalScore) * 100}, 100`}
                                        d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <text x="18" y="20.35" class="percentage">{score}</text>
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
                                        stroke-dasharray={`${(score / totalScore) * 100}, 100`}
                                        d="M18 2.0845
                                        a 15.9155 15.9155 0 0 1 0 31.831
                                        a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <text x="18" y="20.35" class="percentage">{((score / totalScore) * 100).toFixed(1)}%</text>
                                    </svg>
                                </div>
                                <div>Score</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StatisticsComponent