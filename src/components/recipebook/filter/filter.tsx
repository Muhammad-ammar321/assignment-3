import React from 'react';
import styles from './Filter.module.css';

interface FilterSearchProps {
  filterCategory: string;
  searchTerm: string;
  onFilterChange: (category: string) => void;
  onSearchChange: (term: string) => void;
}

const categories = ['Dessert', 'Main Course', 'Snack', 'Appetizer', 'Beverage'];

const FilterSearch: React.FC<FilterSearchProps> = ({
  filterCategory,
  searchTerm,
  onFilterChange,
  onSearchChange,
}) => {
  return (
    <div className={styles.filterSearch}>
      <select
        className={styles.select}
        value={filterCategory}
        onChange={e => onFilterChange(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <input
        className={styles.input}
        type="text"
        placeholder="Search by name or ingredient..."
        value={searchTerm}
        onChange={e => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default FilterSearch;