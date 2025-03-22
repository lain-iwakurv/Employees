
import './app-filter.css';

const AppFilter = (props) => {
    const buttonsData = [
        {name: 'all', label: 'Все сотрудники'},
        {name: 'rise', label: 'На повышение'},
        {name: 'moreThan1k', label: 'З/П больше 1000$'}
    ];

    const buttons = buttonsData.map(({name, label}) => {
        const active = props.filter === name;
        const clazz = active ? "btn-light" : "btn-outline-light"
        return (
            <button 
                className={`btn ${clazz}`}
                type="button"
                key={name}
                onClick={() => props.onFilterEmp(name)}>
                    {label}
            </button>
        )
    })


    return (
        <div className="btn-group">
            {buttons}

        </div>
    );       

    // onFilterEmp = (e) => {
    //     const filter = e.target.getAttribute('data-filter')
    //     this.setState({filter})
    //     this.props.onFilterEmp(filter)
    // }

    
     
    
}

export default AppFilter;