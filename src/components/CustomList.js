import React from 'react';
import {FixedSizeList} from 'react-window';

const CustomList = ({data, renderItem, height = 400, width = 200, itemSize= 42}) => {


  return (
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
  );
};

export default CustomList;
