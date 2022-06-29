import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/esm/Container';
import { Tabs, Tab } from "react-bootstrap";
import { TopBar } from './topbar';
import { DataSetSelector } from './sidebar/dataset_selector';
import SelectionView from './sidebar/selection/selection';
import { DataSetMeta } from './sidebar/dataset_metadata';
import Scatter3D from './scatter3d';
import Form from 'react-bootstrap/Form';
import { FilterUI } from './sidebar/filterui';
import Table from './sidebar/diamondtable';

// Stylesheet
import 'bootstrap/dist/css/bootstrap.min.css';

interface Props {
}
  
interface State {
    selected_row: any
    aa_seq: string
}
  

class Dashboard extends React.Component<Props, State> {
    // Set up states for loading data
	constructor(props: any){
		super(props);
		this.state ={ selected_row: {g_name: "Pick a gene", taxonomic_assignment: "Pick a gene", plot_label: "Pick a gene", best_hit: "Pick a gene", c_name: "Pick a gene", bh_evalue: 0, best_hitID: "None"}, aa_seq: "Pick a gene"}
        this.handleTextChange = this.handleTextChange.bind(this);
	}

    handleTextChange(newRow: any, new_seq: string) {
        console.log(newRow)
        this.setState({selected_row: newRow});
        this.setState({aa_seq: new_seq})
      }

    render() {
        return (
            <Container fluid>
                <Row><TopBar/></Row>
                <Row>
                <Col xs={8}>
                    <Scatter3D
                    handleTextChange={this.handleTextChange}/>
                    <Row>
                        <Col xs={1}>
                            <Form>
                                <Form.Check 
                                    type="switch"
                                    id="custom-switch"
                                    label="Auto-size"
                                />
                            </Form>
                        </Col>
                        <Col xs={6}>
                            <Form.Label>Dot size</Form.Label>
                            <Form.Range min={1} max={20} step={1} />
                        </Col>
                    </Row>
                </Col>
                <Col>
                     <Tabs>
                        <Tab eventKey="Overview" title="Overview">
                            <DataSetSelector/>
                            <DataSetMeta/>
                            <SelectionView 
                            row={this.state.selected_row}
                            aa_seq={this.state.aa_seq}/>
                        </Tab>
                        <Tab eventKey="Filter" title="Filters">
                            <FilterUI/>
                        </Tab>
                        <Tab eventKey="diamon" title="Diamond Output">
                            <Row>
                                <Col>
                                <Table
                            row={this.state.selected_row}
                            aa_seq={this.state.aa_seq}
                           />
                                </Col>
                            </Row>
                        </Tab>
                        <Tab eventKey="PCA" title="PCA">
                            Test
                        </Tab>
                    </Tabs>
                </Col>
                </Row>
        </Container>
        );
    } 
}

export { Dashboard }