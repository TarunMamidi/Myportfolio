import React from 'react';
import './Bmiscale.css';

const Bmiscale = ({ bmiValue }) => {
    const getIndicatorWidth = (bmiValue) => {
        if (bmiValue < 18.5) {
            return 'underweight';
        } else if (bmiValue >= 18.5 && bmiValue < 25) {
            return 'normal';
        } else if (bmiValue >= 25 && bmiValue < 30) {
            return 'overweight';
        } else {
            return 'obese';
        }
    };

    const renderCategoryLabel = (category) => {
        switch (category) {
            case 'underweight':
                return 'Underweight';
            case 'normal':
                return 'Normal weight';
            case 'overweight':
                return 'Overweight';
            case 'obese':
                return 'Obese';
            default:
                return '';
        }
    };

    const indicatorWidth = getIndicatorWidth(bmiValue);

    return (
        <div className="bmi-scale">
            <div className="bmi-scale-labels">
                <span className="category">Underweight</span>
                <span className="category">Normal</span>
                <span className="category">Obese</span>
            </div>
            <div className="bmi-scale-bars">
                <div className="bar">
                    <div className={`indicator ${indicatorWidth}`} style={{ width: `${(bmiValue < 50 ? bmiValue : 50) * 2}%` }}></div>
                </div>
            </div>
            <div className="bmi-scale-labels">
                <div className='bmiadj'>
                    <p className='ubmi'>Your BMI : is </p>
                    <span className="bmi-value">{bmiValue}</span>
                </div>
            </div>
        </div>
    );
};

export default Bmiscale;

