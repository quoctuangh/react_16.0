import React, { Component } from 'react';
import Title from './components/Title';
import Control from './components/Control';
import Form from './components/Form';
import List from './components/List';
import {filter, includes, orderBy as funcOrderBy, remove, reject} from 'lodash';
// import task from './mocks/Task';
const { v4: uuidv4 } = require('uuid');

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            isShowForm: false,
            strSearch : '',
            orderBy : 'name',
            orderDir : 'desc',
            itemSelected: null,
        };

        this.handleToogleForm = this.handleToogleForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.handeDelete = this.handeDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentWillMount() {
        let items =     JSON.parse(localStorage.getItem('task'));
        this.setState({
            items : items,
        })
    }

    handleSubmit(item) {
        let {items} = this.state;
        let id = null;
        console.log(this.state);

        if (item.id !== '') {
            items = reject(items, {id: item.id});
            id = item.id;
            // items.forEach((elm, key) => {
            //     if (elm.id === item.id) {
            //         items[key].name = item.name;
            //         items[key].level = +item.level;
            //     }
            // })
        } else {
            id = uuidv4();
        }
        items.push({
            name: item.name,
            level: +item.level
        });

        this.setState({
            items: items,
            isShowForm: false
        });

        localStorage.setItem("task", JSON.stringify(items));
    }

    handleEdit(item) {
        this.setState({
            itemSelected: item,
            isShowForm: true
        });
    }
    handeDelete(id) {
        let items = this.state.items;
        remove(items, (item) => {
            return item.id === id;
        });

        this.setState({
            items: items,
            isShowForm: false
        });

        localStorage.setItem("task", JSON.stringify(items));
    }

    handleSort(orderBy, orderDir) {
        this.setState({
            orderBy: orderBy,
            orderDir: orderDir
        });
    }

    handleToogleForm() {
        this.setState({
            isShowForm: !this.state.isShowForm,
            itemSelected: null
        });
    }

    handleSearch(value) {
        this.setState({
            strSearch: value
        });
    }

    closeForm() {
        this.setState({
            isShowForm: false
        });
    }

    render() {
        let elmForm = null;
        let itemsOrigin = (this.state.items !== null) ? [...this.state.items] : [];
        let items = [];
        let {orderBy, orderDir, isShowForm, strSearch, itemSelected} = this.state;

        console.log (orderBy + "-" + orderDir);

        items = filter(itemsOrigin, (item) => {
            return includes(item.name.toLowerCase(), strSearch.toLowerCase());
        });

        items = funcOrderBy(items, [orderBy], [orderDir]);
        // if (search.length > 0) {
        //     itemsOrigin.forEach((item) => {
        //         if (item.name.toLowerCase().indexOf(search) !== -1) {
        //             items.push(item);
        //         }
        //     });
        // } else {
        //     items = itemsOrigin;
        // }

        if (isShowForm) {
            elmForm = <Form itemSelected={itemSelected} onClickSubmit={this.handleSubmit} onClickCancel={this.closeForm}/>;
        }
        return (
            <div>
                <Title/>
                {/* TITLE : END */}
                {/* CONTROL (SEARCH + SORT + ADD) : START */}
                <Control orderBy={orderBy} orderDir={orderDir} onClickSort={this.handleSort} onClickSearchGo={this.handleSearch} onClickAdd = {this.handleToogleForm} isShowForm={isShowForm}/>
                {/* CONTROL (SEARCH + SORT + ADD) : END */}
                {/* FORM : START */}
                {elmForm}
                {/* FORM : END */}
                {/* LIST : START */}
                <List onClickEdit={this.handleEdit} onClickDelete={this.handeDelete} items ={items}/>
			</div>
        );
    }
}

export default App;
