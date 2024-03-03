// import React from 'react'
// import { useState } from 'react';

// export default function() {

//     const [data, setData] = useState([]);
//     const [isDropdownVisible, setIsDropdownVisible] = useState(false);

//     // Function to fetch data from the API
//     const fetchData = async () => {
//       try {
//     const response = await fetch('https://api.aapkabazar.co/api/root/category?cityId=619f219d26d9ad0f34102dd2')
//         ;
//         const jsonData = await response.json();
//         setData(jsonData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     // Function to handle button hover event
//     const handleButtonHover = () => {
//       setIsDropdownVisible(true);
//       fetchData(); // Fetch data when hovering over the button         
//     };



//   return (
//     <div > 

//      <button onMouseEnter={handleButtonHover}>Hover Me</button>
//       {isDropdownVisible && (
//         <ul>
//           {data.map(item => (
//             <li key={item.id}>{item.name}</li>
//           ))}
//         </ul>
//       )}




//     </div>
//   )
// }


import React, { useEffect, useState } from 'react';

export default function DropdownButton() {
  const [data, setData] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await fetch('https://api.aapkabazar.co/api/root/category?cityId=619f219d26d9ad0f34102dd2');
      const jsonData = await response.json();
      console.log(jsonData)
      const dataArray = jsonData.category; // Assuming the array is nested under a "data" property
      setData(dataArray);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to handle button hover event
  const handleButtonHover = () => {
    setIsDropdownVisible(true);
    fetchData(); // Fetch data when hovering over the button
  };
  const handleButtonLeave=()=>{
    setIsDropdownVisible(false);
  }

  return (
    <div>
      <button onMouseEnter={handleButtonHover} onMouseLeave={handleButtonLeave}>Hover Me</button>
      {isDropdownVisible && (
        <ul>
          {data.map(item => (
            <li style={{listStyleType:"none"}} key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

