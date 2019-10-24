import React, {Component} from 'react';
import ItemInput from './ItemInput';
import CustomButton from './CustomButton';
import {addItem} from './redux/index';
 

class InventoryCreator extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      count: 0,
    };

    this.handleItemNameChange = this.handleItemNameChange.bind(this);
    this.handleIncrementCount = this.handleIncrementCount.bind(this);
    this.handleDecrementCount = this.handleDecrementCount.bind(this);
    this.handleCreateButtonClick = this.handleCreateButtonClick.bind(this);
  }

  handleItemNameChange(text) {
    this.setState({
      name: text,
    });
  }

  handleIncrementCount() {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  }

  handleDecrementCount() {
    this.setState((prevState) => ({
      count: prevState.count - 1,
    }));
  }

  handleCreateButtonClick() {
    const {name, count} = this.state;

    if (!name || count === 0) return;
    const item = {
      name: name,
      count: count,
    }

    this.props.addItem(item);
    this.setState({
      name: '',
      count: 0,
    });
  }
  
  render() {
    const {name, count} = this.state;

    return (
      <div>
        <div className="title">Create Inventory</div>
        <ItemInput
          label="Item"
          name={name}
          count={count}
          onChange={this.handleItemNameChange}
          increment={this.handleIncrementCount}
          decrement={this.handleDecrementCount}
        />
        <div>
          <CustomButton onClick={this.handleCreateButtonClick}>
            Create
          </CustomButton>
        </div>
      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (ability) => dispatch(addItem(ability))
  };
}

export default connect(null, mapDispatchToProps)(InventoryCreator);
