import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2'
import {withStyles } from '@material-ui/core';

const styles = theme => ({
    barGraph:{
        padding:'10px'
    }
  });

class PieChart extends Component{
    
    render(){
        const {classes} = this.props;
        return(
            <div className={classes.barGraph} > 
                <Bar 
                data = {this.props.chartData}
                options = {this.props.chartOptions}
                />
            </div>
        )
    }
}

export default withStyles(styles)(PieChart);