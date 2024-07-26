import React from 'react';
import './Typewriter.css';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import htmllogo from '../../Assests/html.png'
import reactlogo from '../../Assests/react.png'
import csslogo from '../../Assests/css.png'
import jslogo from '../../Assests/javascript.png'
import bootlogo from '../../Assests/bootstrap.png'
import expresslogo from '../../Assests/express.png'
import nodelogo from '../../Assests/nodejs.png'
import sqllogo from '../../Assests/sql.png'
import mongologo from '../../Assests/mongo.png'
import firebase from '../../Assests/firebase.png'
import pythonlogo from '../../Assests/python.png'
import javalogo from '../../Assests/java.png'
import dockerlogo from '../../Assests/docker.png'
import gitlogo from '../../Assests/git.png'
import awslogo from '../../Assests/aws.png'
const Typewriter = () => {
    const [text] = useTypewriter({
        words: ['SRIMAN TARUN'],
        loop: 2,
        typeSpeed: 120,
        deleteSpeed: 80,
    });
    const [welcome] = useTypewriter({
        words: ['Namaste();','నమస్తే();','नमस्ते();'],
        loop: {},
        typeSpeed: 60,
        deleteSpeed: 50,
    });

    return (
        <div className='typemain'>
            <h1 style={{ margin: '50px' }}>
                <h5 className='namas'>{welcome} I'm</h5>
                <div className='box'>
                    <span className="gradient-text">
                        {text}
                    </span>
                    <span className='sizecur'>
                        <Cursor cursorStyle='|' />
                    </span>
                </div>
                <div className='block'>
                    <div className='head'>
                        <p className='about-text'>&#128977; About</p>
                        <hr className='line'/>
                    </div>
                    <h6 className='myself'>Hi there! <span className='handshake'>👋</span>, Welcome to my creative and interactive portfolio! I am Sriman Tarun Mamidi, a dedicated and passionate full stack developer with a strong background in both frontend and backend technologies. My expertise spans across building dynamic, responsive, and user-friendly web applications. </h6>
                </div>
                <div className='block'>
                    <div className='head'>
                        <p className='about-text'>&#128977; Skills</p>
                        <hr className='line'/>
                    </div>
                    <div className='inside'>
                        <div className='frontend'>
                            <div>Frontend Developer</div>
                            <div className='grid-container'>
                                <div className='comp'><img src={htmllogo} alt="" />HTML</div>
                                <div className='comp'><img src={csslogo} alt="" />CSS</div>
                                <div className='comp'><img src={reactlogo} alt="" />React</div>
                                <div className='comp'><img src={jslogo} alt="" />JavaScript</div>
                                <div className='comp'><img src={bootlogo} alt="" />BootStrap</div>
                            </div>
                        </div>  
                    </div>
                    <div className='inside'>
                        <div className='frontend'>
                            <div>Backend Developer</div>
                            <div className='grid-container'>
                                <div className='comp'><img src={nodelogo} alt="" />Node.js</div>
                                <div className='comp'><img src={expresslogo} alt="" />Express</div>
                            </div>
                        </div>  
                    </div>
                    <div className='inside'>
                        <div className='frontend'>
                            <div>Database</div>
                            <div className='grid-container'>
                                <div className='comp'><img src={sqllogo} alt="" />SQL</div>
                                <div className='comp'><img src={mongologo} alt="" />Mongodb</div>
                                <div className='comp'><img src={firebase} alt="" />Firebase</div>
                            </div>
                        </div>  
                    </div>
                    <div className='inside'>
                        <div className='frontend'>
                            <div>Programming Languages</div>
                            <div className='grid-container'>
                                <div className='comp'><img src={pythonlogo} alt="" />Python</div>
                                <div className='comp'><img src={javalogo} alt="" />Java</div>
                            </div>
                        </div>  
                    </div>
                    <div className='inside'>
                        <div className='frontend'>
                            <div>Devops</div>
                            <div className='grid-container'>
                                <div className='comp'><img src={dockerlogo} alt="" />Docker</div>
                                <div className='comp'><img src={gitlogo} alt="" />Git</div>
                                <div className='comp'><img src={awslogo} alt="" />AWS</div>
                            </div>
                        </div>  
                    </div>
                    
                </div>
                <div className='block'>
                    <div className='head'>
                        <p className='about-text'>&#128977; Projects</p>
                        <hr className='line'/>
                    </div>
                </div>
            </h1>
        </div>
    );
};

export default Typewriter;