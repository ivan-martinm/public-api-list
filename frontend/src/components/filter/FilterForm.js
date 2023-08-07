import React from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import './FilterForm.css';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';

const FilterForm = ({
  filters,
  resetFilters,
  categories,
  handleFilter,
  addToCategoryFilter,
  removeFromCategoryFilter,
}) => {
  const dropdownScrollStyle = {
    maxHeight: '280px',
    overflowY: 'scroll',
  };

  const filterCircleStyle = (filterType) => {
    const circleStyle = {
      width: '1em',
      height: '1.5em',
      borderRadius: '50%',
    }
    circleStyle.backgroundColor = filters[filterType] === 'any'
      ? '#bbb'
      : (['yes', 'true'].includes(filters[filterType]) ? '#00b62a' : '#b61b00');
    return circleStyle;
  }

  return (
    <>
      <Nav variant="pills" className="row justify-content-center align-items-center">
        <div style={filterCircleStyle('auth')} /><NavDropdown
          className="col-auto"
          title="Auth"
          id="nav-dropdown-auth"
          onSelect={(value) => handleFilter(value, 'auth')}
        >
          <NavDropdown.Item
            eventKey="yes"
            active={filters.auth === 'yes'}
          >
            Yes
          </NavDropdown.Item>
          <NavDropdown.Item eventKey="no" active={filters.auth === 'no'}>
            No
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="any"
            active={filters.auth === 'any'}
          >
            Any
          </NavDropdown.Item>
        </NavDropdown>
        <div style={filterCircleStyle('https')} /><NavDropdown
          className="col-auto"
          title="HTTPS"
          id="nav-dropdown-https"
          onSelect={(value) => handleFilter(value, 'https')}
        >
          <NavDropdown.Item
            eventKey="true"
            active={filters.https === 'true'}
          >
            Yes
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="false"
            active={filters.https === 'false'}
          >
            No
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="any"
            active={filters.https === 'any'}
          >
            Any
          </NavDropdown.Item>
        </NavDropdown>
        <div style={filterCircleStyle('cors')} /><NavDropdown
          className="col-auto"
          title="Cors"
          id="nav-dropdown-cors"
          onSelect={(value) => handleFilter(value, 'cors')}
        >
          <NavDropdown.Item
            eventKey="yes"
            active={filters.cors === 'yes'}
          >
            Yes
          </NavDropdown.Item>
          <NavDropdown.Item eventKey="no" active={filters.cors === 'no'}>
            No
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="unknown"
            active={filters.cors === 'unknown'}
          >
            Unknown
          </NavDropdown.Item>
          <NavDropdown.Item
            eventKey="any"
            active={filters.cors === 'any'}
          >
            Any
          </NavDropdown.Item>
        </NavDropdown>
        <Dropdown
          className="col-auto"
          title="Categories"
          id="nav-dropdown-categories"
          onSelect={(category) =>
            addToCategoryFilter(category, 'category')
          }
        >
          <Dropdown.Toggle className={categories.length === 0 ? 'disabled' : ''}>Categories</Dropdown.Toggle>
          <Dropdown.Menu style={dropdownScrollStyle}>
            {categories.map((category) => (
              <Dropdown.Item
                key={category}
                eventKey={category}
                active={filters.category.includes(category)}
              >
                {category}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <div className="col-auto">
          <Form.Control
            type="text"
            placeholder="Search"
            id="inputSearch"
            value={filters.text}
            onChange={(event) => handleFilter(event.target.value, 'text')}
          />
        </div>
        <button
          className="btn btn-primary col-auto"
          type="reset"
          value="Reset"
          onClick={() => resetFilters()}
        >
          {' '}
          Reset
        </button>{' '}
      </Nav>
      <hr />
      <div className="row justify-content-center">
        {filters.category.map((category) => (
          <div className="col-auto category-label" key={category}>
            <div className="row justify-content-start align-items-center">
              <CloseButton
                className="col close-button"
                onClick={() => removeFromCategoryFilter(category)}
              />
              <div className="col-auto">{category}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FilterForm;
