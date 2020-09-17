import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Divider} from '@material-ui/core';

import DataTable from '../DataTable'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: '15px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  summary: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px',
    width: '100%'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(12),
    color: theme.palette.text.secondary,
  },
  subSecondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  }
}));

export default function ControlledAccordions(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const tableData = props.tableData;
   
  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} elevation={3} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          
        >
        <div className={classes.summary}>
            <div>
              <Typography className={classes.heading}>{tableData.securityType}</Typography>
            </div>
            <Divider orientation="vertical" />
            {tableData.summaryData.investment?<div>
              <Typography className={classes.secondaryHeading}>Investment</Typography>
              <Typography className={classes.subSecondaryHeading}>$ {parseFloat(tableData.summaryData.investment).toFixed(2)}</Typography>
            </div>:''}
            {tableData.summaryData.currentValuation?<div>
              <Typography className={classes.secondaryHeading}>Current Valuation</Typography>
              <Typography className={classes.subSecondaryHeading}>$ {parseFloat(tableData.summaryData.currentValuation).toFixed(2)}</Typography>
            </div>:''}
            {tableData.summaryData.currentValuationPercentage?<div>
              <Typography className={classes.secondaryHeading}>Current Valuation (%)</Typography>
              <Typography className={classes.subSecondaryHeading}>{parseFloat(tableData.summaryData.currentValuationPercentage).toFixed(2)}</Typography>
            </div>:''}
            {tableData.summaryData.unrealizedPL?<div>
              <Typography className={classes.secondaryHeading}>Unrealized Profit/Loss</Typography>
              <Typography className={classes.subSecondaryHeading}>$ {parseFloat(tableData.summaryData.unrealizedPL).toFixed(2)}</Typography>
            </div>:''}
            {tableData.summaryData.unrealizedPLPercentage?<div>
              <Typography className={classes.secondaryHeading}>Unrealized Profit/Loss (%)</Typography>
              <Typography className={classes.subSecondaryHeading}>{parseFloat(tableData.summaryData.unrealizedPLPercentage).toFixed(2)}</Typography>
            </div>:''}
        </div>         
        </AccordionSummary>
        <Divider/>
        <AccordionDetails >         
            <DataTable detailsData = {tableData.detailsData}/>
        </AccordionDetails>
      </Accordion>
      
    </div>
  );
}