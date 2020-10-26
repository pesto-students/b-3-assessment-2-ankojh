import React, { useContext, useState } from 'react';


const CheckboxContext = React.createContext();


const Checkbox = (props) => {
  const { onChange, isChecked } = useContext(CheckboxContext);

  function onChangeHandler(event) {
    onChange && onChange(props.value, event.target.checked)
  }

  return (
    <input
      type="checkbox"
      value={props.value}
      checked={isChecked(props.value)}
      onChange={onChangeHandler} />
  );
};

class CheckboxGroup extends React.Component {

  constructor() {
    super();

    this.state = {
      checked: {},
    }
  }


  componentDidMount(){
    const defaultChecked = {}
    this.props.value.forEach((value)=>{
      defaultChecked[value] = true
    })
    this.setState({checked:defaultChecked})
  }


  onChangeHandler(value, checkedState) {
    this.setState({checked:{...this.state.checked, [value]: checkedState}}, ()=>{
      this.props.onChange(Object.keys(this.state.checked).filter(value=>this.state.checked[value]));
    })
  }

  isChecked(value){
    return Boolean(this.state.checked[value])
  }


  render() {
    return <CheckboxContext.Provider value={{ onChange: this.onChangeHandler.bind(this), isChecked: this.isChecked.bind(this)  }}>
      {this.props.children(Checkbox)}
    </CheckboxContext.Provider>
  }
}

export { CheckboxGroup };
