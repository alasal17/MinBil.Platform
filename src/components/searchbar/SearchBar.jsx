import React, { useState } from 'react';
function SearchBar() {
const [searchTerm, setSearchTerm] = useState('');
const handleChange = event => {
setSearchTerm(event.target.value);
}
const handleSubmit = event => {
event.preventDefault();
fetch(`https://data.brreg.no/enhetsregisteret/api/enheter/${searchTerm}`)
.then(response => response.json())
.then(data => {
console.log(data)
})
}
return (
<form onSubmit={handleSubmit}>
<input
     type="text"
     value={searchTerm}
     onChange={handleChange}
   />
<button type="submit">Search</button>
</form>
)
}
export default SearchBar;