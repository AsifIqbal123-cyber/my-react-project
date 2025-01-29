import React, {useState} from 'react';
import './style.css';



const Navbar = () => {

    const [searchQuery, setSearchQuery]= useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        alert(`Searching for: ${searchQuery}`);
        setSearchQuery('');
    };

    const toggleDropdown = () =>{
        setDropdownOpen(!dropdownOpen);

    };


    return (
        <nav style={styles.navbar}>
            <ul style={styles.navList}>
                <li style={styles.navItem}><a href='/' className="link" style={styles.link}>Home</a></li>
                <li style={styles.navItem}><a href='/about' className="link" style={styles.link}>About</a></li>
                <li style={styles.navItem}><a href='/contact' className="link" style={styles.link}>Contact</a></li>
                <li style={styles.navItem}><a href='/account' className="link" style={styles.link}>Account</a></li>
                <li style={styles.link} onClick={toggleDropdown}>
                <button className='order' onClick={toggleDropdown}>Orders
                    {dropdownOpen && (
                        <ul className='dropdownMenu' style={{position:'absolute', left:'37.5%', top:'100%'}}>
                            <li className='dropdownItem'><a href='/orders/active'>Active</a></li>
                            <li className='dropdownItem'><a href='/orders/history'>History</a></li>
                            <li className='dropdownItem'><a href='/orders/track'>Track</a></li>
                        </ul>
                    )}
                     </button>
                    </li>

                <li style={styles.navItem}><a href='/cart' className="link" style={styles.link}>Cart</a></li>
            </ul>
            <form onSubmit={handleSearch} className='searchForm'>
                <input 
                    type='text'
                    placeholder='Search...'
                    value={searchQuery}
                    onChange={(e)=> setSearchQuery(e.target.value)}
                    className='searchInput'
                    />
                    <button type='submit' className='searchButton'>Search</button>
                    </form>
        </nav>

    );
};

const styles = {
    navbar: {
      width: '100%',
      top: '0',
      position: 'fixed',
      left:'0',
      backgroundColor: '#333',
      padding: '10px',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    navList: {
      listStyleType: 'none',
      display: 'flex',
      margin: 0,
      padding: 0,
    },
    navItem: {
      margin: '0 15px',
      position: 'relative',
    },
    searchInput:{
        gap: '10px',
    }
};



  export default Navbar;