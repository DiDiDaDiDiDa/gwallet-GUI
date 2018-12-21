import React, { Component } from "react";
import { Modal, Form, Select, Spin } from 'antd';
import ParamsBox from './paramsbox';

import "./layout.css";
const Option = Select.Option;
const FormItem = Form.Item;
class EditContractModal extends Component {
    constructor(props) {
        super(props);
    }

    handleOK() {
        let req = {
            mode: this.props.mode,
            index: this.props.index
        }
        this.props.handleOK(req);
    }

    getModalTitle(mode) {
        switch (mode) {
            case "add":
                return "新建合约";
            case "edit":
                return "编辑合约";
        }
        return "新建合约";
    }

    render() {
        // if(this.props.contract){
        //     this.state.contractName = this.props.contract.name;
        //     this.state.paramsName = [];
        //     this.state.paramsValue = [];
        //     for(let i = 0; i < this.props.contract.params.length; i ++){
        //         this.state.paramsName.push(this.props.contract.params[i].key);
        //         this.state.paramsValue.push(this.props.contract.params[i].value);
        //     }
        // }
        let paramsName = this.props.contract.paramsName;
        let paramsValue = this.props.contract.paramsValue;
        return (
            <Modal
                title={this.getModalTitle(this.props.mode)}
                visible={this.props.visible}
                index={this.props.index}
                onOk={() => this.handleOK()}
                onCancel={this.props.handleCancel}
                closable={false}
                width={500}
                className="editcontract-modal"
                cancelText="取消"
                okText="确定"
            >
            <Spin spinning={this.props.loading}>
                <div className="editcontract-modal-item">
                    智能合约:
                <FormItem hasFeedback>
                        <Select
                            style={{ width: 150 }}
                            value={this.props.contract.name}
                            onChange={(e) => this.props.handleChangeContractName(e)}
                        >
                            {this.props.contracts.map((key, index) => (
                                <Option key={index} value={key.address}>{key.name}</Option>
                            ))}
                        </Select>
                    </FormItem>
                    <ParamsBox
                        handleChangeValue={(index, e) => this.props.handleChangeValue(index, e)}
                        title="合约设置"
                        hasTitle={false}
                        params={paramsName}
                        paramsValue={paramsValue}
                    />
                </div>
                </Spin>
            </Modal>
        );
    }
}

export default EditContractModal;