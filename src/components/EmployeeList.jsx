import React, { Component } from 'react';
import { toast } from 'react-toastify';
import ServiceContext from '../lib/ServiceContext';
import Events from '../lib/Events';
import _ from 'lodash';

class EmployeeList extends Component {
  subscriptions = [];

  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      employeesFiltered: [],
      departmentsMap: null,
    };
  }

  componentDidMount = () => {
    this.loadData();
    const { bus } = this.context;
    this.subscriptions.push(
      bus.subscribe(Events.FILTERED_USERS, this.onFilter),
    );
  };

  componentWillUnmount = () => {
    this.subscriptions.forEach((sbs) => sbs());
  };

  onFilter = ({ payload }) => {
    const { employees } = this.state;
    this.setState({
      employeesFiltered: payload.departmentId
        ? _.filter(employees, { departmentId: payload.departmentId }) : employees,
    });
  };

  loadData = () => {
    const { api, bus } = this.context;

    Promise.all([api.employee.list(), api.department.list()])
      .then((resp) => {
        this.setState({
          employees: resp[0].data,
          employeesFiltered: resp[0].data,
          departmentsMap: this.mapDepartments(resp[1].data),
        });

        bus.publish(Events.LOADED_DEPARTMENTS({
          departments: resp[1].data,
        }));
      }, () => {
        toast.error('Connection error');
      });
  };

  mapDepartments = (departments) => {
    const map = {};
    departments.forEach((dep) => map[dep.id] = dep);
    return map;
  };

  render() {
    const { employeesFiltered, departmentsMap } = this.state;
    return (
      <div className="Employee-List">
        <table>
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {employeesFiltered.map(({ id, name, departmentId }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{departmentsMap[departmentId].departmentName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

EmployeeList.contextType = ServiceContext;

export default EmployeeList;
