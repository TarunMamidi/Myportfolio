import React, { useState, useRef, useEffect } from 'react';
import DraggableWrapper from '../../Components/Draggable/DraggableWrapper';
import { Bar } from 'react-chartjs-2';
import './Charts.css';
import crossimg from '../../Assests/close.png';
import profileimg from '../../Assests/skill.png';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Charts = ({ onClose, initialPosition, onUpdatePosition }) => {
    const [size, setSize] = useState({ width: 600, height: 400 });
    const [closing, setClosing] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('Frontend'); // Initial category
    const profileRef = useRef(null);

    const handleMouseDown = (e) => {
        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = size.width;
        const startHeight = size.height;

        const handleMouseMove = (e) => {
            const newWidth = startWidth + (e.clientX - startX);
            const newHeight = startHeight + (e.clientY - startY);
            setSize({ width: newWidth, height: newHeight });
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleClose = () => {
        setClosing(true);
        setTimeout(onClose, 500);
    };

    
    const skillsData = {
        'Frontend': {
            labels: ['ReactJS', 'HTML', 'CSS', 'NextJs', 'SCSS', 'Tailwind CSS' ],
            datasets: [
                {
                    label: 'Frontend',
                    backgroundColor: '#7DF9FF',
                    data: [4.5, 4.5, 4.5, 4, 3, 3,5],
                },
            ],
        },
        'Programming Languages': {
            labels: ['JavaScript', 'Python', 'Java', 'C'],
            datasets: [
                {
                    label: 'Programming Languages',
                    backgroundColor: '#FFD700',
                    data: [4.5, 4, 3.5, 3],
                },
            ],
        },
        'Backend': {
            labels: ['ExpressJs', 'NodeJs', 'TypeScript'],
            datasets: [
                {
                    label: 'Backend',
                    backgroundColor: '#FFD700',
                    data: [4.5, 4, 3.5],
                },
            ],
        },
        'Databases': {
            labels: ['MongoDB', 'SQL', 'Firebase', 'Postgre SQL'],
            datasets: [
                {
                    label: 'Databases',
                    backgroundColor: '#FFD700',
                    data: [4.5, 3.5, 4, 3],
                },
            ],
        },
        'Devops': {
            labels: ['Docker', 'Git', 'AWS'],
            datasets: [
                {
                    label: 'Devops',
                    backgroundColor: '#FFD700',
                    data: [4.5, 4, 3.5],
                },
            ],
        },
        'Operating System': {
            labels: ['Linux', 'Windows', 'Unix', 'Mac'],
            datasets: [
                {
                    label: 'Operating System',
                    backgroundColor: '#FFD700',
                    data: [4.5, 4, 3.5, 4],
                },
            ],
        },
    };

    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                type: 'linear',
                beginAtZero: true,
                ticks: {
                    font: {
                        size: 20, // Set the size of the y-axis labels
                    },
                },
            },
            x: {
                type: 'category',
                position: 'bottom',
                ticks: {
                    font: {
                        size: 20, // Set the size of the x-axis labels
                    },
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 20, // Set the size of the legend labels
                    },
                },
            },
            title: {
                display: true,
                text: 'Skills Chart',
                font: {
                    size: 20, // Set the size of the chart title
                },
            },
        },
    };

    useEffect(() => {
        const resizeChart = () => {
            if (profileRef.current && profileRef.current.chartInstance) {
                profileRef.current.chartInstance.resize();
            }
        };

        window.addEventListener('resize', resizeChart);

        return () => {
            window.removeEventListener('resize', resizeChart);
        };
    }, []);

    const handleChangeCategory = (event) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <DraggableWrapper initialPosition={initialPosition} onUpdatePosition={onUpdatePosition}>
            <div
                className={`charts-app ${closing ? 'closing' : ''}`}
                style={{ width: size.width, height: size.height }}
                ref={profileRef}
            >
                <div className='topbarch'>
                    <div className='adjtopch'>
                        <h2 className='app-titlech'><img src={profileimg} alt="Profile" /></h2>
                        <h2 className='app-titlech'>Skills</h2>
                    </div>
                    <p className='close-buttonch' onClick={handleClose}><img src={crossimg} alt="Close" /></p>
                </div>
                <div
                    className='resizer'
                    onMouseDown={handleMouseDown}
                />
                <div className='category-dropdown'>
                    <select id='category-select' value={selectedCategory} onChange={handleChangeCategory}>
                        <option value='Frontend'>Frontend</option>
                        <option value='Backend'>Backend</option>
                        <option value='Databases'>Databases</option>
                        <option value='Devops'>Devops</option>
                        <option value='Programming Languages'>Programming Languages</option>
                        <option value='Operating System'>Operating System</option>
                    </select>
                </div>
                <div className='chart-container'>
                    <Bar data={skillsData[selectedCategory]} options={options} />
                </div>
            </div>
        </DraggableWrapper>
    );
};

export default Charts;
