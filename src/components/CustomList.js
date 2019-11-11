import React from 'react';
import {css, StyleSheet} from 'aphrodite';
import {FixedSizeList} from 'react-window';
import PropTypes from 'prop-types';

/**
 * Component that handles list creation.
 * @param {Object} props
 * @todo Enable auto resizing.
 */
const CustomList = ({className, data, renderItem, height = 0, width = 200, itemSize = 32}) => {
  //auto detect height
  if (height === 0) height = data.length * itemSize;

  const styles = StyleSheet.create({
    container: {
      display: 'inline-block',
      width: width,
      height: height,
    }
  });

  return (
    <div className={css(className)}>
      <div className={css(styles.container)}>
        <FixedSizeList
          height={height}
          width={width}
          itemSize={itemSize}
          itemCount={data.length}
          itemData={data}
        >
          {({data, index}) => {
          const item = data[index]

          return (
            <div key={item+'-'+index}>
              {renderItem(item)}
            </div>
          );
       }} 
      </FixedSizeList>
      </div>
    </div>
  );
};

CustomList.propTypes = {
  className: PropTypes.object,
  data : PropTypes.array,
  renderItem: PropTypes.func.isRequired,
  height: PropTypes.number,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  itemSize: PropTypes.number,
};

export default CustomList;
