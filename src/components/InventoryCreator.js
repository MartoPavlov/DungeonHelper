import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'aphrodite';
import ItemInput from './ItemInput';
import CustomButton from './CustomButton';
import {addItem} from '../redux/index';
import CustomList from './CustomList';
import CustomLabel from './CustomLabel';
import CustomHeading from './CustomHeading'
 
/**
 * Component that renders an inventory creator functionality of the application.
 * It works direcly with redux.
 * @todo probably is not a bad idea to devide this component into more smaller
 * ones
 */
class InventoryCreator extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      count: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.handleItemNameChange = this.handleItemNameChange.bind(this);
    this.handleIncrementCount = this.handleIncrementCount.bind(this);
    this.handleDecrementCount = this.handleDecrementCount.bind(this);
    this.handleCreateButtonClick = this.handleCreateButtonClick.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize(event) {
    const target = event.target;
    this.setState({
      width: target.innerWidth,
      height: target.innerHeight,
    });
  }

  /**
   * Updates the state when you enter text in the item name field.
   * @param {String} text 
   */
  handleItemNameChange(text) {
    this.setState({
      name: text,
    });
  }

  /**
   * Works closely with the Counter component - increments the count of the 
   * item.
   * @see Counter
   */
  handleIncrementCount() {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  }

  /**
   * Works closely with the Counter component - decrements the count of the 
   * item.
   * @see Counter
   */
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
    const {name, count, width, height} = this.state;
    const {inventory} = this.props

    return (
      <div>
        <CustomHeading>Create Inventory</CustomHeading>
        <ItemInput
          label="Item"
          name={name}
          count={count}
          onChange={this.handleItemNameChange}
          increment={this.handleIncrementCount}
          decrement={this.handleDecrementCount}
        />
        <div>
          <CustomButton onClick={this.handleCreateButtonClick} fontSize={14}>
            ADD
          </CustomButton>
          <CustomList
            className={styles.list}
            width={width*7/10}
            height={height*5/9 - 88}
            data={inventory} 
            renderItem={(item) => {
              return (
                <CustomLabel className={styles.label}>
                  {item.name}({item.count})
                </CustomLabel>
              );
            }}
          />
        </div>
      </div>
    );
  }
};

const styles = StyleSheet.create({
  list: {
    textAlign: 'center',
    paddingTop: 20,
  },
  label: {
    marginTop: 10,
    marginBottom: 10,
    width: '40%',
    fontSize: 18,
  }
});

const mapStateToProps = (state) => {
  return {
    inventory: state.inventory.inventory,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (item) => dispatch(addItem(item))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InventoryCreator);
