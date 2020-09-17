import React, {Component} from 'react';
import {Line} from 'react-chartjs-2'
import {withStyles } from '@material-ui/core';

const styles = theme => ({
    lineGraph:{
        padding:'10px'
    }
  });

class LineGraph extends Component{
    state = {
        chartData: this.props.chartData
    }
    render(){
        const {classes} = this.props;
        return(
            <div className={classes.lineGraph}>
                <Line 
                data = {this.props.chartData}
                options = {this.props.chartOptions}
                />
            </div>
        )
    }
}

export default withStyles(styles)(LineGraph);