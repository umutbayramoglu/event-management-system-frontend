import React from "react";
import PropTypes from "prop-types";
import {
    Row,
    Col,
    FormSelect,
    Card,
    CardHeader,
    CardBody,
    CardFooter
} from "shards-react";
import Chart from "../../util/ChartComponentUtil";

class UsersByDate extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    /**
     * Group date and count data's.
     */
    labelDatesForChart() {
        const {dates} = this.props;
        let datesData = new Array(dates.length).fill("");
        let countData = new Array(dates.length).fill(0);
        let ind = 0;
        dates.forEach(date => {
            date = new Date(date);
            let ymd =  + date.getUTCDay() + "/" +  date.getUTCMonth()  + "/" + date.getUTCFullYear();
            if (datesData.indexOf(ymd) === -1) {
                datesData[ind] = ymd;
                countData[ind]++;
                ind++;
            }
        })

        this.createChart(datesData, countData);
    }

    /**
     * Set chart data
     */
    createChart(datesData, countData) {

        /**
         * @var chartData: holds datasets and labels
         */
        const chartData = {
            datasets: [
                {
                    hoverBorderColor: "#ffffff",
                    data: countData,
                    backgroundColor: new Array(countData.length).fill("rgba(0,123,255,0.9)")
                }
            ],
            labels: datesData
        }

        /**
         * Create chart
         * */
        const chartConfig = {
            type: "line",
            data: chartData,
            options: {
                ...{
                    legend: {
                        position: "bottom",
                        labels: {
                            padding: 25,
                            boxWidth: 20
                        }
                    },
                    cutoutPercentage: 0,
                    tooltips: {
                        custom: false,
                        mode: "index",
                        position: "nearest"
                    }
                },
                ...this.props.chartOptions
            }
        };
        new Chart(this.canvasRef.current, chartConfig);
    }

    componentDidMount() {

        if (this.props.dates) {
            this.labelDatesForChart();
        }
    }

    render() {
        const {title} = this.props;
        return (
            <Card small className="h-100">
                <CardHeader className="border-bottom">
                    <h6 className="m-0">{title}</h6>
                </CardHeader>
                <CardBody className="d-flex py-0">
                    <canvas
                        height="220"
                        ref={this.canvasRef}
                        className="blog-users-by-device m-auto"
                    />
                </CardBody>
                <CardFooter className="border-top">
                    <Row>
                        <Col>
                            <FormSelect
                                size="sm"
                                value="last-week"
                                style={{maxWidth: "130px"}}
                                onChange={() => {
                                }}
                            >
                                <option value="last-week">Last Week</option>
                                <option value="today">Today</option>
                                <option value="last-month">Last Month</option>
                                <option value="last-year">Last Year</option>
                            </FormSelect>
                        </Col>
                        <Col className="text-right view-report">
                            {/* eslint-disable-next-line */}
                            <a href="#">View full report &rarr;</a>
                        </Col>
                    </Row>
                </CardFooter>
            </Card>
        );
    }
}

UsersByDate.propTypes = {
    /**
     * The component's title.
     */
    title: PropTypes.string,
    /**
     * The chart config object.
     */
    chartConfig: PropTypes.object,
    /**
     * The ChartComponentUtil.js options.
     */
    chartOptions: PropTypes.object,
};

UsersByDate.defaultProps = {
    title: "Participants By Date",
}

export default UsersByDate;
