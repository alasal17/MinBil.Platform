import React from "react";

function SearchBar({placeholder, data}) {

    return (
        <div>
            <input type="text" placeholder={placeholder} />
        </div>  

    );
}

export default SearchBar;