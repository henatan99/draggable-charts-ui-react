import './Chart.css'
import React from "react";

const Chart = (props) => {
    const { data } = props;
    const dataLength = data.length;
    const numericData = data.map(val => parseFloat(val));
    const maxHeight = Math.max(...numericData);

    return (
        <div className='chart'>
            {
                dataLength > 0 && numericData.map ((val, ind) => {
                    return (
                        <div
                            className='chart-elem'
                            style={{
                                width: `${100/2/dataLength}%`,
                                height: '100%',
                                marginLeft: `${100/4/dataLength}%`,
                                marginRight: `${100/4/dataLength}%`,
                                // backgroundColor: "red"
                            }}
                            key = {ind}
                        >
                            <span
                                style={{
                                    width: '100%',
                                    height: `${val/maxHeight * 100}%`,
                                    backgroundColor: "blue",
                                }}
                            />
                        </div>
                    )
                })
            }
        </div>
    )
} 
export default Chart;