import { Component } from "react";
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name:'John C.', salary: 800, increase: true, id: 1},
                {name:'Alex M.', salary: 3000, increase: false, id: 2},
                {name:'Carl S.', salary: 15000, increase: true, id: 3},
            ]
        }
        this.maxId = 4;
    } 

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    } // этод метод который лежит в верхнем уровне (App.js) передается аж до самого нижнего уровня (employees-list-item)

    

    render() {
        const {data} = this.state;
        return (
            <div className="app" >

                <AppInfo/>

                <div className="search-panel">
                    <SearchPanel/>
                    <AppFilter/>
                </div>

                <EmployeesList data={data} onDelete={this.deleteItem}/>
                <EmployeesAddForm/>
            </div>
        );        
    }
}

export default App;