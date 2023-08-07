import { React, useEffect, useState, Fragment } from 'react';
import ApiItem from './ApiItem';
import Filter from '../filter/Filter';
import apiService from '../../services/apis';
import categoryService from '../../services/categories';
import ErrorPage from './ErrorPage';
import pageLeftIcon from '../../images/page-left.svg';
import pageRightIcon from '../../images/page-right.svg';

const ApiList = () => {
  const [apis, setApis] = useState(null);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [retrievingData, setRetrievingData] = useState(true);
  const [filter, setFilter] = useState({
    auth: 'any',
    https: 'any',
    cors: 'any',
    text: '',
    category: [],
    limit: 20,
  });

  const fetchApiData = async () => {
    setRetrievingData(true)
    try {
      const response = await apiService.getAll(filter, page * filter.limit);
      setApis(response.data.entries);
      setTotalRecords(response.data.totalRecords || 0);
    } catch (error) {
      setError(error);
      console.log('Error', error);
    } finally {
      setRetrievingData(false);
    }
  }

  useEffect(() => {
    fetchApiData();
  }, [page]);

  useEffect(() => {
    setPage(prev => {
      if (prev === 0) fetchApiData();
      return 0;
    });
  }, [filter]);

  useEffect(() => {
    const pages = Math.max(Math.ceil(totalRecords / filter.limit), 1);
    setTotalPages(pages);
  }, [totalRecords, filter.limit])

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await categoryService.getAll();
        setCategories(response.data);
      } catch (error) {
        setError(error);
        console.log('Error', error);
      }
    }
    fetchCategoryData();
  }, []);

  return (
    <>
      <Filter filter={filter} setFilter={setFilter} categories={categories} />
      {retrievingData ?
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
          </div>
        </div> :
        error || !apis ? <ErrorPage /> :
          <>
            <div>
              <p className="text-center">
                Showing {apis.length < totalRecords ? `[${(page * filter.limit) + 1} to ${(page * filter.limit) + apis.length}] ` : `${apis.length} `}
                of {totalRecords} results.
              </p>
              <p className="text-center">
                {page > 0 ?
                  <span>
                    <button className='btn btn-link' onClick={() => setPage(prev => prev - 1)}><img src={pageLeftIcon} alt='<' /></button>
                  </span>
                  : null
                }
                Page {page + 1} of {totalPages} pages
                {page < totalPages - 1 ?
                  <span>
                    <button className='btn btn-link' onClick={() => setPage(prev => prev + 1)}><img src={pageRightIcon} alt='>' /></button>
                  </span>
                  : null
                }
              </p>
            </div>
            <div className="row align-content-justify justify-content-center">
              {apis.map((record) => (
                <Fragment key={record.url}>
                  <ApiItem record={record} />
                </Fragment>
              ))}
            </div>
          </>}
    </>)
};

export default ApiList;
