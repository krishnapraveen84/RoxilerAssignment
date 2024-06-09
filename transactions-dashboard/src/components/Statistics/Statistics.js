import React, { useEffect, useState } from 'react';
import { getStatistics } from '../../api';
import './index.css'
import LoaderEffect from '../LoaderSpi';


const Statistics = () => {
  const [stats, setStats] = useState([
    { name: 'Total Sales', value: 0 },
    { name: 'Total Sold', value: 0 },
    { name: 'Total Not Sold', value: 0 },]);
  const [month, setMonth] = useState('01');
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStatistics = async () => {
      setIsLoading(true)
      const response = await getStatistics(month);
      const stats = response.data
      console.log(stats)
      setStats([
        { name: 'Total Sales', value: stats.totalSales },
        { name: 'Total Sold', value: stats.totalSold },
        { name: 'Total UnSold', value: stats.totalUnsold },
      ]);
      setIsLoading(false)
      console.log(response)
    };

    fetchStatistics();
  }, [month]);

  return (
    <>{isLoading ? <div className='loader-container'><LoaderEffect /></div> :
     <div className='stats-bg-container'>
      <h1 className='heading'>Statistics</h1>
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
      <div className='stats-details'>
        <p className='stat'>Total Sales Amount: <span>{stats[0].value}</span></p>
        <p className='stat'>Total Sold Items: <span>{stats[1].value}</span></p>
        <p className='stat'>Total UnSold Items: <span>{stats[2].value}</span></p>
      </div>
    </div>}</>
    
  );
};

export default Statistics;
