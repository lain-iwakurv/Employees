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
                {name:'John C.', salary: 800, increase: true, rise: true, id: 1},
                {name:'Alex M.', salary: 3000, increase: false, rise: false, id: 2},
                {name:'Carl S.', salary: 15000, increase: true, rise: false, id: 3},
            ],
            term: '', 
            filter: 'all'
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

    addItem = (name, salary) => {
        const newItem = { 
            name,  // Если имя переменной совпадает с именем свойства, то можно не писать name: name
            salary, 
            increase: false,
            rise: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem]; 
            return {
                data: newArr
            }
        })
    }

    onToggleProp = (id, prop) => { // будет изменять параметр increase на противоположный
        // this.setState(({data}) => {
        //     const index = data.findIndex(elem => elem.id === id);

        //     const old = data[index];
        //     const newItem = {...old, increase: !old.increase};
        //     const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

        //     return {
        //         data: newArr
        //     }
        
        // })

        this.setState(({data}) => ({ 
            data: data.map(item => {
                if (item.id === id) {
                    return {
                        ...item, [prop]: !item[prop]
                    }
                }
                return item;
            })
        }))
    }

    searchEmp = (items, term) => {
        console.log('searchEmp input:', items, term);
        if (term.length === 0) {
            return items;
        } 
        return items.filter(item => {
            return item.name.indexOf(term) > -1
        }) 
    }

    onUpdateSearch = (term) => {
        this.setState({
            term
        });
    }
    
    filterEmp = (items, filter) => {
        switch(filter) {
            case 'rise':
                return items.filter(item => item.rise);
            case 'moreThan1k':
                return items.filter(item => item.salary >= 1000);
            default:
                return items;
        }
    }

    onFilterEmp = (filter) => {
        this.setState({
            filter
        })
    }

    render() { 
        const {data, term, filter} = this.state;
        const employees = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterEmp(this.searchEmp(data, term), filter);
        return (
            <div className="app" >

                <AppInfo 
                    employees={employees}
                    increased={increased}/>

                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterEmp={this.onFilterEmp}/>
                </div>

            
                <EmployeesList 
                    data={visibleData} 
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}/>
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );        
    }
}

export default App;