import "./Home.css"

const Home = () => {
    return (
        <div id='home'>
            <div className='home-title'>
                <h1>Welcome to Hero's Conquest</h1>
            </div>
            <hr/>
            <body className='home-body'>
                <hr/>
                <h1>How to Play</h1>
                <hr/>
                <h2>1. Login or Sign-up</h2>
                <p>
                    Players must first have an account before being able to play Hero's Conquest. Begin by clicking on the 'profile button' located on the top-right of the screen. The button contains three horizontal rows and is the only button at the top-right. You can't miss it!
                </p>
                <p>
                    Next, Login, if you already have an account, or sign-up to make a new account. There is also an option to try Hero's Conquest through accessing the 'Demo User'. Keep in mind that everyone will have access to this account, so it is best to keep your own account prepared.
                </p>
                <h2>2. Create Your Hero</h2>
                <p>
                    Now that you are logged-in, you have access to the left-navigation buttons! There, you can start the game by first creating your hero of choice. Click on the 'Heroes' button and customize a hero to your liking.
                </p>
                <h2>3. Start your Battle</h2>
                <p>
                    Now that you have your hero ready, test your strength against the monsters that reside in the world of Hero's Conquest. Go to the 'Battles' button on the left-navigation and begin your journey as a hero!
                </p>
                <hr/>
                <h1>Future Plans</h1>
                <hr/>
                <h3>Stats</h3>
                <p>
                    Heroes will be able to gain xp (experience points) from defeating monsters. Once a hero gains enough xp, the hero will level-up and become stronger than they once were.
                </p>
                <h3>Shop</h3>
                <p>
                    Players will be able to earn coins from defeating monsters and spent coins in the shop to upgrade their heroes.
                </p>
                <h3>Training</h3>
                <p>
                    The training grounds will be another method for heroes to become stronger.
                </p>
                <h3>
                    Auto-Battle
                </h3>
                <p>
                    Instead of the current form of battling, battles will become automated. When players create a battle, players can press a 'Start' button and the heroes/monsters will continuously attack eachother until one falls.
                </p>
            </body>
        </div>
    );
};

export default Home;
