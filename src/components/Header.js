import React from 'react';

const Header = ({ apptitle }) => (
<nav>
    <div className="logo">
        <a href="#!" className="brand-logo">
            {apptitle}
        </a>
    </div>
</nav>

)

export default Header