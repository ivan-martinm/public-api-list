import React from 'react';
import FilterForm from './FilterForm';

const Filter = ({ filter, setFilter, categories }) => {
  const handleFilter = (value, filterName) => {
    const updatedFilter = { ...filter };
    updatedFilter[filterName] = value;
    setFilter(updatedFilter);
  };

  const addToCategoryFilter = (category) => {
    if (filter.category.includes(category))
      return removeFromCategoryFilter(category);
    const updatedCategories = [...filter.category];
    updatedCategories.push(category);
    updatedCategories.sort();
    const updatedFilters = { ...filter, category: updatedCategories };
    setFilter(updatedFilters);
  };

  const removeFromCategoryFilter = (category) => {
    const updatedCategories = filter.category.filter(
      (cat) => cat !== category
    );
    updatedCategories.sort();
    const updatedFilters = { ...filter, category: updatedCategories };
    setFilter(updatedFilters);
  };

  const resetCategories = () => {
    const updatedFilters = { ...filter, category: [] };
    setFilter(updatedFilters);
  };

  const resetFilters = () => {
    setFilter({
      ...filter,
      auth: 'any',
      https: 'any',
      cors: 'any',
      text: '',
      category: [],
    });
  };

  return (
    <FilterForm
      categories={categories}
      filters={filter}
      resetCategories={resetCategories}
      resetFilters={resetFilters}
      handleFilter={handleFilter}
      addToCategoryFilter={addToCategoryFilter}
      removeFromCategoryFilter={removeFromCategoryFilter}
    />
  );
};

export default Filter;
