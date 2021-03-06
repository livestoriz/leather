import Immutable from 'immutable';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Transaction extends Component {
  static get propTypes() {
    return {
      onSaveTransaction: PropTypes.func.isRequired,
      onUpdateAmount: PropTypes.func.isRequired,
      onUpdateCategory: PropTypes.func.isRequired,
      onUpdateName: PropTypes.func.isRequired,
      transaction: PropTypes.instanceOf(Immutable.Map),
    };
  }

  constructor() {
    super();
    this.saveIfChanged = this.saveIfChanged.bind(this);
    this.updateAmount = this.updateAmount.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    this.updateName = this.updateName.bind(this);
    this.state = {
      changed: false,
    };
  }

  updateAmount(amount) {
    this.setState({
      changed: true,
    });
    this.props.onUpdateAmount({
      amount: parseInt(amount, 10),
      transactionId: this.props.transaction.get('id'),
    });
  }

  updateCategory(category) {
    this.setState({
      changed: true,
    });
    this.props.onUpdateCategory({
      category,
      transactionId: this.props.transaction.get('id'),
    });
  }

  updateName(name) {
    this.setState({
      changed: true,
    });
    this.props.onUpdateName({
      name,
      transactionId: this.props.transaction.get('id'),
    });
  }

  saveIfChanged() {
    if (this.state.changed) {
      this.setState({
        changed: false,
      });
      this.props.onSaveTransaction(this.props.transaction);
    }
  }

  render() {
    return (
      <tr className="transaction">
        <td>09/13/2017</td>
        <td>
          <input
            onBlur={() => this.saveIfChanged()}
            onChange={e => {
              this.updateName(e.target.value);
            }}
            type="text"
            value={this.props.transaction.get('name')}
          />
        </td>
        <td>
          <input
            onBlur={() => this.saveIfChanged()}
            onChange={e => {
              this.updateCategory(e.target.value);
            }}
            type="text"
            value={this.props.transaction.get('category') || ''}
          />
        </td>
        <td>
          <input
            onBlur={() => this.saveIfChanged()}
            onChange={e => {
              this.updateAmount(e.target.value);
            }}
            type="text"
            value={this.props.transaction.get('amount')}
          />
        </td>
      </tr>
    );
  }
}

export default Transaction;
