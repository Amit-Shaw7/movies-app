import React from 'react';


function Pagination({pageProp , goBack , goAhead}) {
    
    return <>
        <div className="w-full flex justify-center mb-8">
            <button onClick= {goBack}
             className="p-2 border-2 border-blue-300 border-r-0 text-blue-500 rounded-l-xl">Previous</button>
            <button className="p-2 border-2 border-blue-300 text-blue-500 bg-gray-200"> 
            {pageProp}
             </button>
            <button onClick={goAhead} 
            className="p-2 border-2 border-blue-300 border-l-0 text-blue-500 rounded-r-xl">Next</button>
        </div>;
    </>
}

export default Pagination;
