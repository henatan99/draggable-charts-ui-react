import './Chart.css'
import React from "react";

const Chart = (props) => {
    const { data } = props;
    const dataLength = data.length;
    const numericData = data.map(val => parseFloat(val));
    const maxHeight = Math.max(...numericData);
    const dividerGap = 20;
    const dividers = Math.ceil(maxHeight / dividerGap);
    const chartHeight = dividers * dividerGap;

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
                            }}
                            key = {ind}
                        >
                            <span
                                style={{
                                    width: '100%',
                                    height: `${val/chartHeight * 100}%`,
                                    backgroundColor: "blue",
                                }}
                            >
                                <span>{val}</span>
                            </span>
                        </div>
                    )
                })
            }
            {
                [...Array(dividers + 1).keys()].map(divider => {
                    return <span style={{width: '100%', height: 5, position: 'absolute', left: 0, bottom: `${divider * dividerGap / chartHeight * 100}%`}}><p>{divider * dividerGap}</p><hr></hr></span>
                })
            }
        </div>
    )
}

export default Chart;