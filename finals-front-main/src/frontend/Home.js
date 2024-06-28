import React from 'react';

export default function Home() {
    return (
        <div className="home-container">
            <div className='img-container'>
                <img 
                    className='presentation-img'
                    src='https://wallpapercave.com/wp/wp8002958.jpg' 
                    alt='Home'
                />
            </div>
            <div className='home-options'>
                    <button onClick={() => { window.location.href = 'login'}}>Log In</button>
                    <button onClick={() => { window.location.href = 'signup'}}>Sign up</button>
                </div>

            {/* Additional content goes here */}
        </div>
    );
}
