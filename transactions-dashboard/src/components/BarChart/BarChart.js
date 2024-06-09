import React, { useEffect, useState } from 'react';
import { getBarChartData } from '../../api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import LoaderEffect from '../LoaderSpi';

const BarChartComponent = () => {
  const [barData, setBarData] = useState([]);
  const [month, setMonth] = useState('01');
  const [isLoading, setIsLoading] = useState(true);
  console.log(month)
  
  useEffect(() => {
    setIsLoading(true)
    const fetchBarData = async () => {
      try {
        const response = await getBarChartData(month);
        console.log('Bar chart data:', response.data);
        setBarData(response.data);
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching bar chart data:', error);
      }
    };

    fetchBarData();
  }, [month]);

  return (
    <>{isLoading ? <div className='loader-container'><LoaderEffect /></div> : 
    <div className='bar-bg-container'>
      <h1 className='heading'>BarChart</h1>
    <label className='label'>
        Select Month:
        <select className='options' value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value="01">January</option>
          <option value="02">February</option>
          <option value="03">March</option>
          <option value="04">April</option>
          <option value="05">May</option>
          <option value="06">June</option>
          <option value="07">July</option>
          <option value="08">August</option>
          <option value="09">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
    </label>
    <ResponsiveContainer width="100%" height={400}>
    <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="range" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
    </ResponsiveContainer>
  
    </div>}</>
    
  );
};

export default BarChartComponent;
