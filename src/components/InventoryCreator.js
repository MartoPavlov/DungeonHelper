import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet} from 'aphrodite';
import ItemInput from './ItemInput';
import CustomButton from './CustomButton';
import {addItem} from '../redux/index';
import CustomList from './CustomList';
import CustomLabel from './CustomLabel';
import CustomHeading from './CustomHeading'
 

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
            CREATE
          </CustomButton>
          <CustomList
            className={styles.list}
            height={height * 2/5 + 20}
            width={width * 7/10}
            data={inventory} 
            renderItem={(item) => {
              return (
                <CustomLabel className={styles.label}  width={'40%'} fontSize={18}>
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
