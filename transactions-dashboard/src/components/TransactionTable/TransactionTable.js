
import React, { useState, useEffect } from 'react';
import { getTransactions } from '../../api';
import './index.css'
import LoaderEffect from '../LoaderSpi';

const TransactionTable = ({ month }) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] =useState(true)

  const fetchTransactions = async () => {
    const response = await getTransactions(search, page);
    setTransactions(response.data);
    setIsLoading(false)
  };

  useEffect(() => {
    setIsLoading(true)
    fetchTransactions();
  }, [search, page]);

  return (
    <>{isLoading ? <div className='loader-container'><LoaderEffect /></div> : 
    <div className='table-container'>
      
      <h1 className='heading'>Transactions Table</h1>
      <input
        className='search-box'
        type="search"
        placeholder="Search Transactions"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
       <table className="transaction-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.dateOfSale}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      <div className="pagination">
        <button onClick={() => setPage(page => Math.max(page - 1, 1))} disabled={page === 1 ? true : false} style={{backgroundColor: page === 1 ? 'gray' : ""}} >Previous</button>
        <button onClick={() => setPage(page => page + 1)}>Next</button>
      </div>
      </div>
    </div>}</>
    
  );
};

export default TransactionTable;
