import React, { Component } from 'react';
import {Grid, 
    Paper, 
    Tabs, 
    Tab, 
    Divider, 
    Typography} from '@material-ui/core';
import {withStyles } from '@material-ui/core';

import {PulseLoader} from 'react-spinners'

import PieChart from '../PieChart'
import BarGraph from '../BarGraph';
import LineGraph from '../LineGraph';
import DataCard from '../DataCard';
import colors from '../../constants/Colors';
import SecurityDetails from '../SecurityDetails';



const styles = theme => ({
    root:{
        padding:'10px'
    }
  });


class Dashboard extends Component {
    state = {
        isLoading: true,
        securityDistributionData : {},
        securityDistributionOptions : {},  
        performanceData : {},
        performanceDataOptions : {},
        sectorDistributionData : {},
        sectorDistributionOptions : {},
        networthData : {},
        unrealisedProfitLossData : {},
        maxGainerLoserData : {},
        tableAPIData : [],
        selectedTabValue: 0,
        apiResponseStateCopy: {}
    }

    componentWillMount()
    {
        fetch('https://hstackpf.herokuapp.com/api')
        .then(res=>res.json())
        .then(json=> {
            this.setState({
                apiResponseStateCopy: json.ClientHistory
            });
            
            this.getTableData(json.TableData);
            this.getNetworthData(json.TopThreeCards.card1);
            this.getUnrealisedProfitLoss(json.TopThreeCards.card2); //Check here
            this.getMaxGainerLoserData(json.TopThreeCards.card3);                       ///Check here
            this.getSecurityDistributionData(json.SecurityDistGraph);
            this.getSecurityDistributionOptions();
            this.getSectorDistributionData(json.SectorDistGraph);
            this.getSectorDistributionOptions();
            this.getPerformanceData(json.ClientHistory);
            this.getPerformanceChartOptions();
            this.setState({
                isLoading:false
            });
        });
    }

    getUnrealisedProfitLoss(apiResponse){
        //API call returns data which is then used to update the state
        let apiResponseData = {
            field1 : apiResponse.field1,
            field2 : apiResponse.field2,
            value1 : `$ ${parseFloat(apiResponse.value1).toFixed(2)}`,
            value2 : `$ ${parseFloat(apiResponse.value2).toFixed(2)}`
        }

        this.setState({
            unrealisedProfitLossData : apiResponseData
        })
    }

    getNetworthData(apiResponse)
    {   //API call returns data which is then used to update the state
        let apiResponseData = {
            field1 : apiResponse.field1,
            field2 : apiResponse.field2,
            value1 : `$ ${parseFloat(apiResponse.value1).toFixed(2)}`,
            value2 : `$ ${parseFloat(apiResponse.value2).toFixed(2)}`
        }

        this.setState({
            networthData : apiResponseData
        })
    }

    getMaxGainerLoserData(apiResponse){
        //API call returns data which is then used to update the state
        let apiResponseData = {
            field1 : apiResponse.field1,
            field2 : apiResponse.field2,
            value1 : apiResponse.value1,
            value2 : apiResponse.value2
        }

        this.setState({
            maxGainerLoserData : apiResponseData
        })
    }

    getSecurityDistributionData(apiResponse){
        //API call returns data which is then used to update the state
        let apiResponseData = { 
            labels: apiResponse.labels,
            datasets:[{
                data: apiResponse.datasets
            }]
        }

        //Adding colors to API response 
        apiResponseData.datasets[0] = { ...apiResponseData.datasets[0], 
            backgroundColor: [
                colors.VIOLET_COLOR,
                colors.CYAN_COLOR,
            ]}
        
        this.setState({
            securityDistributionData : apiResponseData
        })
    }

    getSecurityDistributionOptions(){
        this.setState({
            securityDistributionOptions:{
                responsive:true,
                title:{
                    display: true,
                    text: 'Security distribution (%)',
                    fontSize:20
                },
                legend:{
                    display: true,
                    position: 'right',
                    labels:{
                        fontColor:'#000'
                    }
                }
            }
        })
    }
    
    getPerformanceData(apiResponse){
        console.log("I am here again")
        //API Call to fetch the performance data as per the selected frequency and duration
        const apiResponseData = {
            labels : apiResponse.labels,
            datasets:[
            {
                label: 'Investment Value',
                data: apiResponse.datasets.totalInvested
            }, 
            {
                label: 'Closing Price Valuation',
                data: apiResponse.datasets.netPosition
            }] 
        }

        console.log(apiResponse.labels);

        //Adding colors to the API response 
        apiResponseData.datasets[0] = { ...apiResponseData.datasets[0], 
            borderColor:colors.LIGHT_BLUE_COLOR,
            backgroundColor: colors.LIGHT_BLUE_COLOR,
            pointBackgroundColor: colors.LIGHT_BLUE_COLOR,
            pointBorderColor: colors.LIGHT_BLUE_COLOR,
            pointRadius: 1 }
        
        apiResponseData.datasets[1] = { ...apiResponseData.datasets[1],
            borderColor: colors.LIGHT_YELLOW_COLOR,
            backgroundColor: colors.LIGHT_YELLOW_COLOR,
            pointBackgroundColor: colors.LIGHT_YELLOW_COLOR,
            pointBorderColor: colors.LIGHT_YELLOW_COLOR,
            pointRadius: 1 }

        //Create a copy of the object
        let modifiedResponseData = {...apiResponseData};

        //Modifying the data as per the selected timeline
        if(this.state.selectedTabValue===0)
        {   //Weekly data
            modifiedResponseData = { ...modifiedResponseData,
                labels: apiResponseData.labels.slice(0,7).reverse(),
            }
            modifiedResponseData.datasets[0] = {...apiResponseData.datasets[0],
                data : apiResponseData.datasets[0].data.slice(0,7).reverse()
            }
            modifiedResponseData.datasets[1] = {...apiResponseData.datasets[1],
                data : apiResponseData.datasets[1].data.slice(0,7).reverse()
            }
        }
        else if(this.state.selectedTabValue===1)
        {   //Monthly data
            modifiedResponseData = { ...modifiedResponseData,
                labels: apiResponseData.labels.slice(0,30).reverse(),
            }
            modifiedResponseData.datasets[0] = {...apiResponseData.datasets[0],
                data : apiResponseData.datasets[0].data.slice(0,30).reverse()
            }
            modifiedResponseData.datasets[1] = {...apiResponseData.datasets[1],
                data : apiResponseData.datasets[1].data.slice(0,30).reverse()
            }
        }
        else if(this.state.selectedTabValue===2)
        {   //Quarterly data
            modifiedResponseData = { ...modifiedResponseData,
                labels: apiResponseData.labels.slice(0,90).reverse(),
            }
            modifiedResponseData.datasets[0] = {...apiResponseData.datasets[0],
                data : apiResponseData.datasets[0].data.slice(0,90).reverse()
            }
            modifiedResponseData.datasets[1] = {...apiResponseData.datasets[1],
                data : apiResponseData.datasets[1].data.slice(0,90).reverse()
            }
        }
        else if(this.state.selectedTabValue===3)
        {   //Annual Data
            //No change to the response
            modifiedResponseData = { ...modifiedResponseData,
                labels: apiResponseData.labels.slice(0,365).reverse(),
            }
            modifiedResponseData.datasets[0] = {...apiResponseData.datasets[0],
                data : apiResponseData.datasets[0].data.slice(0,365).reverse()
            }
            modifiedResponseData.datasets[1] = {...apiResponseData.datasets[1],
                data : apiResponseData.datasets[1].data.slice(0,365).reverse()
            }
        }
         
        this.setState({
            performanceData:modifiedResponseData
        })
    }

    getPerformanceChartOptions(){
        this.setState({
            performanceDataOptions:{
                pointRadius:10,
                title:{
                    display: true,
                    text: 'Performance',
                    fontSize:20,
                },
                scales: {
                    yAxes: [
                    {
                        ticks:{
                            min:8000,
                            stepSize:100000
                        },
                        scaleLabel: {
                            display: true,
                            labelString: "Valuation (in Dollars)",
                            fontColor: "black"
                        }
                    }],
                    
                },
                legend:{
                    display: true,
                    position: 'top',
                    labels:{
                        fontColor:'#000'
                    }
                }
            }
        })
    }

    getSectorDistributionData(apiResponse){
        //API call returns data which is then used to update the state
        let apiResponseData = { 
            labels:apiResponse.labels,
            datasets:[{
                data: apiResponse.datasets[0].data
            }]
        }

        //Adding colors to API response 
        apiResponseData.datasets[0] = { ...apiResponseData.datasets[0], 
            backgroundColor: [
                colors.RED_COLOR,
                colors.GREEN_COLOR,
                
                colors.YELLOW_COLOR,
                colors.BLUE_COLOR,
                colors.VIOLET_COLOR ,
                colors.MAROON_COLOR ,
                colors.BLACK_COLOR,
                colors.CYAN_COLOR
            ]}
        
        this.setState({
            sectorDistributionData : apiResponseData
        })

    }

    getSectorDistributionOptions(){
        this.setState({
            sectorDistributionOptions:{
                responsive:true,
                title:{
                    display: true,
                    text: 'Sector-wise distribution (%)',
                    fontSize:20
                },
                legend:{
                    display: true,
                    position: 'right',
                    labels:{
                        fontColor:'#000'
                    }
                }
            }
        })
    }

    getTableData(apiResponse){
        //API Response data to be transformed 
        let apiResponseData = apiResponse;
        
        this.setState({
            tableAPIData : apiResponseData
        })
    }

    handleTabChange = (event, newValue) => {
        console.log(newValue);
        this.setState({
            selectedTabValue: newValue,
        }, ()=>this.getPerformanceData(this.state.apiResponseStateCopy))
    }


    render() {
        let tabStyle = {
            minWidth: 50,
            paddingLeft: 0,
            paddingRight: 0,
        };
        const {classes} = this.props;
        return(
        <div className={classes.root}>
            {this.state.isLoading?
            <PulseLoader loading color={colors.BLUE_COLOR} style={{position: 'fixed',
                left: '0px',
                top: '0px',
                width: '100%',
                height: '100%',
                zIndex: '9999'}}/>:
            <Grid container spacing={2} >
                <Grid item xs={12} sm={4}>
                    <DataCard displayData={this.state.networthData}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <DataCard displayData={this.state.unrealisedProfitLossData}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <DataCard displayData={this.state.maxGainerLoserData}/>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Paper elevation={3} square={false} >
                        <PieChart chartData={this.state.securityDistributionData} chartOptions={this.state.securityDistributionOptions}/>
                        <Divider/>
                        <Typography variant="subtitle1"  style={{padding:11, color:"white"}}>
                            Abc                        
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4} >
                    <Paper elevation={3} square={false} >
                        <LineGraph chartData={this.state.performanceData} chartOptions={this.state.performanceDataOptions} />                                              
                        <Divider/>
                        <Tabs
                            value = {this.state.selectedTabValue}
                            onChange = {this.handleTabChange}
                            indicatorColor = "primary"
                            textColor = "primary"
                            variant="fullWidth"
                            centered
                            >
                            <Tab label="weekly" style={tabStyle}/>
                            <Tab label="monthly" style={tabStyle}/>
                            <Tab label="Quarterly" style={tabStyle}/>
                            <Tab label="Annual" style={tabStyle}/>
                        </Tabs>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper elevation={3} square={false}>
                        <PieChart chartData={this.state.sectorDistributionData} chartOptions={this.state.sectorDistributionOptions}/>
                        <Divider/>
                        <Typography variant="subtitle1"  style={{padding:11, color:"white"}}>
                            Abc                        
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12}>
                    {this.state.tableAPIData.map((finSecurity)=>(
                        <SecurityDetails tableData={finSecurity}/>
                    ))}
                    
                </Grid>
            </Grid>}
        </div>
        );
    }
}

export default withStyles(styles)(Dashboard);
