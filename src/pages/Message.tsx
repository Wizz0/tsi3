import React, { useEffect, useState } from "react";
//import { Container } from 

const Message: React.FC = () => {
    const [data, setData] = useState<{message: string, title: string} | null>(
        null
    );
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/data");
                const result = await response.json();
                setData(result);
            }
            catch (error) {
                console.error("Error fetching data:", error);       
            }
        };
        fetchData();
    }, []);
}
