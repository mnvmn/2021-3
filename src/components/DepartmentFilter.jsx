import React, { Component } from 'react';
import ServiceContext from '../lib/ServiceContext';
import Events from '../lib/Events';

class DepartmentFilter extends Component {
  subscriptions = [];

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      departments: [],
    };
  }

  componentDidMount = () => {
    const { bus } = this.context;

    this.subscriptions.push(
      bus.subscribe(Events.LOADED_DEPARTMENTS, this.onDataUpdate),
    );
  };

  componentWillUnmount = () => {
    this.subscriptions.forEach((sbs) => sbs());
  };

  onDataUpdate = ({ payload }) => {
    this.setState({
      departments: payload.departments,
      loading: false,
    });
  };

  handleChange = (e) => {
    const { bus } = this.context;
    const departmentId = parseInt(e.target.value, 10);
    bus.publish(Events.FILTERED_USERS({ departmentId }));
  };

  render() {
    const { departments, loading } = this.state;
    return (
      <div className="Department-Filter">
        <select
          disabled={loading}
          onChange={this.handleChange}
        >
          <option
            key={0}
            value={0}
          >
            All departments
          </option>
          {departments.map(({ id, departmentName }) => (
            <option
              key={id}
              value={id}
            >
              {departmentName}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

DepartmentFilter.contextType = ServiceContext;

export default DepartmentFilter;
