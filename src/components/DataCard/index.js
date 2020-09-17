import React, {Component} from 'react';
import {
    Paper,
    Typography,
    Divider} from '@material-ui/core';
import {withStyles } from '@material-ui/core';

const styles = theme => ({
    root: {
      backgroundColor: "red"
    },
    typo: {
        padding: '0px',
        marginLeft: '10px',
        marginRight: '10px'

    },
    divTag: {
        display: 'flex',
        justifyContent: 'space-between',
        padding:'5px'
    },
    heading: {
        padding: '0px',
        marginLeft: '10px',
        marginRight: '10px',
        fontSize: theme.typography.pxToRem(14),
        color: theme.palette.text.secondary
    },
    secondaryHeading: {
        padding: '0px',
        marginLeft: '10px',
        marginRight: '10px',
        fontSize: theme.typography.pxToRem(16),
        color: theme.palette.text.primary,
        fontWeight: 600
    }
  });

class DataCard extends Component{
    state = {}

    render(){
        const {classes} = this.props;
        const displayData = this.props.displayData;
        return(
            <>
                {displayData.field1?
                <Paper elevation={3} square={false} >
                    <div className={classes.divTag} >
                        <Typography variant="subtitle1"  className={classes.heading}>
                            {displayData?displayData.field1:''}
                        </Typography>
                        <Typography variant="subtitle1" className={classes.secondaryHeading}>
                            {displayData?displayData.value1:''}
                        </Typography>
                    </div>
                    <Divider variant='middle' light={false}/>
                    <div className={classes.divTag}>
                        <Typography  variant="subtitle1" className={classes.heading}>
                            {displayData?displayData.field2:''}
                        </Typography>
                        <Typography variant="subtitle1" className={classes.secondaryHeading}>
                            {displayData?displayData.value2:''}
                        </Typography>
                    </div>
                </Paper>
                :''}
             </>
        );
    }
}

export default withStyles(styles)(DataCard);