import React from 'react';
import './Autocomplete.css';
import { getData } from './getData';
// Don't change any declarations.
import { debounce } from 'lodash'


//Todo Validations


const AutocompleteListItem = ({text, onSelectItem}) => {
  return (
    // eslint-disable-next-line
    <a className="list-item" onClick={e => onSelectItem(text)} >
      {text}
    </a>
  );
};


const AutocompleteList = ({list, onSelectItem}) => { //? New File?
//! props drilling
//? useContext?
  if(!list.length){
    return null;
  }

  return (
    <div className="list">
      {
        list.map(item => <AutocompleteListItem key={item} text={item} onSelectItem={onSelectItem}/>)
      }
    </div>
  );
};


class Autocomplete extends React.Component {


  constructor(){
    super();
    this.state = {
      isLoading: false,
      queryString: '',
      list:[]
    }
  }


  async fetchSuggestion(query){
    return await getData(query);
  }

  async onChangeHandler({ target: { value } }) {
    this.setState({
      queryString: value,
      isLoading: true,
      list: []
    })

    if(value){
      const suggestions = await this.fetchSuggestion(value);
      this.setState({ list: [...suggestions], isLoading: false })
    }
    else{
      this.setState({ list: [], isLoading: false })
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className={`control ${this.state.isLoading ? 'isLoading' : ''}`}>
          <input onChange={debounce(this.onChangeHandler.bind(this), 500)} className="input" />
        </div>
        <AutocompleteList list={this.state.list} onSelectItem={this.props.onSelectItem}/>
      </div>
    );
  }
}

export { Autocomplete };
