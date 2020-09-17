import React, {Component} from 'react';
import {Pie, Doughnut} from 'react-chartjs-2'

import {withStyles } from '@material-ui/core';

const styles = theme => ({
    pieChart:{
        padding:'10px'
    }
  });


class PieChart extends Component{
    
    render(){
        const {classes} = this.props;
        return(
            <div className={classes.pieChart}>
                <Doughnut
                data = {this.props.chartData}
                options = {this.props.chartOptions}
                />
            </div>
        )
    }
}

export default withStyles(styles)(PieChart);