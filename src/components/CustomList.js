import React from 'react';
import {css, StyleSheet} from 'aphrodite';
import {FixedSizeList} from 'react-window';

const CustomList = ({className, data, renderItem, height = 400, width = 200, itemSize = 42}) => {
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

export default CustomList;
