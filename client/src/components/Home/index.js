import React, { Component } from 'react';
import {connect} from 'react-redux';
import Pages from './Pages';
import SearchBar from './SearchBar';
import EmployeeTable from './EmployeeTable';
import * as actions from '../../actions';
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';
import ScrollArea from'react-scrollbar';
// import ReactScrollbar from 'react-scrollbar-js';



class Home extends Component {
    componentDidMount(){
        console.log("home did mount")
        this.props.getAllEmployeesFromServer();
        this.props.editEmployeeCompleted(false);
        this.props.newEmployeeCompleted(false);
    }
    handleFilterTextChange = (filterText) => {
        this.props.setFilterText(filterText);
    }

    deleteOneEmployee = (index)=>{
        this.props.deleteOneEmployee(index);
    }
    setSort =(str)=>{
        this.props.setSort(str);
    }
    getPageEmployees=(page)=>{
        this.props.getPageEmployees(page);
    }
    render() {
        console.log("home render")
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.dataLoading) {
            return <p>Loading…</p>;
        }
        return (
            <div className="div-container">
                <div style={{width: "60%", float: "left"}}>
                    <SearchBar  filterText={this.props.filterText} onFilterTextChange={this.handleFilterTextChange}/>
                </div>
                <div style={{width: "40%", float: "right"}}>
                    <button  className="buttons" ><Link to="/newemployee">Cerate new user</Link></button>

                </div>
                <ScrollArea speed={0.8} className="area"   horizontal={true} vertical ={true}>
                    <EmployeeTable 
                        filterText={this.props.filterText}
                        deleteOneEmployee={this.deleteOneEmployee}
                        itemNum = {10}
                        pictureSort = {this.pictureSort}
                        nameSort ={this.nameSort}
                        titleSort={this.titleSort}
                        sexSort={this.sexSort}
                        officePhoneSort={this.officePhoneSort}
                        cellPhoneSort={this.cellPhoneSort}
                        SMSSort={this.SMSSort}
                        emailSort={this.emailSort}
                        childrenSort={this.childrenSort}
                        managerSort={this.managerSort}
                        startDateSort={this.startDateSort}
                    />
                </ScrollArea>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log("home map, state.employees")
    console.log(state.employees)
    return {
        filterText: state.myEmployeeListR.filterText,
        hasErrored: state.myEmployeeListR.hasError,
        dataLoading: state.myEmployeeListR.dataLoading,
        employees: state.myEmployeeListR.employees,
    }
};

function mapDispatchToProps(dispatch) {
    return({
        setFilterText:(text) =>{dispatch(actions.setFilterText(text))},
        addOnePage: () =>{dispatch(actions.pageIncrement)},
        minusOnepage:() =>{dispatch(actions.pageDecrement)},
        setSort:(str) =>{actions.setSort.str=str, dispatch(actions.setSort)},
        getAllEmployeesFromServer: () =>{dispatch(actions.getAllEmployeesFromServer())},
        deleteOneEmployee:(id) =>{dispatch(actions.deleteOneFromServer(id))},
        editEmployeeCompleted:(val) =>{dispatch(actions.editEmployeeCompleted(val))},
        newEmployeeCompleted:(val) => {dispatch(actions.newEmployeeCompleted(val))},
        getPageEmployees:(page)=>{dispatch(actions.getPageEmployees(page))},
      })
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
